import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const getConvHistoryUrl = (user: any): string =>
// 	`${
// 		process.env.NEXT_PUBLIC_CHAT_HISTORY_URL
// 	}/xmsg/conversation-history?provider=pwa&endDate=${moment()
// 		.add(7, 'days')
// 		.format('DD-MM-YYYY')}&startDate=19-03-2023&botId=${
// 		user?.id
// 	}&userId=${`nlpwa:${localStorage.getItem('mobile')}`}`;

export const getConvHistoryUrl = (user: any): string =>
	`http://159.65.151.114:9080/xmsg/conversation-history?provider=pwa&endDate=${moment()
		.add(7, 'days')
		.format('DD-MM-YYYY')}&startDate=19-03-2023&botId=${
		user?.id
	}&userId=${`nlpwa:${localStorage.getItem('mobile')}`}`;
	
export const getBotDetailsUrl = (): string =>
	// `${process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL}/admin/bot/allContextual`;
	`http://159.65.151.114:9999/admin/bot/allContextual`;

// export const getBotDetailsUrl = (botId: string): string =>
// 	`${process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL}/admin/bot/${botId}`;
