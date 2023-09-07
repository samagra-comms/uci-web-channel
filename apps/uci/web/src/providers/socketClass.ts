import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// const useSocket = (url: string, options?: any) => {
//   const [socket, setSocket] = useState<Socket>();

//   useEffect(() => {
//     const socketIo = io(url, options);

//     setSocket(socketIo);

//     return () => {
//       socketIo.disconnect();
//     };
//   }, [url, options]);

//   return socket;
// };

class UCI {
    socket: Socket | undefined;
    msgReceiveCb: any;
    session: any;
    constructor(URL: string, socketOptions: any, onRecieveCallback: any) {
        this.socket = io(URL, socketOptions);

        this.msgReceiveCb = onRecieveCallback;
        this.socket.connect();

        this.socket.on('botResponse', this.handleMessage);
        this.socket.on('session', this.handleSocketSession);
        this.socket.on('exception', ee => {
            console.log({ ee });
        });
    }

    handleMessage = (message: any) => {
        //ReceiveCallback to be used here
        console.log({ message });
        this.msgReceiveCb(message);
    };

    handleSocketSession = (session: any) => {
        console.log('venom:', { session });
        this.session = session;
    };

    onDisconnect = () => {
        this.socket?.disconnect();
    };

    sendMessage = ({ text, to, from, optional }: any) => {
        console.log("I'm Here", { text, session: this.session, optional });
        this.socket?.emit('botRequest', {
            content: {
                text,
                userId: this.session.userID,
                appId: optional?.appId,
                channel: optional?.channel,
                from: this.session.socketID,
                context: null,
                accessToken: null,
            },
            to: this.session.userID,
        });
    };
}

export { UCI };

// const socket = new UCI({ url, socketOptions, callback });
// socket.sendMessage({ text, to, from, callback, optional });

// const socket = new UCI({url, socketOptions, callback});
// socket.sendMessage({text, to, from, callback, optional});
// socket.handleMessage();

//! Callback will have 'bot request, bot response'
//! options will have connections and messages
//$ Like this: options:{connection:{}, message: {}}
