import io, { Socket } from 'socket.io-client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
//import { UCI } from 'socket-package';
import { UCI } from './socket-package';
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
                            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRwSFNCOUYteGw5OGZLSnJ0LVEyVDV6UjQ3cyJ9.eyJhdWQiOiIzMjBiMDIwYS0zZDg0LTRkOGEtYTE5MS1kYTRlOTcyYzI5NTEiLCJleHAiOjE3MTc1MTQ2NDcsImlhdCI6MTY4NTk3ODY0NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIxNjNlM2RjMy1iOTYyLTQ0MzQtODMyNy00M2EwOGU0OTJkNzYiLCJqdGkiOiJhNTc4ZTkwNC0zZTU1LTRmYTgtYTI3OC1mMTYyODM2ZmQwZWMiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJSRUZSRVNIX1RPS0VOIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiODc2NzQ0NzQxNiIsImFwcGxpY2F0aW9uSWQiOiIzMjBiMDIwYS0zZDg0LTRkOGEtYTE5MS1kYTRlOTcyYzI5NTEiLCJ0aWQiOiIwMTA1NjZmZC1lMWNiLWM2NTgtYjY1OS1hMWQzZTA3MGJhYTgiLCJyb2xlcyI6W10sImF1dGhfdGltZSI6MTY4NTk3MDc3Miwic2lkIjoiYTQ2ZmJhNDgtYWExOC00YWRkLTgwY2ItZGJhM2IxYTEzMTkxIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIk9wZW5Sb2xlIiwiRElFVCIsIm1hbmF2X3NhbXBhZGEiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiRElFVCIsIlgtSGFzdXJhLVVzZXItSWQiOiI4NzY3NDQ3NDE2In0sImFwaVJvbGVzIjpbIkRJRVQiXX0.FL_nnEdHh97tLy5y6RnfTYxwHPkfMstgeRyF1yXp_YHz5ooVwZ6Egnb4BovLFShB7RU1HHF5RanpXxpKtwlpdO8Z43C6yJ-nVOA1rzUiaduYnnE5yq9PHs8_ZDMpdMegmm0lPw4n023rSx5sf8lE6cwLPFpx3jIDytI4gHyVyGOt3Yfm8CpqcTXawR59BLnY4HXmL0rJCtvkyTGKNR0HoKmupsk3GS1FxD6deEPoR2luQaEpGqAzOSx155sf8vvRD292q1BjGE8X3SG_-bXF9qcT5P6oUq_FitxXfRuto-APkQJvbm1iqsLNVkVC_LHYkswU0wZRBVX5LPn7UFtZeA`,
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
        const URL = process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '';
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
