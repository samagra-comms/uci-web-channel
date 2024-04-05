import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { User } from "./types";
import Home from "./pages/home";
import Chats from "./pages/chats";
import StarredChats from "./pages/starred-chats";
import StarredChatsPage from "./pages/starred-chat-page";

import { AppContext } from "./utils/app-context";
import { CookiesProvider } from "react-cookie";
import { send } from "./components/websocket";
import { toast, Toaster } from "react-hot-toast";
import { socket } from "./socket";
import { map, reduce, uniq } from "lodash";
import { initialState } from "./utils/initial-states";
import { UserInput } from "./components/UserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingSelector,
  selectUser,
  setActiveUser,
  setIsChatStarted,
  setLoading,
} from "./store/slices/userSlice";
import { fetchUsers } from "./store/actions/fetchUsers";
import { AppDispatch } from "./store";
import {
  appendMessage,
  selectActiveMessages,
  setActiveMessages,
} from "./store/slices/messageSlice";
import { logToAndroid, triggerEventInAndroid } from "./utils/android-events";
import { setLocalStorage } from "./utils/set-local-storage";

const App: FC = () => {
  const [botToScroll, setBotToScroll] = useState(null);
  const [isMsgReceiving, setIsMsgReceiving] = useState(false);
  const [starredMsgs, setStarredMsgs] = useState({});
  const dispatch: AppDispatch = useDispatch();
  const { all, active } = useSelector(selectUser);
  const activeMessages = useSelector(selectActiveMessages(active));

  const botStartingMsgs = useMemo(
    () =>
      map(all, (user) => ({ id: user?.botUuid, msg: user?.startingMessage })),
    [all]
  );

  const bucketList = useMemo(
    () =>
      uniq(
        reduce(
          [...all],
          (acc, v: any): any => {
            acc = [...acc, ...v.tags];
            return acc;
          },
          []
        )
      ),
    [all]
  );

  const loading = useSelector(isLoadingSelector);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const connect = useCallback(() => {
    logToAndroid("socket: connect triggered");
    socket.connect();
  }, []);

  useEffect(() => {
    if (!isConnected) connect();
  }, [isConnected, connect]);

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

  const updateMsgState = useCallback(
    ({ user, msg, media }) => {
      const newMsg = {
        username: user?.name,
        text:
          msg.content.title ===
          "This conversation has expired now. Please contact your state admin to seek help with this."
            ? "यह फॉर्म समाप्त हो गया है !"
            : msg.content.title,
        choices: msg.content.choices,
        caption: msg.content.caption,
        position: "left",
        id: user?.id,
        botUuid: user?.id,
        messageId: msg?.messageId,
        sentTimestamp: new Date().toDateString(),
        ...media,
      };
      dispatch(appendMessage(newMsg));
    },
    [dispatch]
  );

  const onMediaReceived = useCallback((botId, msgId) => {
    triggerEventInAndroid("onMediaReceived", { botId, msgId });
    logToAndroid(`onMediaReceived: ${JSON.stringify({ bot: botId, msgId })}`);
  }, []);

  const onMessageReceived = useCallback(
    (msg: any): void => {
      setIsMsgReceiving(false);
      logToAndroid(`socket: receiving bot response -${msg}`);
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (msg.content.msg_type === "IMAGE") {
        updateMsgState({
          user,
          msg,
          media: { imageUrl: msg?.content?.media_url },
        });
        onMediaReceived(user?.id, msg.messageId);
      } else if (msg.content.msg_type === "AUDIO") {
        updateMsgState({
          user,
          msg,
          media: { audioUrl: msg?.content?.media_url },
        });
        onMediaReceived(user?.id, msg.messageId);
      } else if (msg.content.msg_type === "VIDEO") {
        updateMsgState({
          user,
          msg,
          media: { videoUrl: msg?.content?.media_url },
        });
        onMediaReceived(user?.id, msg.messageId);
      } else if (
        msg.content.msg_type === "DOCUMENT" ||
        msg.content.msg_type === "FILE"
      ) {
        updateMsgState({
          user,
          msg,
          media: { fileUrl: msg?.content?.media_url },
        });
        onMediaReceived(user?.id, msg.messageId);
      } else if (msg.content.msg_type === "TEXT") {
        updateMsgState({ user, msg, media: {} });
      }
    },
    [onMediaReceived, updateMsgState]
  );

  const onSessionCreated = useCallback((session: { session: any }): void => {
    setState((prev) => ({
      ...prev,
      session: session,
    }));
  }, []);

  const onException = useCallback((exception: any) => {
    toast.error(exception?.message);
    triggerEventInAndroid("onTriggerLogout");
  }, []);

  // useEffect(() => {
  //   setLocalStorage();
  // }, []);


 
  
  useEffect(() => {
    function onConnect(): void {
      logToAndroid(`socket: onConnectCallback`);
      setIsConnected(true);
    }

    function onDisconnect(): void {
      logToAndroid(`socket: onDisconnectCallback`);
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("botResponse", onMessageReceived);

    socket.on("exception", onException);
    socket.on("session", onSessionCreated);

    return () => {
      logToAndroid(`socket: turning off everything on return`);
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("botResponse", onMessageReceived);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onException, onSessionCreated]);

  useEffect(() => {
    if (localStorage.getItem("starredChats")) {
      setStarredMsgs(JSON.parse(localStorage.getItem("starredChats")));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const setLoader = useCallback(
    (value) => {
      dispatch(setLoading(value));
    },
    [dispatch]
  );

  const onChangeCurrentUser = useCallback(
    (newUser: User) => {
      // localStorage.setItem('currentUser',JSON.stringify({ ...newUser, active: true }))
      dispatch(setActiveUser({ ...newUser, active: true }));
      localStorage.removeItem("userMsgs");
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    (text: string, media: any, isVisibile = true): void => {
      //@ts-ignore
      if (!active.isConvStarted) {
        triggerEventInAndroid("onConvStarted", active);
        dispatch(setIsChatStarted({ bot: active, value: true }));
      }
      setIsMsgReceiving(true);
      send(text, state.session, null, active, socket, null);
      if (isVisibile) {
        const newMsgState = [
          ...map(activeMessages, (prevMsg) => ({ ...prevMsg, disabled: true })),
          {
            username: state.username,
            text: text,
            position: "right",
            //@ts-ignore
            botUuid: active?.id,
            payload: { text },
            // time: moment().valueOf(),
            repliedTimestamp: new Date().toDateString(),
            disabled: true,
          },
        ];

        dispatch(setActiveMessages(newMsgState));
      }
    },
    [state.session, state.username, active, activeMessages, dispatch]
  );

  useEffect(() => {
    let secondTimer: any;
    const timer = setTimeout(() => {
      if (isMsgReceiving) {
        toast.error("It is taking longer than usual");
        secondTimer = setTimeout(() => {
          if (isMsgReceiving) {
            setIsMsgReceiving(false);
          }
        }, 7000);
      }
    }, 20000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, [isMsgReceiving]);

  const values = useMemo(
    () => ({
      currentUser: active,
      allUsers: all,
      toChangeCurrentUser: onChangeCurrentUser,
      state,
      setState,
      sendMessage,
      starredMsgs,
      setStarredMsgs,
      loading,
      setLoading: setLoader,
      botStartingMsgs,
      isMsgReceiving,
      setIsMsgReceiving,
      botToScroll,
      setBotToScroll,
      bucketList
    }),
    [
      active,
      bucketList,
      all,
      onChangeCurrentUser,
      state,
      sendMessage,
      starredMsgs,
      setStarredMsgs,
      loading,
      setLoader,
      botStartingMsgs,
      isMsgReceiving,
      setIsMsgReceiving,
      botToScroll,
      setBotToScroll,
    ]
  );

  return (
    <>
      <CookiesProvider>
        <AppContext.Provider value={values}>
          <>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/auth" exact>
                <UserInput />
              </Route>

              <Route path="/chats/:id">
                <Chats />
              </Route>
              <Route path="/starredChats" exact>
                <StarredChats />
              </Route>
              <Route path="/starredChats/:id">
                <StarredChatsPage />
              </Route>
            </Switch>
            <Toaster position="top-right" reverseOrder={false} />
          </>
        </AppContext.Provider>
      </CookiesProvider>
    </>
  );
};

export default App;
