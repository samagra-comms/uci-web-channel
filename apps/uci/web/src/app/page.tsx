'use client';
import React, { useContext } from 'react';
import {
    Flex,
    Box,
    VStack,
    Avatar,
    IconButton,
    useBreakpointValue,
} from '@chakra-ui/react';
import Chats from './chats/[chatid]/page';
import Home from './home/page';
import { useTheme } from '@/providers/ThemeProvider';
import {
    faComment,
    faCog,
    faMoon,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarredChat from './starred-chat/[chatId]/page';
import { AppContext } from '@/context';
import { config } from '@/config';

const ParentComponent = () => {
    const { theme, toggleTheme } = useTheme();
    const isMobile = useBreakpointValue({ base: false, md: true });
    const { showStarredChat } = useContext(AppContext);

    return (
        <Flex background={theme?.mainBackground} h="100vh">
            {config?.sideBar.visible == 'true' && isMobile && (
                <VStack spacing={60} p={0} align="center">
                    <Box>
                        <img src="./uci.png" alt="Logo" />
                    </Box>
                    <VStack spacing={4} align="center">
                        <IconButton
                            icon={<FontAwesomeIcon icon={faComment} />}
                            aria-label="Chat"
                            size="lg"
                            _hover={{
                                transform: 'scale(1.2)',
                                transition: 'transform 0.3s',
                            }}
                        />
                        <IconButton
                            icon={<FontAwesomeIcon icon={faCog} />}
                            aria-label="Settings"
                            size="lg"
                            _hover={{
                                transform: 'scale(1.2)',
                                transition: 'transform 0.3s',
                            }}
                        />
                        <IconButton
                            icon={
                                theme.name == 'light' ? (
                                    <FontAwesomeIcon icon={faMoon} />
                                ) : (
                                    <FontAwesomeIcon icon={faLightbulb} />
                                )
                            }
                            aria-label="Toggle Theme"
                            size="lg"
                            onClick={toggleTheme}
                            _hover={{
                                transform: 'scale(1.2)',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </VStack>

                    <Box>
                        <Avatar
                            size="lg"
                            name="John Doe"
                            src="path-to-avatar-image.png"
                            _hover={{
                                transform: 'scale(1.2)',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </Box>
                </VStack>
            )}
            <Flex>
                <Home />
                {showStarredChat ? <StarredChat /> : <Chats />}
            </Flex>
        </Flex>
    );
};

export default ParentComponent;
