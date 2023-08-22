import { omit } from 'lodash';
import { io, Socket } from 'socket.io-client';

class UCI {
    socket: Socket | undefined;
    msgReceiveCb: any;
    session: any;
    constructor(URL: string, socketOptions: any, onRecieveCallback: any) {
        // console.log('__happy__', { URL, socketOptions:omit(socketOptions,['host','path','port','secure']), onRecieveCallback });
        this.socket = io(URL, socketOptions);
        this.msgReceiveCb = onRecieveCallback;
        this.socket.connect();

        this.socket.on('botResponse', this.handleMessage);
        this.socket.on('session', this.handleSocketSession);
        this.socket.on('exception', excep => {
            console.log('__happy__: exception:', { excep });
        });
    }

    handleMessage = (message: any) => {
        //ReceiveCallback to be used here
        console.log('__happy__', { message });
        this.msgReceiveCb(message);
    };

    handleSocketSession = (session: any) => {
        console.log('__happy__', { session });

        this.session = session;
    };

    onDisconnect = () => {
        this.socket?.disconnect();
    };

    sendMessage = ({ text, optional }: any) => {
        const payload: any = {
            content: {
                text,
                appId: optional?.appId,
                channel: 'NL App',
                context: null,
                accessToken: null,
                from: this.session.socketID,
                userId: this.session.userID,
            },
            to: 'nlpwa:8767447416',
        };
        console.log('__happy__:', { payload });
        this.socket?.emit('botRequest', payload);
    };
}

export { UCI };
