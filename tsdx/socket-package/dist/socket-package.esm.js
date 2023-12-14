import { io } from 'socket.io-client';

// import { useEffect, useState } from 'react';
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
var UCI = function UCI(URL, socketOptions, onRecieveCallback) {
  var _this = this;
  this.handleMessage = function (message) {
    //ReceiveCallback to be used here
    console.log(message);
    _this.msgReceiveCb(message);
  };
  this.handleSocketSession = function (session) {
    _this.session = session;
  };
  this.onDisconnect = function () {
    var _this$socket;
    (_this$socket = _this.socket) == null ? void 0 : _this$socket.disconnect();
  };
  this.sendMessage = function (_ref) {
    var _this$socket2;
    var text = _ref.text,
      to = _ref.to,
      from = _ref.from,
      optional = _ref.optional;
    (_this$socket2 = _this.socket) == null ? void 0 : _this$socket2.emit('botRequest', {
      content: {
        text: text,
        to: to,
        appId: optional == null ? void 0 : optional.appId,
        channel: optional == null ? void 0 : optional.channel,
        from: from,
        context: null,
        accessToken: null
      },
      to: to
    });
  };
  this.socket = io(URL, socketOptions);
  this.msgReceiveCb = onRecieveCallback;
  this.socket.connect();
  this.socket.on('botResponse', this.handleMessage);
  this.socket.on('session', this.handleSocketSession);
};
// const socket = new UCI({ url, socketOptions, callback });
// socket.sendMessage({ text, to, from, callback, optional });
// const socket = new UCI({url, socketOptions, callback});
// socket.sendMessage({text, to, from, callback, optional});
// socket.handleMessage();
//! Callback will have 'bot request, bot response'
//! options will have connections and messages
//$ Like this: options:{connection:{}, message: {}}

export { UCI };
//# sourceMappingURL=socket-package.esm.js.map
