'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import profilePic from '@/assets/images/bot_icon_2.png';
import styles from './page.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext } from '@/context';
import { ChatUiComponent } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@/config';
import { Span, StyledBox } from './styled';

interface chatProps {
    params?: { chatid: string };
}

const Chats = ({ params }: chatProps) => {
    const router = useRouter();
    const context = useContext(AppContext);
    const pathname = usePathname();
    const isHomepage = pathname === '/';
    const isMobile = useBreakpointValue({ base: true, md: false });
    const mainFlexWidth = isMobile ? '100vw' : '186vw';
    const [userImage, setUserImage] = useState(profilePic);

    useEffect(() => {
        if (context?.currentUser?.botImage) {
            fetch(context?.currentUser?.botImage)
                .then((res) => {
                    if (res.status === 403) {
                        setUserImage(profilePic);
                    } else {
                        setUserImage(context?.currentUser?.botImage);
                    }
                })
                .catch((err) => {
                    setUserImage(profilePic);
                });
        } else {
            setUserImage(profilePic);
        }
    }, [context?.currentUser?.botImage]);

    useEffect(() => {
        if (!params?.chatid) router.push('/');
    }, [router, params?.chatid]);

    console.log({ context });

    if (typeof window === undefined || typeof window === 'undefined')
        return <>
            <div>hi</div>
        </>

    return (<>
        <Flex width={mainFlexWidth} display={{ base: isHomepage ? 'none' : 'flex', md: 'flex' }}>
            <Flex bgColor="var(--primarydarkblue)" flexDirection="column" height="100vh" width="100%">
                {
                    context?.currentUser ?
                        (<>
                            <Box className={`${styles.top_section}`} height={config?.ChatWindow?.topbar?.height} background={config?.ChatWindow?.topbar?.background}>
                                <Box flex="1.5" display={{ base: 'block', md: 'none' }}>
                                    <Button
                                        onClick={(): void => {
                                            localStorage.removeItem('userMsgs');
                                            context?.setMessages([]);
                                            router.push('/');
                                        }}
                                        variant="ghost">
                                        <FontAwesomeIcon icon={config?.ChatWindow?.topbar?.icon} />
                                    </Button>
                                </Box>
                                <Flex flex='9' justifyContent="space-between" alignItems="center" >
                                    <Flex justifyContent="center" alignItems="center" width={'100%'}>
                                        {
                                            context?.currentUser &&
                                            <Box className={`${styles.avatarContainer} `} style={{ width: '100%' }}>
                                                {
                                                    <>
                                                        <Box className={styles.innerRing} border={config.ChatWindow.topbar.iconBorder}>
                                                            <img src={userImage} alt="profile pic" width={300} height={300} />
                                                        </Box>
                                                        <StyledBox>
                                                            <Span>
                                                                {context?.currentUser?.name}
                                                            </Span>
                                                        </StyledBox>
                                                    </>
                                                }
                                            </Box>
                                        }
                                    </Flex>
                                </Flex>
                            </Box>
                            {/* Chat Window */}
                            <Box className={`${styles.chatWindow}`} padding={config.ChatWindow.window.padding} width={config.ChatWindow.window.width} background={config.ChatWindow.window.background} paddingTop="0.6vw" >
                                {/* NeoMorphism Box */}
                                <Box className={`${styles.BackBox}`} borderRadius={config.ChatWindow.innerWindow.borderRadius}>
                                    {/* Chat Area */}
                                    <Box height={config.ChatWindow.window.height}>
                                        <ChatUiComponent currentUser={context?.currentUser} />
                                    </Box>
                                </Box>
                            </Box>
                        </>)
                        :
                        <Flex justifyContent="center" alignItems="center" height="100vh">
                            <Box fontSize="24px" fontWeight="bold" color="gray.500">
                                No bot is selected
                            </Box>
                        </Flex>
                }
            </Flex>
        </Flex>
    </>)
};

export default Chats;