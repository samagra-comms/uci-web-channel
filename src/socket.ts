import { io } from 'socket.io-client';
import { socketUrl } from './utils/urls';

const URL = socketUrl;

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
