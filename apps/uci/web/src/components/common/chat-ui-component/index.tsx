'use client';
//@ts-ignore
import Chat from 'chatui';
import 'chatui/dist/index.css';
import axios from 'axios';
import React, {
    FC,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { filter, find, last } from 'lodash';
import { toast } from 'react-hot-toast';
import { getConvHistoryUrl } from '../../../utils/urls';
import { getMsgType } from '../../../utils/get-msg-type';
import { normalizedChat } from '../../../utils/normalize-chats';
import { AppContext } from '../../../context';
import { FullScreenLoader } from '../fullscreen-loader';
import { MessageItem } from '../message-item';
import { useDispatch } from 'react-redux';
import { setMessages as sm } from '@/store/slices/userMessageSlice';

type ChatUiMsgType = {
    type: 'image' | 'text' | 'audio' | 'file' | 'video';
    content: { text: string; data: any };
    position: 'right' | 'left';
};
export const ChatUiComponent: FC<{
    currentUser: any;
}> = ({ currentUser }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const context = useContext(AppContext);

    const chatUIMsg = useMemo<ChatUiMsgType>(
        () =>
            context?.messages?.map((msg: any) => ({
                type: getMsgType(msg),
                content: { text: msg?.text, data: { ...msg } },
                position: msg?.position ?? 'right',
            })),
        [context?.messages],
    );

    const sendMessage = useCallback(() => {
        context?.sendMessage(
            currentUser?.startingMessage,
            null,
            false,
            currentUser,
        );
    }, [context, currentUser]);

    const setMessages = useCallback(
        (msgs: Array<any>) => {
            dispatch(sm(msgs));
        },
        [dispatch],
    );

    const conversationHistoryUrl = useMemo(
        () =>
            context?.currentUser
                ? getConvHistoryUrl(context?.currentUser)
                : null,
        [context?.currentUser],
    );

    useEffect(() => {
        const phone = localStorage.getItem('mobile');
        if (phone === '') {
            toast.error('Mobile Number required');
        }

        if (true) {
            console.log('happy chatUi=>:', {
                navigator: navigator.onLine,
                conversationHistoryUrl,
                context,
            });
            if (conversationHistoryUrl && context?.socket?.socket?.connected) {
                console.log('happy');
                axios
                    .get(conversationHistoryUrl)
                    .then(res => {
                        console.log('chatUi=>:', { res });
                        setLoading(false);
                        if (res?.data?.result?.records?.length > 0) {
                            const normalizedChats = normalizedChat(
                                res.data.result.records,
                            );
                            console.log('debug:', { normalizedChats });
                            localStorage.setItem(
                                'userMsgs',
                                JSON.stringify(normalizedChats),
                            );
                            setMessages(normalizedChats);
                        } else {
                            sendMessage();
                        }
                    })
                    .catch(err => {
                        console.log('chatUi=>:', { err });
                        setLoading(false);
                        toast.error(JSON.stringify(err?.message));
                    });
            } else {
                setLoading(false);
                if (localStorage.getItem('chatHistory')) {
                    const offlineMsgs = filter(
                        // @ts-ignore
                        JSON.parse(localStorage.getItem('chatHistory')),

                        // @ts-ignore
                        {
                            botUuid: JSON.parse(
                                localStorage.getItem('currentUser') as string,
                            )?.id,
                        },
                    );

                    setMessages(offlineMsgs);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationHistoryUrl, context?.socket?.connected]);

    const handleSend = useCallback(
        (type: string, val: any) => {
            if (type === 'text' && val.trim()) {
                if (
                    find(context?.botStartingMsgs, { msg: val.trim() }) &&
                    find(context?.botStartingMsgs, { msg: val.trim() })?.id !==
                        currentUser?.botUuid
                ) {
                    toast.error('action not allowed');
                } else {
                    context?.sendMessage(val, null, true, currentUser);
                }
            }
        },
        [context, currentUser],
    );

    const isSendDisabled = useMemo(
        //@ts-ignore
        () => last(chatUIMsg)?.type === 'options',
        [chatUIMsg],
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
                locale="en-US"
                placeholder={
                    isSendDisabled
                        ? 'Please select from options'
                        : 'Ask Your Question'
                }
                // messageInput={voiceInput}
            />
        </>
    );
};
