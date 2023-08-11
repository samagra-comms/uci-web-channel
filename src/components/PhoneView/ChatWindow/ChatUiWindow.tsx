import Chat from "samagra-chatui";
import "samagra-chatui/dist/index.css";
import axios from "axios";
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { filter, find } from "lodash";
import { toast } from "react-hot-toast";
import { AppContext } from "../../../utils/app-context";
import { RenderComp } from "./Comps";

import { getConvHistoryUrl } from "../../../utils/urls";
import { getMsgType } from "../../../utils/get-msg-type";
import { normalizedChat } from "../../../utils/normalize-chats";
import FullScreenLoader from "../../FullScreenLoader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from "../../../assets/images/bot_icon_2.png";

const ChatUiWindow: FC<{
  currentUser: any;
}> = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const context = useContext(AppContext);
  const [botIcon, setBotIcon] = useState(botImage);
  useEffect(() => {
    if (currentUser?.botImage) {
      fetch(currentUser?.botImage)
        .then((res) => {
          if (res.status === 403) {
            setBotIcon(botImage);
          } else {
            setBotIcon(currentUser?.botImage);
          }
        })
        .catch((err) => {
          setBotIcon(botImage);
        });
    } else {
      setBotIcon(botImage);
    }
  }, [currentUser?.botImage, setBotIcon]);

  const chatUIMsg = useMemo(
    () =>
      context?.messages?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? "right",
        user: {
          style: { border: "2px solid lightgray" },
          avatar: msg?.position === "left" ? botIcon : "",
        },
      })),
    [botIcon, context?.messages]
  );


  const msgToRender = useMemo(() => {
    return context?.isMsgReceiving
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

  const setMessages = useCallback(
    (msgs: Array<any>) => {
      context?.setMessages(msgs);
    },
    [context]
  );

  const conversationHistoryUrl = useMemo(
    () =>
      context?.currentUser ? getConvHistoryUrl(context?.currentUser) : null,
    [context?.currentUser]
  );

  useEffect(() => {
    const phone = localStorage.getItem("mobile");
    if (phone === "") toast.error("Mobile Number required");
    if (navigator.onLine) {
     
      if (conversationHistoryUrl)
        axios
          .get(conversationHistoryUrl)
          .then((res) => {
            setLoading(false);
            if(currentUser?.isExpired)
            toast.error('यह फॉर्म समाप्त हो गया है !')
            if (res?.data?.result?.records?.length > 0) {
              const normalizedChats = normalizedChat(res.data.result.records);
              window &&
                window?.androidInteract?.log(JSON.stringify(normalizedChats));
              localStorage.setItem("userMsgs", JSON.stringify(normalizedChats));
              setMessages(normalizedChats);
            } else {
              if(!currentUser?.isExpired)
              sendMessage();
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error(JSON.stringify(err?.message));
            window &&
              window?.androidInteract?.log(
                `error in fetching chat history(online):${JSON.stringify(err)}`
              );
          });
    } else {
      setLoading(false);
      try {
        if (localStorage.getItem("chatHistory")) {
          const offlineMsgs = filter(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            JSON.parse(localStorage.getItem("chatHistory")),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { botUuid: JSON.parse(localStorage.getItem("currentUser"))?.id }
          );
          window &&
            window?.androidInteract?.log(localStorage.getItem("chatHistory"));
          setMessages(offlineMsgs);
        }
      } catch (err) {
        window &&
          window?.androidInteract?.log(
            `error in getting chat history(offline):${JSON.stringify(err)}`
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationHistoryUrl]);

  useEffect(() => {
    try {
      window &&
        window?.androidInteract?.onChatCompleted?.(
          String(currentUser?.id),
          JSON.stringify(context?.state?.messages)
        );
      window &&
        window?.androidInteract?.log(JSON.stringify(context?.state?.messages));
    } catch (err) {
      window &&
        window?.androidInteract?.log(
          `error in onChatCompleted func:${JSON.stringify(err)}`
        );
    }
  }, [context?.state?.messages, currentUser?.id]);

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
          context?.sendMessage(val, null, true, currentUser);
        }
      }
    },
    [context, currentUser]
  );

  const disableSend=useMemo(()=>currentUser?.isExpired || false,[currentUser?.isExpired])

  return (
    <>
      <FullScreenLoader loading={loading} />
      <Chat
       disableSend={disableSend}
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
        placeholder="Ask Your Question"
      />
    </>
  );
};

export default ChatUiWindow;
