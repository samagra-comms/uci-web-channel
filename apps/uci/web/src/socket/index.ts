type SendType = {
    text: string;
    socketSession: { userID: string; socketID: string };
    socket: any;
};

export const send = ({ text, socketSession, socket }: SendType) => {
    console.log('socket:', { text, socketSession, socket });
    socket?.emit('botRequest', {
        content: {
            text,
            userId: socketSession.userID,
            // appId: "NL_App_Id",
            appId: JSON.parse(localStorage.getItem('currentUser') || '')?.id,
            channel: 'NL App',
            from: socketSession.socketID,
            context: null,
            accessToken: null,
        },
        to: socketSession?.userID,
    });
};
