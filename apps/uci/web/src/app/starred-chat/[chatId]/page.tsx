'use client';
import React, { useContext, FC, useMemo, useEffect } from 'react';
import { Box, Button, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLightbulb,
    faMoon,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { find } from 'lodash';
import profilePic from '../../../assets/images/bot_icon_2.png';
import { AppContext } from '@/context';
import { usePathname, useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { StarredChatList } from '@/components';
import { useTheme } from '@/providers/ThemeProvider';
import {
    AvatarImage,
    BackBox,
    ChatWindow,
    FlexContainer,
    InnerRing,
    Span,
    StyledAvatarContainer,
    StyledBox,
    StyledCenteredFlex,
    StyledFlex,
    TopSection,
} from './styled';
import { config } from '@/config';
import { ThemeProvider } from 'styled-components';

const StarredChat: NextPage<{ params?: { chatId: string } }> = ({ params }) => {
    const context = useContext(AppContext);
    const history = useRouter();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const isHomepage = pathname === '/';
    const isMobile = useBreakpointValue({ base: true, md: false });
    const mainFlexWidth = isMobile ? '100vw' : '186vw';
    const user = useMemo(
        () => find(context?.allUsers, { id: params?.chatId }),
        [context?.allUsers, params?.chatId],
    );

    return (
        <ThemeProvider theme={theme}>
            <FlexContainer
                mainFlexWidth={mainFlexWidth}
                isHomepage={isHomepage}
            >
                <TopSection>
                    <Box flex="1.5" display={{ base: 'block', md: 'none' }}>
                        <Button
                            marginTop="20px"
                            onClick={(): void => {
                                localStorage.removeItem('userMsgs');
                                context?.setMessages([]);
                                history.push('/');
                            }}
                            variant="ghost"
                        >
                            <FontAwesomeIcon
                                icon={config?.chatWindow?.topbar?.icon}
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
                                                    src={profilePic}
                                                    alt="profile pic"
                                                />
                                            </InnerRing>
                                            <StyledBox>
                                                <Span>{user?.name}</Span>
                                                {!isMobile && (
                                                    <Span>
                                                        Total Messages:{' '}
                                                        {user?.messages?.length}
                                                    </Span>
                                                )}
                                            </StyledBox>
                                        </>
                                    }
                                </StyledAvatarContainer>
                            )}

                            {!isMobile && (
                                <IconButton
                                    icon={<FontAwesomeIcon icon={faVideo} />}
                                    aria-label="Toggle Theme"
                                    background="none"
                                    size="md"
                                    _hover={{
                                        transform: 'scale(1.2)',
                                        transition: 'transform 0.3s',
                                    }}
                                />
                            )}

                            <IconButton
                                marginRight="40px"
                                icon={
                                    theme.name == 'light' ? (
                                        <FontAwesomeIcon icon={faMoon} />
                                    ) : (
                                        <FontAwesomeIcon icon={faLightbulb} />
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
                        </StyledCenteredFlex>
                    </StyledFlex>
                </TopSection>
                <ChatWindow>
                    {/* NeoMorphism Box */}
                    <BackBox>
                        <Box height={['85vh', '100vh']} overflowY="scroll">
                            <StarredChatList user={user} />
                        </Box>
                    </BackBox>
                </ChatWindow>
            </FlexContainer>
        </ThemeProvider>
    );
};

export default StarredChat;
