import Chat from "samagra-chatui";
import "samagra-chatui/dist/index.css";
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { filter, find, map, sortBy } from "lodash";
import { toast } from "react-hot-toast";
import { AppContext } from "../../../utils/app-context";
import { RenderComp } from "./Comps";

import { getConvHistoryUrl } from "../../../utils/urls";
import FullScreenLoader from "../../FullScreenLoader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from "../../../assets/images/bot_icon_2.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../../store/actions/fetchHistory";
import { AppDispatch } from "../../../store";
import { selectActiveUser } from "../../../store/slices/userSlice";
import {
  isMsgLoadingSelector,
  selectNormalisedMessages,
  setActiveMessages,
} from "../../../store/slices/messageSlice";
import { User } from "../../../types";
import {
  logToAndroid,
  triggerEventInAndroid,
} from "../../../utils/android-events";
import { getMsgType } from "../../../utils/get-msg-type";

const ChatUiWindow: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const context = useContext(AppContext);

  //@ts-ignore
  const currentUser: User = useSelector(selectActiveUser);
  const loading = useSelector(isMsgLoadingSelector);
  const [botIcon, setBotIcon] = useState(currentUser?.botImage || botImage);
  const [imageBlob, setImageBlob] = useState(null)
  // URL.createObjectURL(blobImage)
  useEffect(() => {
    if (currentUser?.useIcon) {
      setBotIcon(currentUser?.botImage);
      setImageBlob(currentUser?.botImage);
    } else {
      setBotIcon(botImage);
    }
  }, [currentUser, currentUser?.botImage, setBotIcon]);
  
  const chatUIMsg = useSelector(selectNormalisedMessages(currentUser, botIcon,imageBlob));
  const msgToRender = useMemo(() => {
    return context?.isMsgReceiving && chatUIMsg
      ? [
          ...chatUIMsg,
          {
            type: "loader",
            position: "left",
            botUuid: "1",
          },
        ]
      : chatUIMsg;
  }, [context?.isMsgReceiving, chatUIMsg]);

  const sendMessage = useCallback(() => {
    context?.sendMessage(
      currentUser?.startingMessage,
      null,
      false,
      currentUser
    );
  }, [context, currentUser]);

  const conversationHistoryUrl = useMemo(
    () =>
      context?.currentUser ? getConvHistoryUrl(context?.currentUser) : null,
    [context?.currentUser]
  );

  useEffect(() => {
    const phone = localStorage.getItem("mobile");
    if (phone === "") toast.error("Mobile Number required");
    if (navigator.onLine) {
      dispatch(fetchHistory(currentUser)).then((res) => {
        //@ts-ignore
        if (res.type.includes("fulfilled") && res.payload.length === 0) {
          sendMessage();
        }
      });
    } else {
      try {
        if (localStorage.getItem("chatHistory")) {
          const offlineMsgs = filter(
            JSON.parse(localStorage.getItem("chatHistory")),
            { botUuid: JSON.parse(localStorage.getItem("currentUser"))?.id }
          );
          logToAndroid(`chatHistory:${localStorage.getItem("chatHistory")}`);
          dispatch(setActiveMessages(offlineMsgs));
        }
      } catch (err) {
        toast.error(err.message);
        logToAndroid(
          `error in getting chat history(offline):${JSON.stringify(err)}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationHistoryUrl]);



  const handleSend = useCallback(
    (type: string, val: any) => {
      if (type === "text" && val.trim()) {
        if (
          find(context?.botStartingMsgs, { msg: val.trim() }) &&
          find(context?.botStartingMsgs, { msg: val.trim() })?.id !==
          currentUser?.botUuid
        ) {
          toast.error("action not allowed");
        } else {
          context?.sendMessage(val, null, true, JSON.parse(localStorage.getItem('currentUser')));
        }
      }
    },
    [context, currentUser]
  );

  const disableSend = useMemo(
    () => currentUser?.isExpired || false,
    [currentUser?.isExpired]
  );
  const placeholder = useMemo(
    () => (currentUser?.isExpired ? "यह फॉर्म समाप्त हो गया है !" : " text"),
    [currentUser?.isExpired]
  );
  return (
    <>
      <FullScreenLoader loading={loading} />
      <Chat
        disableSend={disableSend}
        //@ts-ignore
        messages={msgToRender}
        renderMessageContent={(props): ReactElement => (
          <RenderComp
            key={props}
            msg={props}
            chatUIMsg={msgToRender}
            currentUser={currentUser}
            onSend={context?.sendMessage}
          />
        )}
        onSend={handleSend}
        locale="en-US"
        placeholder={placeholder}
      />
    </>
  );
};

export default ChatUiWindow;
