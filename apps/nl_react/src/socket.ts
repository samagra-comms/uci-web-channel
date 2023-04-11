import { io } from 'socket.io-client';

const URL = `${process.env.REACT_APP_TRANSPORT_SOCKET_URL}`;

export const socket = io(URL, {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization: `Bearer ${localStorage.getItem('auth')}`,
				channel: 'nlpwa'
			}
		}
	},
	query: {
		deviceId: `nlpwa:${localStorage.getItem('mobile')}`
	},
	autoConnect: false
});
