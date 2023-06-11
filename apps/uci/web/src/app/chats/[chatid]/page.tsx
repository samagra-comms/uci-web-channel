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
import config1 from "./config1.json";

const Chats: NextPage<{ params: { chatid: string } }> = ({ params }) => {

    const router = useRouter();
    const context = useContext(AppContext);
   
    useEffect(() => {
        if (!params?.chatid) router.push('/');
    }, [router, params?.chatid]);

    useEffect(() => {
        window && window?.androidInteract?.onBotListingScreenFocused(false);
        window &&
            window?.androidInteract?.log(`On Home Page onBotListingScreenFocused:false triggered`);
    }, []);



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
        <Flex style={{ backgroundColor: config1.style1["bgColor"], flexDirection: config1.style1["flexDirection"], height: config1.style1["height"], width: config1.style1["width"]}}>
            {/* Top Section */}
            <Box style={{ width: config1.top_section["width"], height: config1.top_section["height"], fontFamily: config1.top_section["font-family"], fontWeight: config1.top_section["font-weight"], fontSize: config1.top_section["font-size"], display: config1.top_section["display"], flexWrap: config1.top_section["flex-wrap"], alignitem: config1.top_section["align-item"], color: config1.top_section["color"], padding: config1.top_section["padding"], backgroundColor: config1.top_section["background-color"]}}>
                {/* For the back button */
                <Box flex="1.5">
                <Button style={{ border: config1.style2["border"], padding: config1.style2["padding"], borderRadius: config1.style2["borderRadius"], fontSize: config1.style2["fontSize"],
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
                <Flex >
                    <Flex style={{ justifyContent: config1.style3["justifyContent"], alignItems: config1.style3["alignItems"], width: config1.style3["width"]}}>
                        <Box style={{ display: config1.avatarContainer["display"], alignItems: config1.avatarContainer["align-items"], height: config1.avatarContainer["height"], width: config1.avatarContainer["width"]}}>
                            {
                                <>
                                    <div style={{ width: config1.innerRing["width"], height: config1.innerRing["height"], borderRadius: config1.innerRing["border-radius"], border: config1.innerRing["border"], marginRight: config1.innerRing["margin-right"]}}>
                                        <Image src={profilePic} alt="profile pic" />
                                    </div>
                                    <Box style={{ display: config1.style4["display"], justifyContent: config1.style4["justifyContent"], verticalAlign: config1.style4["verticalAlign"], width: config1.style4["width"]}}
                                    >
                                        <p style={{ textOverflow: config1.style5["textOverflow"], maxWidth: config1.style5["maxWidth"], overflow: config1.style5["overflow"], whiteSpace: config1.style5["whiteSpace"], textAlign: config1.style5["textAlign"], marginBottom: config1.style5["marginBottom"], marginTop: config1.style5["marginTop"]}}>
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
            <Box style={{ height: config1.chatWindow["height"], width: config1.chatWindow["width"], margin: config1.chatWindow["margin"], display: config1.chatWindow["display"], justifyContent: config1.chatWindow["justify-content"], alignItems: config1.chatWindow["align-items"], backgroundColor: config1.chatWindow["background-color"]}}>
                {/* NeoMorphism Box */}
                <Box style={{ width: config1.BackBox["width"], height: config1.BackBox["height"], borderRadius: config1.BackBox["border-radius"], display: config1.BackBox["display"], flexDirection: config1.BackBox["flex-direction"], justifyContent: config1.BackBox["justify-content"]}}>
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