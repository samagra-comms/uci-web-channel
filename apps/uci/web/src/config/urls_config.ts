import { BaseUrls } from '@/types';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

const baseUrls: BaseUrls = {
    development: {
        transportUrl: process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL,
        chatHistoryUrl: process.env.NEXT_PUBLIC_CHAT_HISTORY_URL,
        baseUrl: process.env.NEXT_PUBLIC_UCI_BASE_URL,
        botDetailsUrl: process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL,
        otpBaseUrl: process.env.NEXT_PUBLIC_OTP_BASE_URL,
        mobile: process.env.NEXT_PUBLIC_MOBILE,
        authUrl: process.env.NEXT_PUBLIC_AUTH,
    },
    production: {
        transportUrl: process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL,
        chatHistoryUrl: process.env.NEXT_PUBLIC_CHAT_HISTORY_URL,
        baseUrl: process.env.NEXT_PUBLIC_UCI_BASE_URL,
        botDetailsUrl: process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL,
        otpBaseUrl: process.env.NEXT_PUBLIC_OTP_BASE_URL,
        mobile: process.env.NEXT_PUBLIC_MOBILE,
        authUrl: process.env.NEXT_PUBLIC_AUTH,
    },
};

export const urlsConfig = baseUrls[environment];
console.log(urlsConfig);
console.log(environment);
