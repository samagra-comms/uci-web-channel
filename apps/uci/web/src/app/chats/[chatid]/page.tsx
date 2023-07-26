'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../../../assets/images/bot_icon_2.png';
import styles from './page.module.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context';
import { NextPage } from 'next';
import { Suspense } from "react";
 import { ChatUiComponent } from '@/components';


const Chats: NextPage<{ params: { chatid: string } }> = ({ params }) => {

    const router = useRouter();
    const context = useContext(AppContext);
   
    useEffect(() => {
        if (!params?.chatid) router.push('/');
    }, [router, params?.chatid]);




    const [showNavExternal3, setShowNavExternal3] = useState(false);
    const [active, setActive] = useState(false);

    const handleClick = (msg: string): void => {
        setShowNavExternal3(!showNavExternal3);

        // @ts-ignore
        context?.sendMessage(msg, null, true, currentUser);
    };
    if(typeof window=== undefined || typeof window=== 'undefined' )
    return <></>
    return <>
        <Flex bgColor="var(--primarydarkblue)" flexDirection="column" height="100vh" width="100%">
            {/* Top Section */}
            <Box className={`${styles.top_section}`}>
                {/* For the back button */}
                <Box flex="1.5">
                    <Button
                        style={{
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '50%',
                            fontSize: '14px'
                        }}
                        onClick={(): void => {
                            localStorage.removeItem('userMsgs');
                            context?.setMessages([]);
                            router.push('/');
                        }}
                        size="sm"
                        variant="ghost"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </Box>
                {/* Name and Icon  */}
                <Flex flex="9" justifyContent="space-between" alignItems="center">
                    <Flex justifyContent="center" alignItems="center" width={'100%'}>
                        <Box className={`${styles.avatarContainer} `} style={{ width: '100%' }}>
                            {
                                <>
                                    <div className={styles.innerRing}>
                                        <Image src={profilePic} alt="profile pic" />
                                    </div>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            verticalAlign: 'center',
                                            width: '100%'
                                        }}
                                    >
                                        <p
                                            style={{
                                                textOverflow: 'ellipsis',
                                                maxWidth: '45vw',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'left',
                                                marginBottom: 'auto',
                                                marginTop: 'auto'
                                            }}
                                        >
                                            {context?.currentUser?.name}
                                        </p>
                                        {/* <MDBNavbar>
											<MDBContainer fluid>
												<MDBNavbarToggler
													className="ms-auto"
													type="span"
													style={{
														backgroundColor: active ? 'white' : '#2d3594',
														boxShadow: 'none'
													}}
													data-target="#navbarToggleExternalContent"
													aria-controls="navbarToggleExternalContent"
													aria-expanded="false"
													aria-label="Toggle navigation"
													onClick={(): void => {
														setActive((prev) => !prev);
														setShowNavExternal3(!showNavExternal3);
													}}
												>
													<MDBIcon icon="bars" style={{ color: active ? 'black' : 'white' }} fas />
												</MDBNavbarToggler>
											</MDBContainer>
										</MDBNavbar>

										<MDBCollapse
											show={showNavExternal3}
											style={{
												position: 'absolute',
												zIndex: 10,
												top: '9vh',
												right: 0,
												width: '60vw'
											}}
										>
											<div className="bg-light shadow-3 p-1">
												<MDBBtn
													block
													className="border-bottom m-0 fs-6"
													color="link"
													onClick={(): void => {
														setActive((prev) => !prev);
														handleClick('*');
													}}
												>
													सर्वे फिर से शुरू करें
												</MDBBtn>
												<MDBBtn
													block
													className="border-bottom m-0 fs-6"
													color="link"
													onClick={(): void => {
														setActive((prev) => !prev);
														handleClick('#');
													}}
												>
													पिछली प्रतिक्रिया संपादित करें
												</MDBBtn>
											</div>
										</MDBCollapse> */}
                                    </Box>
                                </>
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Chat Window */}
            <Box className={`${styles.chatWindow}`}>
                {/* NeoMorphism Box */}
                <Box className={`${styles.BackBox}`} style={{ borderRadius: '0px' }}>
                    {/* Chat Area */}
                    <Box style={{ height: '100%' }}>
                    <ChatUiComponent currentUser={context?.currentUser} />
                        
                    </Box>
                </Box>
            </Box>
        </Flex>
    </>;
};

export default Chats;