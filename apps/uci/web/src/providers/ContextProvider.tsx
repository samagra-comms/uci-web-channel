'use client';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { map, without, reverse, sortBy, includes } from 'lodash';
import { send } from '../socket';
import { toast } from 'react-hot-toast';
import { SocketResponse, UpdateMsgState, User } from '../types';
import { initialState } from '../utils/initial-states';
import moment from 'moment';
import { setLocalStorage } from '../utils/set-local-storage';
import { Toaster } from 'react-hot-toast';
import { AppContext } from '@/context';
import { Socket } from 'socket.io-client';
import SocketConnection from '@/components/socket-components';
import GetBotList from '@/components/get-bot-list';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCurrentUser,
    currentUserSelector,
} from '@/store/slices/userListSlice';

export const ContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const currentUser = useSelector(currentUserSelector);
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Array<any>>([]);
    const [socketSession, setSocketSession] = useState<any>();
    const [socket, setSocket] = useState<Socket>();
    const [newSocket, setNewSocket] = useState<Socket>();
    const [isConnected, setIsConnected] = useState(false);
    const [isMobileAvailable, setIsMobileAvailable] = useState(false);
    // const [currentUser, setCurrentUser] = useState<User>();

    const [loading, setLoading] = useState<boolean>(true);
    const [starredMsgs, setStarredMsgs] = useState<object>({});

    // const authToken = useLocalStorage('auth', '');
    // const currentUserLocal = useLocalStorage('currentUser', '', true);
    // const userID = useLocalStorage('userID', '');
    // const botDetails = useLocalStorage('botDetails', '', true);
    // const starredChats = useLocalStorage('starredChats', '');
    // const botList = useLocalStorage('botList', '', true);

    const [isSendDisabled, setIsSendDisabled] = useState<boolean>(false);
    const [showStarredChat, setShowStarredChat] = useState(false);
    const dispatch = useDispatch();

    const botStartingMsgs = useMemo(
        () =>
            map(users, user => ({
                id: user?.botUuid,
                msg: user?.startingMessage,
            })),
        [users],
    );

    useEffect(() => {
        setLocalStorage();
    }, []);

    const connect = (): void => {
        socket?.connect();
    };

    useEffect(() => {
        if (!isConnected || !socket?.connected) connect();
    }, [isConnected, socket]);

    const [state, setState] = useState(initialState);

    const updateMsgState = useCallback(
        ({ user, msg, media }: UpdateMsgState) => {
            const newMsg = {
                username: user?.name,
                text: msg.content.title,
                choices: msg.content.choices,
                position: 'left',
                id: user?.id,
                botUuid: user?.id,
                messageId: msg?.messageId,
                ...media,
            };
            setMessages((prev: any) => [...prev, newMsg]);
            if (msg.content.choices) setIsSendDisabled(true);
        },
        [],
    );

    useEffect(() => {
        return () => {
            localStorage.removeItem('currentUser');
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser.name));
    }, [currentUser]);

    const onMessageReceived = useCallback(
        (msg: SocketResponse): void => {
            console.log('socket: BotResponse', { msg });

            //@ts-ignore
            const user = JSON.parse(localStorage.getItem('currentUser'));
            let media = {};

            if (msg.content.msg_type === 'IMAGE') {
                media = { imageUrl: msg?.content?.media_url };
            } else if (msg.content.msg_type === 'AUDIO') {
                media = { audioUrl: msg?.content?.media_url };
            } else if (msg.content.msg_type === 'VIDEO') {
                media = { videoUrl: msg?.content?.media_url };
            } else if (
                msg.content.msg_type === 'DOCUMENT' ||
                msg.content.msg_type === 'FILE'
            ) {
                media = { fileUrl: msg?.content?.media_url };
            } else if (msg.content.msg_type === 'TEXT') {
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
                position: 'left',
            };

            localStorage.setItem(
                'userMsgs',
                JSON.stringify([...messages, newMessage]),
            );
        },
        [messages, updateMsgState],
    );

    // useEffect(() => {
    //   const hasLocalStorageBeenSet = localStorage.getItem('localStorageSet');

    //   if(!hasLocalStorageBeenSet) {
    //     setLocalStorage();
    //     localStorage.setItem('localStorageSet', 'true');
    //   }
    // }, []);

    //   if(!hasLocalStorageBeenSet) {
    //     setLocalStorage();
    //     localStorage.setItem('localStorageSet', 'true');
    //   }
    // }, []);

    console.log(messages);
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
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('botResponse', onMessageReceived);

            socket.on('exception', onException);
            socket.on('session', onSessionCreated);
        }

        return () => {
            // socket?.disconnect();
            // socket?.off("connect", onConnect);
            // socket?.off("disconnect", onDisconnect);
            // socket?.off("botResponse", onMessageReceived);
        };
    }, [isConnected, socket, onMessageReceived]);

    useEffect(() => {
        if (localStorage.getItem('starredChats')) {
            setStarredMsgs(
                JSON.parse(localStorage.getItem('starredChats') || '{}'),
            );
        }
    }, []);

    const onChangeCurrentUser = useCallback((newUser: User) => {
        dispatch(setCurrentUser({ ...newUser, active: true }));
        localStorage.removeItem('userMsgs');
        setMessages([]);
    }, []);

    const sendMessage = useCallback(
        (text: string, media: any, isVisibile = true): void => {
            console.log('happy:', { dd: newSocket });
            //@ts-ignore
            newSocket?.sendMessage({
                text,
                optional: {
                    appId: 'f3acc237-2987-4f36-b52b-cf8cf74902fb',
                    channel: 'NL App',
                },
            });
            //  send({ text, socketSession, socket });
            if (isVisibile)
                if (media) {
                    if (media.mimeType.slice(0, 5) === 'image') {
                    } else if (
                        media.mimeType.slice(0, 5) === 'audio' &&
                        isVisibile
                    ) {
                    } else if (media.mimeType.slice(0, 5) === 'video') {
                    } else if (media.mimeType.slice(0, 11) === 'application') {
                    } else {
                    }
                } else {
                    setMessages((prev: any) => {
                        return [
                            ...map(prev, (prevMsg, index) => {
                                if (
                                    Number(index) === prev?.length - 1 &&
                                    prevMsg?.choices
                                ) {
                                    return {
                                        ...prevMsg,
                                        choices: map(
                                            prevMsg?.choices,
                                            choice => ({
                                                ...choice,
                                                active: choice?.key == text,
                                            }),
                                        ),
                                        disabled: true,
                                    };
                                }
                                return { ...prevMsg, disabled: true };
                            }),
                            {
                                username: state.username,
                                text: text,
                                position: 'right',
                                botUuid: currentUser?.id,
                                payload: { text },
                                time: moment().valueOf(),
                                disabled: true,
                            },
                        ];
                    });
                }
        },
        [currentUser, socketSession, socket],
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
            socket: newSocket,
            newSocket,
            botStartingMsgs,
            isSendDisabled,
            setIsSendDisabled,
            showStarredChat,
            setShowStarredChat,
        }),
        [
            currentUser,
            users,
            onChangeCurrentUser,
            state,
            newSocket,
            sendMessage,
            messages,
            starredMsgs,
            setStarredMsgs,
            loading,
            setLoading,
            botStartingMsgs,
            isSendDisabled,
            setIsSendDisabled,
            showStarredChat,
            // isSelected
        ],
    );

    return (
        //@ts-ignore
        <AppContext.Provider value={values}>
            <>
                <SocketConnection
                    setNewSocket={setNewSocket}
                    isMobileAvailable={isMobileAvailable}
                    setSocket={setSocket}
                    newSocket={newSocket}
                    onMessageReceived={onMessageReceived}
                />
                <GetBotList />
                {children}
            </>
        </AppContext.Provider>
    );
};
