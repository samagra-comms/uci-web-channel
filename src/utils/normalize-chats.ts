import { filter, map, sortBy, toUpper } from 'lodash';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normalizedChat = (chats: any): any => {
	const sortedChats = sortBy(
		filter(
			chats?.map((chat: any) => {console.log(chat); return {
				...chat,
				disabled: true,
				text: chat?.payload?.text === 'This conversation has expired now. Please contact your state admin to seek help with this.' ? "यह फॉर्म समाप्त हो गया है !": chat?.payload?.text,
				//msg.content.title === 'This conversation has expired now. Please contact your state admin to seek help with this.' ? "यह फॉर्म समाप्त हो गया है !": msg.content.title,
				username: chat?.userId,
				position: chat?.messageState === 'SENT' ? 'left' : 'right',
				isIgnore:
					toUpper(chat?.payload?.text) ===
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					toUpper(JSON.parse(localStorage.getItem('currentUser'))?.startingMessage),
				// toUpper(currentUser?.startingMessage),
				time: moment(chat.sentTimestamp || chat.repliedTimestamp).valueOf()
			}}),
			{ isIgnore: false }
		),
		['time', 'messageState']
	);
	return map(sortedChats, (sortedChat, index) => {
		return { ...sortedChat, disabled: index !== Number(sortedChats?.length) - 1 };
	});
};