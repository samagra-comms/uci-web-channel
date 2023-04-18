import { io } from 'socket.io-client';
import { getBaseUrl } from './utils/getBaseUrl';

const URL = `${getBaseUrl('socket')}`;

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
