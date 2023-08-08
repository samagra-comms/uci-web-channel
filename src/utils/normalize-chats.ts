import { filter, map, sortBy, toUpper } from 'lodash';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normalizedChat = (chats: any): any => {
	const sortedChats = sortBy(
		filter(
			chats?.map((chat: any) => {console.log(chat); return {
				...chat,
				disabled: true,
				text: chat?.payload?.text,
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
		// if (index === Number(sortedChats.length - 1))
		// 	console.log('qwer123:', { index, sortedChat, length: chats.length });
		return { ...sortedChat, disabled: index !== Number(sortedChats?.length) - 1 };
	});
};