'use client';
import styles from './page.module.css';
import React, { useCallback, useMemo, useState } from 'react';
import {
    NumberInput,
    NumberInputField,
    Container,
    Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useColorModeValue } from '@chakra-ui/react';
import Logo from '../../assets/images/user.png';
import Image from 'next/image';
import { sendOTP } from '@/utils/api-handler';
import { ChangeEvent, ClickEvent } from '@/types';
import { toast, Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [mobile, setMobile] = useState('');
    // const toast = useToast();

    const backgroundColorToggle = useColorModeValue(
        styles.lightContainer,
        styles.darkContainer,
    );
    const buttonToggle = useColorModeValue('darkGreen', 'var(--darkblue)');

    const handleMobileChange = useCallback((e: ChangeEvent) => {
        setMobile(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        (e: ClickEvent) => {
            if (mobile.length !== 10) {
                return toast.success('Enter a 10 digit number');
            }
            sendOTP(mobile).then(response => {
                if (response.status === 200) {
                    router.push(`/otp?state=${mobile}`);
                } else {
                    toast.error('Something went wrong !!');
                }
            });
        },
        [mobile],
    );

    const textLoginTitle = useMemo(() => `Your Login Title`, []);
    const textLoginAccount = useMemo(() => `Login Account`, []);
    const textGreeting1 = useMemo(
        () => `Hello, welcome back to our account !`,
        [],
    );
    const textSend = useMemo(() => `Send OTP`, []);

    return (
        <div className={`${styles.main} ${backgroundColorToggle}`}>
            <Container
                className={styles.container}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'white',
                }}
            >
                <div style={{ padding: '40px 10px' }}>
                    {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "40px",
                marginTop: "-20px"
              }}
            >
              <Image
                className={styles.loginImage}
                src={GovtOfOdisha}
                alt=""
                width={70}
                height={70}
              />
              <Image
                className={styles.loginImage}
                src={KrishiMela}
                alt=""
                width={70}
                height={70}
              />
            </div> */}
                    <div style={{ margin: 'auto', textAlign: 'center' }}>
                        <Image
                            className={styles.loginImage}
                            src={Logo}
                            alt=""
                            width={140}
                            height={180}
                        />
                    </div>

                    <Box
                        fontWeight="700"
                        fontSize="20px"
                        marginBottom="20px"
                        textAlign={'center'}
                        color="darkgreen"
                    >
                        {textLoginTitle}
                    </Box>
                    <Box
                        fontWeight="700"
                        fontSize="24px"
                        marginBottom="7px"
                        textAlign={'center'}
                        color="black"
                    >
                        {textLoginAccount} <FontAwesomeIcon icon={faUser} />
                    </Box>
                    <Box
                        fontWeight="400"
                        fontSize="13px"
                        color="black"
                        textAlign={'center'}
                    >
                        {textGreeting1}
                    </Box>
                    <NumberInput
                        style={{
                            margin: '40px 0px 0px 0px',
                            border: '1px solid grey',
                        }}
                    >
                        <NumberInputField
                            height="45px"
                            filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))"
                            borderRadius="0px"
                            fontWeight="400"
                            fontSize="14px"
                            color="var(--grey)"
                            placeholder="Enter your phone number"
                            value={mobile}
                            onChange={handleMobileChange}
                        />
                    </NumberInput>
                    <button
                        className={styles.submitButton}
                        style={{
                            marginTop: '40px',
                            width: '100%',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '0px',
                            backgroundColor: `${buttonToggle}`,
                        }}
                        onClick={handleSubmit}
                    >
                        {textSend}
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
