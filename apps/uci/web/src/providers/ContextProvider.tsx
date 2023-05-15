'use client'
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { map, without, reverse, sortBy, includes } from 'lodash'
import { send } from "../socket";
import { toast } from "react-hot-toast";
import { SocketResponse, UpdateMsgState, User } from "../types";
import { initialState } from "../utils/initial-states";
import moment from "moment";
import { normalizeUsers } from "../utils/normalize-user";
import { setLocalStorage } from "../utils/set-local-storage";
import { Toaster } from "react-hot-toast";
import { AppContext } from "@/context";
import { io, Socket } from 'socket.io-client';
import { getBotDetailsList } from "@/utils/api-handler";


export const ContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [socketSession, setSocketSession] = useState<any>();
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileAvailable, setIsMobileAvailable] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>();

  const [loading, setLoading] = useState(true);
  const [starredMsgs, setStarredMsgs] = useState({});

  // const authToken = useLocalStorage('auth', '');
  // const currentUserLocal = useLocalStorage('currentUser', '', true);
  // const userID = useLocalStorage('userID', '');
  // const botDetails = useLocalStorage('botDetails', '', true);
  // const starredChats = useLocalStorage('starredChats', '');
  // const botList = useLocalStorage('botList', '', true);

  const [isSendDisabled, setIsSendDisabled] = useState(false);

  const botStartingMsgs = useMemo(
    () =>
      map(users, (user) => ({ id: user?.botUuid, msg: user?.startingMessage })),
    [users]
  );

  // useEffect(() => {
  //   setLocalStorage();
  // }, []);


  const connect = (): void => {
    socket?.connect();
  };

  useEffect(() => {
    if (!isConnected || !socket?.connected)
      connect();
  }, [isConnected, socket]);

  const [state, setState] =
    useState<{
      allMessages: {
        user: string;
        phoneNumber: string | null;
        messages: any[];
      }[];
      messages: any[];
      username: string;
      session: any;
    }>(initialState);

  const updateMsgState = useCallback(({ user, msg, media }: UpdateMsgState) => {
    const newMsg = {
      username: user?.name,
      text: msg.content.title,
      choices: msg.content.choices,
      position: "left",
      id: user?.id,
      botUuid: user?.id,
      messageId: msg?.messageId,
      ...media,
    };
    setMessages((prev: any) => [...prev, newMsg]);
    if (msg.content.choices)
      setIsSendDisabled(true);
  }, []);

  const onMessageReceived = useCallback(
    (msg: SocketResponse): void => {
console.log("socket: BotResponse",{msg})
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (msg.content.msg_type === "IMAGE") {
        updateMsgState({
          user,
          msg,
          media: { imageUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type === "AUDIO") {
        updateMsgState({
          user,
          msg,
          media: { audioUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type === "VIDEO") {
        updateMsgState({
          user,
          msg,
          media: { videoUrl: msg?.content?.media_url },
        });
      } else if (
        msg.content.msg_type === "DOCUMENT" ||
        msg.content.msg_type === "FILE"
      ) {
        updateMsgState({
          user,
          msg,
          media: { fileUrl: msg?.content?.media_url },
        });
      } else if (msg.content.msg_type === "TEXT") {
        updateMsgState({ user, msg, media: {} });
      }

      localStorage.setItem(
        "userMsgs",
        JSON.stringify([
          ...messages,
          {
            username: user?.name,
            text: msg.content.title,
            choices: msg.content.choices,
            position: "left",
          },
        ])
      );
    },
    [messages, updateMsgState]
  );


  // useEffect(() => {
  //   setLocalStorage();
  // }, []);



  useEffect(() => {
    if (localStorage.getItem('auth') || isMobileAvailable) {
      const URL = process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '';
      setSocket(
        io(URL, {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('auth')}`,
                channel: 'nlpwa',
              },
            },
          },
          query: {
            deviceId: `nlpwa:${localStorage.getItem('mobile')}`,
          },
          autoConnect: false,
          upgrade: false,
        })
      );
    }
  }, [isMobileAvailable]);


  useEffect(() => {

    function onConnect(): void {
      window && window?.androidInteract?.log(`socket: onConnectCallback`);
      setIsConnected(true);
    }

    function onException(exception: any) {
      toast.error(exception?.message);
    }

    function onDisconnect(): void {
      console.log("socket: disconnecting");
      window && window?.androidInteract?.log(`socket: onDisconnectCallback`);
      setIsConnected(false);
    }

    function onSessionCreated(sessionArg: { session: any }) {
      setSocketSession(sessionArg);
    }
    if (socket && !socket?.connected) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("botResponse", onMessageReceived);

      socket.on("exception", onException);
      socket.on("session", onSessionCreated);
    }

    return () => {
      window &&
        window?.androidInteract?.log(
          `socket: turning off everything on return`
        );
      // socket?.disconnect();
      // socket?.off("connect", onConnect);
      // socket?.off("disconnect", onDisconnect);
      // socket?.off("botResponse", onMessageReceived);
    };

  }, [isConnected, socket, onMessageReceived]);

  useEffect(() => {
    if (localStorage.getItem("starredChats")) {
      setStarredMsgs(JSON.parse(localStorage.getItem("starredChats") || '{}'));
    }
  }, []);

  // getting botList from android and fetching bot details
  useEffect(() => {
    try {
      const checkOnline = async (): Promise<void> => {
        if (window.navigator.onLine) {

          const botIds = JSON.parse(localStorage.getItem("botList") || '');
          getBotDetailsList()
            .then((response): any => {
              console.log({ response })
              const botDetailsList = without(
                reverse(
                  sortBy(
                    response?.data?.result?.map((bot: any, index: number) => {
                      if (
                        // bot?.logicIDs?.[0]?.transformers?.[0]?.meta?.type !==
                        // "broadcast" &&
                        // includes(botIds, bot?.id)
                        true
                      ) {
                        if(index===0) localStorage.setItem('userID', bot?.id);
                        return normalizeUsers({
                          ...bot,
                          active: index === 0,
                          botUuid: bot?.id,
                          createTime: moment(bot?.createdAt).valueOf(),
                        });
                      }
                      return null;
                    }),
                    ["createTime"]
                  )
                ),
                null
              );

              window &&
                window?.androidInteract?.log(JSON.stringify(botDetailsList));


              // @ts-ignore
              setUsers(botDetailsList);
              setLoading(false);
              window?.androidInteract?.onBotDetailsLoaded(
                JSON.stringify(botDetailsList)
              );
              if (localStorage.getItem("currentUser")) {

                // @ts-ignore
                setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));

                // @ts-ignore
              } else setCurrentUser(botDetailsList?.[0]);
            })
            .catch((err: any) => console.log("qwerty:", { err }));
        } else {
          setLoading(false);
          if (localStorage.getItem("botDetails")) {
            setUsers(JSON.parse(localStorage.getItem("botDetails") || '[]'));
            setCurrentUser(JSON.parse(localStorage.getItem("botDetails") || '[]')?.[0]);
          }
        }
      };
      checkOnline();
    } catch (err: any) {
      toast.error(err?.message);
      window &&
        window?.androidInteract?.log(
          `error in fetching botList:${JSON.stringify(err)}`
        );
    }
  }, []);

  const onChangeCurrentUser = useCallback((newUser: User) => {
    setCurrentUser({ ...newUser, active: true });
    localStorage.removeItem("userMsgs");
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    (text: string, media: any, isVisibile = true): void => {

      send({ text, socketSession, socket});
      if (isVisibile)
        if (media) {
          if (media.mimeType.slice(0, 5) === 'image') {
          } else if (media.mimeType.slice(0, 5) === 'audio' && isVisibile) {
          } else if (media.mimeType.slice(0, 5) === 'video') {
          } else if (media.mimeType.slice(0, 11) === 'application') {
          } else {
          }
        } else {
       
          setMessages((prev: any) => {
            return [
              ...map(prev, (prevMsg, index) => {
                if (Number(index) === prev?.length - 1 && prevMsg?.choices) {
                  return {
                    ...prevMsg, choices: map(prevMsg?.choices, (choice) => ({
                      ...choice,
                      active: choice?.key == text
                    })), disabled: true
                  }
                }
                return { ...prevMsg, disabled: true }
              }),
              {
                username: state.username,
                text: text,
                position: "right",
                botUuid: currentUser?.id,
                payload: { text },
                time: moment().valueOf(),
                disabled: true,
              },
            ]
          });
   
        }
    },
    [currentUser,socketSession]
  );

  const values = useMemo(
    () => ({
      currentUser,
      allUsers: users,
      toChangeCurrentUser: onChangeCurrentUser,
      state,
      setState,
      sendMessage,
      messages,
      setMessages,
      starredMsgs,
      setStarredMsgs,
      loading,
      setLoading,
      socket,
      botStartingMsgs, isSendDisabled, setIsSendDisabled
    }),
    [
      currentUser,
      users,
      onChangeCurrentUser,
      state,
      socket,
      sendMessage,
      messages,
      starredMsgs,
      setStarredMsgs,
      loading,
      setLoading,
      botStartingMsgs,
      isSendDisabled, setIsSendDisabled
    ]
  );

  
  return (
    //@ts-ignore
    <AppContext.Provider value={values}>
      <>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </>
    </AppContext.Provider>
  );
};




