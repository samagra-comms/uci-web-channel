import { io } from 'socket.io-client';
import { getAuthToken, getDeviceId } from './utils/get-localstorage';

const URL = `${process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL}` || "ws://159.65.151.114:3005" ;

export const socket = io(URL, {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization:  getAuthToken(),
				channel: 'nlpwa'
			}
		}
	},
	query: {
		deviceId: getDeviceId()
	},
	autoConnect: false
});


