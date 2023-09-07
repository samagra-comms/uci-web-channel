import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

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

    this.socket.on("botResponse", this.handleMessage);
    this.socket.on("session", this.handleSocketSession);
  }

  handleMessage = (message: any) => {
    //ReceiveCallback to be used here
    console.log(message);
    this.msgReceiveCb(message);
  };

  handleSocketSession = (session: any) => {
    this.session = session;
  };

  onDisconnect = () => {
    this.socket?.disconnect();
  };

  sendMessage = ({ text, to, from, optional }: any) => {
    this.socket?.emit("botRequest", {
      content: {
        text,
        to,
        appId: optional?.appId,
        channel: optional?.channel,
        from,
        context: null,
        accessToken: null,
      },
      to,
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
