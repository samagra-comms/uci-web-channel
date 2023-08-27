'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import profilePic from '@/assets/images/bot_icon_2.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext } from '@/context';
import { ChatUiComponent, FullScreenLoader } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVideo,
    faPhone,
    faEllipsisV,
    faLightbulb,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import {
    AvatarImage,
    BackBox,
    CenteredFlex,
    ChatWindow,
    FlexContainer,
    InnerRing,
    MainFlex,
    Span,
    StyledAvatarContainer,
    StyledBox,
    StyledCenteredFlex,
    StyledFlex,
    StyledText,
    TopSection,
} from './styled';
import { useTheme } from '@/providers/ThemeProvider';
import { useSelector } from 'react-redux';
import { config } from '@/config';

interface chatProps {
    params?: { chatid: string };
}

const Chats = ({ params }: chatProps) => {
    const loading = useSelector((state: any) => state.userList.loading);
    const { theme, toggleTheme } = useTheme();
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
                .then(res => {
                    if (res.status === 403) {
                        setUserImage(profilePic);
                    } else {
                        setUserImage(context?.currentUser?.botImage);
                    }
                })
                .catch(err => {
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
        return (
            <>
                <div>hi</div>
            </>
        );

    return (
        <>
            <FlexContainer
                mainFlexWidth={mainFlexWidth}
                isHomepage={isHomepage}
                theme={theme}
            >
                <MainFlex config={config}>
                    {context?.currentUser ? (
                        <>
                            <TopSection theme={theme} config={config}>
                                <Box
                                    flex="1.5"
                                    display={{ base: 'block', md: 'none' }}
                                >
                                    <Button
                                        marginTop="20px"
                                        onClick={(): void => {
                                            localStorage.removeItem('userMsgs');
                                            context?.setMessages([]);
                                            router.push('/');
                                        }}
                                        variant="ghost"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                config?.chatWindow?.topbar?.icon
                                            }
                                        />
                                    </Button>
                                </Box>
                                <StyledFlex>
                                    <StyledCenteredFlex>
                                        {context?.currentUser && (
                                            <StyledAvatarContainer
                                                config={config}
                                            >
                                                {
                                                    <>
                                                        <InnerRing
                                                            theme={theme}
                                                            config={config}
                                                        >
                                                            <AvatarImage
                                                                src={userImage}
                                                                alt="profile pic"
                                                            />
                                                        </InnerRing>

                                                        <StyledBox>
                                                            <Span theme={theme}>
                                                                {
                                                                    context
                                                                        ?.currentUser
                                                                        ?.name
                                                                }
                                                            </Span>
                                                            {!isMobile && (
                                                                <Span
                                                                    theme={
                                                                        theme
                                                                    }
                                                                >
                                                                    Total
                                                                    Messages:{' '}
                                                                    {
                                                                        context
                                                                            ?.messages
                                                                            ?.length
                                                                    }
                                                                </Span>
                                                            )}
                                                        </StyledBox>
                                                    </>
                                                }
                                            </StyledAvatarContainer>
                                        )}

                                        {/* {!isMobile && (
                                            <IconButton
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faVideo}
                                                    />
                                                }
                                                aria-label="Toggle Theme"
                                                background="none"
                                                size="md"
                                                _hover={{
                                                    transform: 'scale(1.2)',
                                                    transition:
                                                        'transform 0.3s',
                                                }}
                                            />
                                        )} */}

                                        <IconButton
                                            marginRight="40px"
                                            icon={
                                                theme.name == 'light' ? (
                                                    <FontAwesomeIcon
                                                        icon={faMoon}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faLightbulb}
                                                    />
                                                )
                                            }
                                            aria-label="Toggle Theme"
                                            size="lg"
                                            variant="none"
                                            color={theme.color}
                                            onClick={toggleTheme}
                                            _hover={{
                                                transform: 'scale(1.2)',
                                                transition: 'transform 0.3s',
                                            }}
                                        />
                                        {/* Phone Call Icon */}
                                        {/* <Button
                                            variant="ghost"
                                            marginTop="20px"
                                            padding="5px"
                                            marginRight="30px"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPhone}
                                                size="xl"
                                                color={theme?.color}
                                            />
                                        </Button> */}

                                        {/* Triple Dot Icon */}
                                        {/* <Button
                                            variant="ghost"
                                            marginTop="20px"
                                            padding="5px"
                                            marginRight="30px"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEllipsisV}
                                                size="xl"
                                                color={theme?.color}
                                            />
                                        </Button> */}
                                    </StyledCenteredFlex>
                                </StyledFlex>
                                {/* <ThemeToggle /> */}
                            </TopSection>
                            {/* Chat Window */}
                            <ChatWindow theme={theme}>
                                {/* NeoMorphism Box */}
                                <BackBox config={config}>
                                    <Box
                                        height={['85vh', '100vh']}
                                        overflowY="scroll"
                                    >
                                        <ChatUiComponent
                                            currentUser={context?.currentUser}
                                        />
                                    </Box>
                                </BackBox>
                            </ChatWindow>
                        </>
                    ) : (
                        <CenteredFlex>
                            <FullScreenLoader loading={loading}>
                                {' '}
                            </FullScreenLoader>
                            <StyledText>No bot is selected</StyledText>
                        </CenteredFlex>
                    )}
                </MainFlex>
            </FlexContainer>
        </>
    );
};

export default Chats;
