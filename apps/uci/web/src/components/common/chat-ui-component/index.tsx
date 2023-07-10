"use client";
//@ts-ignore
import Chat from "chatui";
import "chatui/dist/index.css";
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

import { filter, find, last } from "lodash";
import { toast } from "react-hot-toast";


import { getConvHistoryUrl } from "../../../utils/urls";
import { getMsgType } from "../../../utils/get-msg-type";
import { normalizedChat } from "../../../utils/normalize-chats";
import { AppContext } from "../../../context";
import FullScreenLoader from "../fullscreen-loader";
import { MessageItem } from "../message-item";
import configData from "./config.json";


type ChatUiMsgType = {
    type: "image" | "text" | "audio" | "file" | "video";
    content: { text: string; data: any };
    position: "right" | "left";
};

export const ChatUiComponent: FC<{
    currentUser: any;
}> = ({ currentUser }) => {

    const [loading, setLoading] = useState(configData.INITIAL_LOADING_STATE);
    const context = useContext(AppContext);
    const chatUIMsg = useMemo<ChatUiMsgType>(
        () =>
            context?.messages?.map((msg: any) => ({
                type: getMsgType(msg),
                content: { text: msg?.text, data: { ...msg } },
                position: msg?.position ?? configData.DEFAULT_POSITION,
            })),
        [context?.messages]
    );

    const sendMessage = useCallback(() => {
        context?.sendMessage(
            currentUser?.startingMessage,
            null,
            configData.DEFAULT_MESSAGE_FLAG,
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
        if (phone === configData.EMPTY_STRING) toast.error(configData.ERROR_MESSAGES.MOBILE_REQUIRED);

        if (navigator.onLine) {
            console.log("chatUi=>:", { navigator: navigator.onLine, conversationHistoryUrl })
            if (conversationHistoryUrl && context?.socket?.connected) {
                axios
                    .get(conversationHistoryUrl)
                    .then((res) => {
                        console.log("chatUi=>:", { res })
                        setLoading(false);
                        if (res?.data?.result?.records?.length > 0) {
                            const normalizedChats = normalizedChat(res.data.result.records);
                            console.log("debug:", { normalizedChats });
                            window &&
                                window?.androidInteract?.log(JSON.stringify(normalizedChats));
                            localStorage.setItem("userMsgs", JSON.stringify(normalizedChats));
                            setMessages(normalizedChats);
                        } else {
                            sendMessage();
                        }
                    })
                    .catch((err) => {
                        console.log("chatUi=>:", { err })
                        setLoading(false);
                        toast.error(JSON.stringify(err?.message));
                        window &&
                            window?.androidInteract?.log(
                                `${configData.ERROR_MESSAGES.FETCHING_CHAT_HISTORY_ONLINE}:${JSON.stringify(err)}`
                            );
                    });
            } else {
                setLoading(false);
                try {
                    if (localStorage.getItem("chatHistory")) {
                        const offlineMsgs = filter(
                            // @ts-ignore
                            JSON.parse(localStorage.getItem("chatHistory")),

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
                            `${configData.ERROR_MESSAGES.FETCHING_CHAT_HISTORY_ONLINE}:${JSON.stringify(err)}`
                        );
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationHistoryUrl, context?.socket?.connected
    ]);

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
                    `${configData.ERROR_MESSAGES.ON_COMPLETED_ERROR}:${JSON.stringify(err)}`
                );
        }
    }, [context?.state?.messages, currentUser?.id]);

    const handleSend = useCallback(
        (type: string, val: any) => {
            if (type === configData.CHAT_UI.MSG_TYPES[1] && val.trim()) {
                if (
                    find(context?.botStartingMsgs, { msg: val.trim() }) &&
                    find(context?.botStartingMsgs, { msg: val.trim() })?.id !==
                    currentUser?.botUuid
                ) {
                    toast.error(configData.ERROR_MESSAGES.ACTION_NOT_ALLOWED);
                } else {
                    context?.sendMessage(val, null, true, currentUser);
                }
            }
        },
        [context, currentUser]
    );

    const isSendDisabled = useMemo(
        //@ts-ignore
        () => last(chatUIMsg)?.type === "options",
        [chatUIMsg]
    );

    return (
        <>
            <FullScreenLoader loading={loading} />
            <Chat
                disableSend={isSendDisabled}
                messages={chatUIMsg}
                renderMessageContent={(props: any): ReactElement => (
                    <MessageItem
                        key={props}
                        msg={props}
                        chatUIMsg={chatUIMsg}
                        currentUser={currentUser}
                        onSend={context?.sendMessage}
                    />
                )}
                onSend={handleSend}
                locale={configData.locale}
                placeholder={
                    isSendDisabled ? configData.PLACEHOLDER.CHAT_INPUT : configData.PLACEHOLDER.QUESTION
                }
            />
        </>
    );
};


