'use client';
import type { NextPage } from 'next';
import styles from './page.module.css';
import Head from 'next/head';
import { Box, HStack, PinInput, Link } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useColorModeValue } from '@chakra-ui/react';
import image1 from '../../assets/images/emptyOtp.png';
import { verifyOTP } from '@/utils/api-handler';
import { PinInputComponent } from '@/components/otp/pin-input';
import Image from 'next/image';
import { useGetQueryParam } from '../../hooks';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OTPPage: NextPage = () => {
    const [input, setInput] = useState({
        value1: '',
        value2: '',
        value3: '',
        value4: '',
    });
    const mobile = useGetQueryParam('state');

    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    const router = useRouter();
    router.push(`/otp?state=${mobile}`);
    const handleOTPSubmit: React.FormEventHandler = (
        event: React.FormEvent,
    ) => {
        event.preventDefault();
        const inputOTP: string =
            input.value1 + input.value2 + input.value3 + input.value4;
        if (inputOTP.length === 4 && mobile?.length === 10) {
            verifyOTP(mobile, inputOTP)
                .then(response => response.json())
                .then(data => {
                    if (data.resp.params.status === 'Success') {
                        let expires = new Date();
                        expires.setTime(
                            expires.getTime() +
                                data.resp.result.data.user
                                    .tokenExpirationInstant *
                                    1000,
                        );
                        removeCookie('access_token');
                        setCookie(
                            'access_token',
                            data.resp.result.data.user.token,
                            {
                                path: '/',
                                expires,
                            },
                        );
                        router.push('/');
                    } else {
                        toast.error('Incorrect OTP');
                    }
                })

                .catch(err => console.log(err));
        } else toast.error('Invalid OTP or Mobile');
    };

    const handleOtpChange = useCallback((value: string, key: string) => {
        setInput(prev => ({ ...prev, [key]: value }));
    }, []);

    const backgroundColorToggle = useColorModeValue(
        styles.lightContainer,
        styles.darkContainer,
    );
    const buttonToggle = useColorModeValue('darkGreen', 'var(--darkblue)');

    const textPageTitle = useMemo(() => 'Farmer Bot | OTP', []);
    const textOtpMsg = useMemo(
        () => 'We will send you a one time password on this Mobile Number',
        [],
    );
    const textOtpVerification = useMemo(() => 'OTP Verification', []);
    const textMsg1 = useMemo(() => 'You have an account?', []);
    const textLogin = useMemo(() => 'Login', []);
    const textSubmit = useMemo(() => 'Submit', []);

    return (
        <React.Fragment>
            <Head>
                <title>{textPageTitle}</title>
            </Head>
            <main>
                <div className={`${styles.main} ${backgroundColorToggle}`}>
                    <Box
                        width="100%"
                        maxWidth="400px"
                        height="80vh"
                        display="flex"
                        background={'white'}
                        flexDirection="column"
                        justifyContent="space-between"
                        borderRadius={'5'}
                        margin={'auto'}
                    >
                        <Box
                            className="hi"
                            borderWidth="2px"
                            height="200px"
                            width="100%"
                            flex="2"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                        >
                            <Image src={image1} alt="background" />
                        </Box>
                        <Box
                            padding={1}
                            textAlign="center"
                            display="flex"
                            flexDirection="column"
                            alignContent="center"
                            justifyContent="center"
                            color="black"
                            px="1rem"
                        >
                            <div className={styles.otpVerify}>
                                {textOtpVerification}
                            </div>

                            <div className={styles.otpSent}>{textOtpMsg}</div>
                            <div style={{ marginTop: '10px' }}>
                                <b>+91-{mobile}</b>
                            </div>
                            <HStack
                                style={{
                                    marginTop: '34px',
                                    justifyContent: 'center',
                                }}
                            >
                                <PinInput otp placeholder="">
                                    <PinInputComponent
                                        value={input.value1}
                                        onChange={handleOtpChange}
                                        valueKey="value1"
                                    />
                                    <PinInputComponent
                                        value={input.value2}
                                        onChange={handleOtpChange}
                                        valueKey="value2"
                                    />
                                    <PinInputComponent
                                        value={input.value3}
                                        onChange={handleOtpChange}
                                        valueKey="value3"
                                    />
                                    <PinInputComponent
                                        value={input.value4}
                                        onChange={handleOtpChange}
                                        valueKey="value4"
                                    />
                                </PinInput>
                            </HStack>
                            <Box width="100%">
                                {' '}
                                <button
                                    className={styles.submitButton}
                                    style={{
                                        marginTop: '43px',
                                        width: '100%',
                                        padding: '10px',
                                        border: 'none',
                                        borderRadius: '0px',
                                        backgroundColor: `${buttonToggle}`,
                                    }}
                                    onClick={handleOTPSubmit}
                                >
                                    {textSubmit}
                                </button>
                            </Box>
                        </Box>
                        <Box alignSelf="">
                            <div className={styles.login}>
                                {textMsg1} &nbsp;
                                <b>
                                    <Link
                                        href="/login"
                                        style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {textLogin}
                                    </Link>
                                </b>
                            </div>
                        </Box>
                    </Box>
                </div>
            </main>
        </React.Fragment>
    );
};

export default OTPPage;
