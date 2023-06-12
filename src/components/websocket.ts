import {io} from 'socket.io-client';
// const host =
//   process.env.NODE_ENV === "production"
//     ? window.location.host
//     : "localhost:3005";


// export const socket = io(`${process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL}`,{query: {deviceID:`phone:${localStorage.getItem("phoneNumber")}`}});
export const send = (msg: any, session: any, accessToken: any,toUser: {name: string, number: string | null},socket:any,media:any) => {

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = currentDate.getMonth().toString(); // Month index starts from 0 (0 - January, 1 - February, etc.)
  const day = currentDate.getDate().toString();
  const hours = currentDate.getHours().toString();
  const minutes = currentDate.getMinutes().toString();
  const seconds = currentDate.getSeconds().toString();

  if (toUser.number === null || toUser.number === "null") {
    socket.emit("botRequest", {
      content: {
        text: msg,
        date:day+month+year,
        time:hours+minutes+seconds,
        userId: session.userID,
        appId: "appId",
        channel: "diksha",
        from: session.socketID,
        context: null,
        accessToken: accessToken,
        media:media
      },
      to: "admin",
    });
  } else {
    socket.emit("botRequest", {
      content: {
        text: msg,
        date:day+month+year,
        time:hours+minutes+seconds,
        userId: session.userID,
        appId: "appId",
        channel: "diksha",
        from: session.socketID,
        context: null,
        accessToken: accessToken,
      },
      to: `phone:${toUser.number}`,
    });
  }
}

export const startWebsocketConnection = (socket: any) => {
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
