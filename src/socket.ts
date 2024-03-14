import { io } from 'socket.io-client';
import { socketUrl } from './utils/urls';

const URL = socketUrl;

export const socket = io(URL, {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization: `Bearer ${localStorage.getItem('auth') || process.env.REACT_APP_AUTH_TOKEN}`,
				channel: 'nlpwa'
			}
		}
	},
	query: {
		deviceId: `nlpwa:${localStorage.getItem('mobile') || process.env.REACT_APP_MOBILE}`
	},
	autoConnect: false
});


