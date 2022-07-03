import {io} from 'socket.io-client';
// const host =
//   process.env.NODE_ENV === "production"
//     ? window.location.host
//     : "localhost:3005";


export const socket = io(`${process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL}`);
export const send = (msg: any, session: any, accessToken: any) =>
  socket.emit("botRequest", {
    content: {
      text: msg,
      userId: session.userID,
      appId: "appId",
      channel: "diksha",
      from: session.socketID,
      context: null,
      accessToken: accessToken,
    },
    to: "admin",
  });

export const startWebsocketConnection = () => {
  socket.on("connect", () => {
    console.log(`opened ws connection ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("close ws connection");
  });

  socket.on("botResponse", (arg: any) => {
    onMessageCallback && onMessageCallback(arg);
  });

  socket.on("session", (arg: any) => {
    onSessionCallback && onSessionCallback(arg);
  });
};

let onMessageCallback: (arg0: any) => any,
  onSessionCallback: (arg0: any) => any;
export const registerOnMessageCallback = (fn: (msg: any) => void) => {
  onMessageCallback = fn;
};

export const registerOnSessionCallback = (fn: (session: any) => void) => {
  onSessionCallback = fn;
};
