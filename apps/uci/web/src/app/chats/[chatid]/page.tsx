'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import profilePic from '@/assets/images/bot_icon_2.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext } from '@/context';
import { ChatUiComponent, FullScreenLoader } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';
import {
    AvatarImage,
    BackBox,
    CenteredFlex,
    ChatWindow,
    FlexContainer,
    InnerRing,
    MainBox,
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
import { ThemeProvider } from 'styled-components';

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
    const currentUser = useSelector(
        (state: any) => state.userList.currentUser.name,
    );
    console.log(currentUser);

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
            <ThemeProvider theme={theme}>
                <FlexContainer
                    mainFlexWidth={mainFlexWidth}
                    isHomepage={isHomepage}
                >
                    <MainFlex>
                        {currentUser ? (
                            <>
                                <TopSection>
                                    <Box
                                        flex="1.5"
                                        display={{ base: 'block', md: 'none' }}
                                    >
                                        <Button
                                            marginTop="20px"
                                            onClick={(): void => {
                                                localStorage.removeItem(
                                                    'userMsgs',
                                                );
                                                context?.setMessages([]);
                                                router.push('/');
                                            }}
                                            variant="ghost"
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    config?.chatWindow?.topbar
                                                        ?.icon
                                                }
                                            />
                                        </Button>
                                    </Box>
                                    <StyledFlex>
                                        <StyledCenteredFlex>
                                            {context?.currentUser && (
                                                <StyledAvatarContainer>
                                                    {
                                                        <>
                                                            <InnerRing>
                                                                <AvatarImage
                                                                    src={
                                                                        userImage
                                                                    }
                                                                    alt="profile pic"
                                                                />
                                                            </InnerRing>

                                                            <StyledBox>
                                                                <Span>
                                                                    {
                                                                        context
                                                                            ?.currentUser
                                                                            ?.name
                                                                    }
                                                                </Span>
                                                                {!isMobile && (
                                                                    <Span>
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
                                            <IconButton
                                                marginRight="40px"
                                                icon={
                                                    theme.name == 'light' ? (
                                                        <FontAwesomeIcon
                                                            icon={
                                                                config?.theme
                                                                    ?.light
                                                                    ?.icon
                                                            }
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={
                                                                config?.theme
                                                                    ?.dark?.icon
                                                            }
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
                                                    transition:
                                                        'transform 0.3s',
                                                }}
                                            />
                                        </StyledCenteredFlex>
                                    </StyledFlex>
                                    {/* <ThemeToggle /> */}
                                </TopSection>
                                {/* Chat Window */}
                                <ChatWindow>
                                    {/* NeoMorphism Box */}
                                    <BackBox>
                                        <MainBox>
                                            <ChatUiComponent
                                                currentUser={
                                                    context?.currentUser
                                                }
                                            />
                                        </MainBox>
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
            </ThemeProvider>
        </>
    );
};

export default Chats;
