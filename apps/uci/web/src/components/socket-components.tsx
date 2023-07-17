import io, { Socket } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import {config} from '@/config';

interface SocketConnectionProps {
  isMobileAvailable: boolean;
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}

// const [socket, setSocket] = useState<Socket>();
// const [isMobileAvailable, setIsMobileAvailable] = useState(false)

const SocketConnection: React.FC<SocketConnectionProps> = ({ isMobileAvailable, setSocket }) => {
  useEffect(() => {
    if (config.Socket.auth || isMobileAvailable) {
      const URL = config.Socket.url;
      setSocket(
        io(URL, {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${config.Socket.auth}`,
                channel: 'nlpwa',
              },
            },
          },
          query: {
            deviceId: `nlpwa:${config.Socket.mobile}`,
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