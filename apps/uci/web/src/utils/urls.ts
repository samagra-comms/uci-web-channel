import moment from 'moment';
import { urlsConfig } from '@/config';

const mobile = process.env.NEXT_PUBLIC_MOBILE;
export const getConvHistoryUrl = (user: any): string =>
  `${urlsConfig.chatHistoryUrl}/xmsg/conversation-history?provider=pwa&endDate=
      ${moment().add(7, 'days').format('DD-MM-YYYY')}&startDate=${user?.startDate}&botId=${user?.id}
      &userId=${`nlpwa:${mobile}`}`;

export const getBotDetailsUrl = (): string =>
  `${urlsConfig.botDetailsUrl}/admin/bot/allContextual`;

export const getOtpUrl = (mobile: string): string =>
  `${urlsConfig.otpBaseUrl}/uci/sendOTP?phone=${mobile}`;

export const getOtpVerifyUrl = (mobile: string, otp: string): string =>
  `${urlsConfig.otpBaseUrl}/uci/loginOrRegister?phone=${mobile}&otp=${otp}`;


