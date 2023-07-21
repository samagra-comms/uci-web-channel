'use client'
import React, { useContext, useEffect } from 'react';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import profilePic from '../../../assets/images/bot_icon_2.png';
import styles from './page.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext } from '@/context';
import { NextPage } from 'next';
import { ChatUiComponent } from '@/components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chats: NextPage<{ params?: { chatid: string } }> = ({ params }) => {
    const router = useRouter();
    const context = useContext(AppContext);
    const pathname = usePathname();
    const isHomepage = pathname === '/';
    const isMobile = useBreakpointValue({ base: true, md: false });
    const mainFlexWidth = isMobile ? '100vw' : '187vw';

    useEffect(() => {
        if (!params?.chatid) router.push('/');
    }, [router, params?.chatid]);

    if (typeof window === undefined || typeof window === 'undefined')
        return <></>
    return <>
        <Flex width={mainFlexWidth} display={{ base: isHomepage ? 'none' : 'flex', md: 'flex' }}>
            <Flex bgColor="var(--primarydarkblue)" flexDirection="column" height="100vh" width="100%">
                {/* Top Section */}
                <Box className={`${styles.top_section}`}>
                <Box flex="1.5" display={{ base: 'block', md: 'none' }}>
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
                    <Flex flex='9' justifyContent="space-between" alignItems="center" >
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
        </Flex>
    </>;
};

export default Chats;