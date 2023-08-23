'use client';
import React, { useContext, FC, useMemo, useEffect } from 'react';
import {
    Box,
    Flex,
    Button,
    useBreakpointValue,
    IconButton,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
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
        <FlexContainer
            mainFlexWidth={mainFlexWidth}
            isHomepage={isHomepage}
            theme={theme}
        >
            <TopSection theme={theme} config={config}>
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
                            <StyledAvatarContainer config={config}>
                                {
                                    <>
                                        <InnerRing
                                            theme={theme}
                                            config={config}
                                        >
                                            <AvatarImage
                                                src={profilePic}
                                                alt="profile pic"
                                            />
                                        </InnerRing>
                                        <StyledBox>
                                            <Span theme={theme}>
                                                {user?.name}
                                            </Span>
                                            {!isMobile && (
                                                <Span theme={theme}>
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
            <ChatWindow theme={theme}>
                {/* NeoMorphism Box */}
                <BackBox config={config}>
                    <Box height={['85vh', '100vh']} overflowY="scroll">
                        <StarredChatList user={user} />
                    </Box>
                </BackBox>
            </ChatWindow>
        </FlexContainer>
    );
};

export default StarredChat;
