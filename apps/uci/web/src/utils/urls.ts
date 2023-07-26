import moment from 'moment';

export const getConvHistoryUrl = (user: any): string =>
	`${process.env.NEXT_PUBLIC_CHAT_HISTORY_URL}/xmsg/conversation-history?provider=pwa&endDate=${moment()
		.add(7, 'days')
		.format('DD-MM-YYYY')}&startDate=19-03-2023&botId=${user?.id
	}&userId=${`nlpwa:${localStorage.getItem('mobile')}`}`;

export const getBotDetailsUrl = (): string =>
	// `${process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL}/admin/bot/allContextual`;
	`${process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL}/admin/bot/allContextual`;

export const getOtpUrl = (mobile: string): string => `${process.env.NEXT_PUBLIC_OTP_BASE_URL}/uci/sendOTP?phone=${mobile}`;
export const getOtpVerifyUrl = (mobile: string, otp: string): string => `${process.env.NEXT_PUBLIC_OTP_BASE_URL}/uci/loginOrRegister?phone=${mobile}&otp=${otp}`;


