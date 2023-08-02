import io, { Socket } from 'socket.io-client';
import React, { useEffect } from 'react';

interface SocketConnectionProps {
  isMobileAvailable: boolean;
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}

const SocketConnection: React.FC<SocketConnectionProps> = ({ isMobileAvailable, setSocket }) => {
  useEffect(() => {
    if (localStorage.getItem('auth') || isMobileAvailable) {
      const URL = process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '';
      setSocket(
        io(URL, {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('auth')}`,
                channel: 'nlpwa',
              },
            },
          },
          query: {
            deviceId: `nlpwa:${localStorage.getItem('mobile')}`,
          },
          autoConnect: false,
          upgrade: false,
        })
      );
    }

  }, [isMobileAvailable, setSocket]);
  return null;
}

export default SocketConnection;