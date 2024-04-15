import { socket } from '../socket';

export const send = (
	msg: any,
	session: any,
	accessToken: any,
	toUser: any,
	socketOld: any,
	media: any
): void => {

	if (toUser?.number === null || toUser?.number === 'null') {
		socket?.emit('botRequest', {
			content: {
				text: msg,
				userId: session.userID,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				appId: JSON.parse(localStorage.getItem('currentUser'))?.id,
				channel: 'NL App',
				from: session.socketID,
				context: null,
				accessToken,
				media
			},
			to: 'admin'
		});
	} else {
		socket?.emit('botRequest', {
			content: {
				text: msg,
				userId: session.userID,
				appId: toUser.id,
				channel: 'NL App',
				from: session.socketID,				
				context: null,
				accessToken
			},
			to: `nlpwa:${localStorage.getItem('mobile')}`
		});
	}
};
