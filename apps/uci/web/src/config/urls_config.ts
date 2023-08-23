import { BaseUrls } from '@/types';

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

const baseUrls: BaseUrls = {
    development: {
        chatHistoryUrl: process.env.NEXT_PUBLIC_CHAT_HISTORY_URL,
        botDetailsUrl: process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL,
        otpBaseUrl: process.env.NEXT_PUBLIC_OTP_BASE_URL,
    },
    production: {
        chatHistoryUrl: process.env.NEXT_PUBLIC_CHAT_HISTORY_URL,
        botDetailsUrl: process.env.NEXT_PUBLIC_UCI_BOT_BASE_URL,
        otpBaseUrl: process.env.NEXT_PUBLIC_OTP_BASE_URL,
    },
};

export const urlsConfig = baseUrls[environment];
console.log(urlsConfig);
console.log(environment);
