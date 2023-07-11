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
import SocketConnection from "@/components/SocketComponent";
import GetBotList from "@/components/GetBotList";


export const ContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [socketSession, setSocketSession] = useState<any>();
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileAvailable, setIsMobileAvailable] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>();

  const [loading, setLoading] = useState<boolean>(true);
  const [starredMsgs, setStarredMsgs] = useState<object>({});

  // const authToken = useLocalStorage('auth', '');
  // const currentUserLocal = useLocalStorage('currentUser', '', true);
  // const userID = useLocalStorage('userID', '');
  // const botDetails = useLocalStorage('botDetails', '', true);
  // const starredChats = useLocalStorage('starredChats', '');
  // const botList = useLocalStorage('botList', '', true);

  const [isSendDisabled, setIsSendDisabled] = useState<boolean>(false);


  const botStartingMsgs = useMemo(
    () =>
      map(users, (user) => ({ id: user?.botUuid, msg: user?.startingMessage })),
    [users]
  );

  useEffect(() => {
    const hasLocalStorageBeenSet = localStorage.getItem('localStorageSet');

    if (!hasLocalStorageBeenSet) {
      setLocalStorage();
      localStorage.setItem('localStorageSet', 'true');
    }
  }, []);


  const connect = (): void => {
    socket?.connect();
  };

  useEffect(() => {
    if (!isConnected || !socket?.connected)
      connect();
  }, [isConnected, socket]);

  const [state, setState] = useState(initialState);

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
      console.log("socket: BotResponse", { msg });

      //@ts-ignore
      const user = JSON.parse(localStorage.getItem("currentUser"));
      let media = {};

      if (msg.content.msg_type === "IMAGE") {
        media = { imageUrl: msg?.content?.media_url };
      } else if (msg.content.msg_type === "AUDIO") {
        media = { audioUrl: msg?.content?.media_url };
      } else if (msg.content.msg_type === "VIDEO") {
        media = { videoUrl: msg?.content?.media_url };
      } else if (
        msg.content.msg_type === "DOCUMENT" ||
        msg.content.msg_type === "FILE"
      ) {
        media = { fileUrl: msg?.content?.media_url };
      } else if (msg.content.msg_type === "TEXT") {
        media = {};
      }

      updateMsgState({
        user,
        msg,
        media,
      });

      const newMessage = {
        username: user?.name,
        text: msg.content.title,
        choices: msg.content.choices,
        position: "left",
      };

      localStorage.setItem(
        "userMsgs",
        JSON.stringify([...messages, newMessage])
      );
    },
    [messages, updateMsgState]
  );

  // useEffect(() => {
  //   const hasLocalStorageBeenSet = localStorage.getItem('localStorageSet');

  //   if(!hasLocalStorageBeenSet) {     
  //     setLocalStorage();
  //     localStorage.setItem('localStorageSet', 'true');
  //   }
  // }, []);



  console.log(socket);

  useEffect(() => {

    function onConnect(): void {
     
      setIsConnected(true);
    }

    function onException(exception: any) {
      toast.error(exception?.message);
    }

    function onDisconnect(): void {
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
  
  
  const onChangeCurrentUser = useCallback((newUser: User) => {
    setCurrentUser({ ...newUser, active: true });
    localStorage.removeItem("userMsgs");
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    (text: string, media: any, isVisibile = true): void => {

      send({ text, socketSession, socket });
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
    [currentUser, socketSession]
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
        <SocketConnection
          isMobileAvailable={isMobileAvailable}
          setSocket={setSocket}
        />
       <GetBotList setUsers={setUsers} setCurrentUser={setCurrentUser} setLoading={setLoading} />
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </>
    </AppContext.Provider>
  );
};




