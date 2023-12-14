import { Socket } from 'socket.io-client';
declare class UCI {
    socket: Socket | undefined;
    msgReceiveCb: any;
    session: any;
    constructor(URL: string, socketOptions: any, onRecieveCallback: any);
    handleMessage: (message: any) => void;
    handleSocketSession: (session: any) => void;
    onDisconnect: () => void;
    sendMessage: ({ text, to, from, optional }: any) => void;
}
export { UCI };
