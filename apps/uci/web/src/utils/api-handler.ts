import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { getBotDetailsUrl, getOtpUrl, getOtpVerifyUrl } from './urls';

export const sendOTP = (mobile: string): Promise<Response> => {
    return fetch(getOtpUrl(mobile), { method: 'GET' });
};

export const verifyOTP = (mobile: any, inputOTP: string): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_OTP_BASE_URL}/api/login/otp`, {
        method: 'POST',
        body: JSON.stringify({
            loginId: mobile,
            password: inputOTP,
            applicationId: process.env.NEXT_PUBLIC_USER_SERVICE_APP_ID,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
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
