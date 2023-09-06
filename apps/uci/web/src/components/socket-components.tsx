import io, { Socket } from 'socket.io-client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UCI } from './socket-package';
import { urlsConfig } from '@/config';
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
    const options = useMemo(
        () => ({
            socketOptions: {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: `Bearer ${urlsConfig?.authUrl}`,
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
            onRecieveCallback: onMessageReceived,
        }),
        [onMessageReceived],
    );

    console.log('__happy__:', { options });
    useEffect(() => {
        const URL = urlsConfig?.transportUrl || '';
        if (!newSocket) {
            setNewSocket(
                new UCI(URL, options.socketOptions, options.onRecieveCallback),
            );
        }
    }, [
        isMobileAvailable,
        setNewSocket,
        onMessageReceived,
        newSocket,
        options,
    ]);
    return null;
};

export default SocketConnection;
