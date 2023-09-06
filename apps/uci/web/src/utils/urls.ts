import moment from 'moment';
import { urlsConfig } from '@/config';

const mobile = urlsConfig?.mobile || '8767447416';
console.log('happy:', { mobile });
export const getConvHistoryUrl = (user: any): string =>
    `${
        urlsConfig?.chatHistoryUrl
    }/xmsg/conversation-history?provider=pwa&endDate=${moment()
        .add(7, 'days')
        .format('DD-MM-YYYY')}&startDate=${moment(user?.startDate).format(
        'DD-MM-YYYY',
    )}&botId=${user?.id}&userId=${`nlpwa:${mobile}`}`;

export const getBotDetailsUrl = (): string =>
    `${urlsConfig?.botDetailsUrl}/admin/bot/allContextual`;

export const getOtpUrl = (mobile: string): string =>
    `${urlsConfig?.otpBaseUrl}/api/sendOTP?phone=${mobile}`;

export const getOtpVerifyUrl = (mobile: string, otp: string): string =>
    `${urlsConfig?.otpBaseUrl}/uci/loginOrRegister?phone=${mobile}&otp=${otp}`;
