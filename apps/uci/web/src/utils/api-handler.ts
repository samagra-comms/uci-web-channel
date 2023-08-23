import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { getBotDetailsUrl, getOtpUrl, getOtpVerifyUrl } from './urls';

export const sendOTP = (mobile: string): Promise<Response> => {
    return fetch(getOtpUrl(mobile), { method: 'GET' });
};

export const verifyOTP = (mobile: string, otp: string): Promise<Response> => {
    return fetch(getOtpVerifyUrl(mobile, otp), { method: 'get' });
};

export const getBotDetailsList = (): AxiosPromise<
    AxiosResponse & { result: Array<any> }
> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ownerID: process.env.NEXT_PUBLIC_OWNER_ID,
            ownerOrgID: process.env.NEXT_PUBLIC_OwnerOrgId,
            'admin-token': process.env.NEXT_PUBLIC_Admin_Token,
        },
    };

    return axios.get(getBotDetailsUrl(), config);
};
