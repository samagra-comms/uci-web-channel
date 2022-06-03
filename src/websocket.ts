import useNetwork from "hooks/useNetwork";
import { useState } from "react";
const host =
  process.env.NODE_ENV === "production"
    ? window.location.host
    : "localhost:3005";
const { io } = require("socket.io-client");

export const socket = io(`${process.env.REACT_APP_TRANSPORT_SOCKET_URL}`);
export const send = (msg: any, session: any) =>
  socket.emit("botRequest", {
    content: {
      text: msg,
      userId: session.userID,
      appId: "appId",
      channel: "diksha",
      from: session.socketID,
      context: null,
    },
    to: "admin",
  });
export var Flag1=0;
export var Flag2=0;
export const startWebsocketConnection = () => {
  socket.on("connect", () => {
  Flag1=1;
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
Flag2=2;
  onMessageCallback = fn;
};

export const registerOnSessionCallback = (fn: (session: any) => void) => {
  onSessionCallback = fn;
};
