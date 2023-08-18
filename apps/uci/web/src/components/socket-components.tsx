import io, { Socket } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { UCI } from 'socket-package';
interface SocketConnectionProps {
    isMobileAvailable: boolean;
    setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
    setNewSocket: any;
    onMessageReceived: any;
    newSocket: any;
}

const SocketConnection: React.FC<SocketConnectionProps> = ({
    isMobileAvailable,
    setSocket,
    setNewSocket,
    onMessageReceived,
    newSocket,
}) => {
    useEffect(() => {
        const URL = process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '';

        if (!newSocket) {
            console.log('venom triggered--');
            //@ts-ignore
            setNewSocket(
                new UCI(
                    URL,
                    {
                        transportOptions: {
                            polling: {
                                extraHeaders: {
                                    Authorization:
                                        process.env.NEXT_PUBLIC_AUTH_TOKEN,
                                    channel: 'nlpwa',
                                },
                            },
                        },
                        query: {
                            deviceId: `nlpwa:${localStorage.getItem('mobile')}`,
                        },
                        autoConnect: false,
                        upgrade: false,
                    },
                    onMessageReceived,
                ),
            );
        }
    }, [isMobileAvailable, setNewSocket, onMessageReceived]);
    return null;
};

export default SocketConnection;
