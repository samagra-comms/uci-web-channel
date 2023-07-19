import moment from "moment";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConvHistoryUrl = (user: any): string =>
	`${localStorage.getItem("chatHistoryUrl") ||
	process.env.REACT_APP_CHAT_HISTORY_URL
	}/xmsg/conversation-history?provider=pwa&endDate=${moment()
		.add(7, "days")
		.format("DD-MM-YYYY")}&startDate=19-03-2023&botId=${user?.id
	}&userId=${`nlpwa:${localStorage.getItem("mobile")}`}`;

export const getBotDetailsUrl = (): string =>
	`${localStorage.getItem("botDetailsUrl") ||
	process.env.REACT_APP_UCI_BOT_BASE_URL
	}/admin/bot/allContextual`;

export const botDetailsUrl = `${localStorage.getItem("botDetailsUrl") ||
	process.env.REACT_APP_UCI_BOT_BASE_URL
	}/admin/bot/allContextual`;

export const socketUrl =
	localStorage.getItem("socketUrl") ||
	process.env.REACT_APP_TRANSPORT_SOCKET_URL;
// export const getBotDetailsUrl = (botId: string): string =>
// 	`${process.env.REACT_APP_UCI_BOT_BASE_URL}/admin/bot/${botId}`;
