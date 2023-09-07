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
    const sidebarIcons = config?.sideBar?.sidebarIcons || {};

    return (
        <Flex background={theme?.mainBackground} h="100vh">
            {config?.sideBar.visible == 'true' && isMobile && (
                <VStack
                    spacing={52}
                    p={0}
                    width={config?.sideBar?.width}
                    align="center"
                >
                    <Box>
                        <img src={config?.sideBar?.logo} alt="Logo" />
                    </Box>
                    <VStack spacing={4} align="center">
                        {Object.keys(sidebarIcons).map(key => (
                            <IconButton
                                key={key}
                                icon={
                                    <FontAwesomeIcon icon={sidebarIcons[key]} />
                                }
                                aria-label={key}
                                size="lg"
                                _hover={{
                                    transform: 'scale(1.2)',
                                    transition: 'transform 0.3s',
                                }}
                            />
                        ))}
                        <IconButton
                            icon={
                                theme.name == 'light' ? (
                                    <FontAwesomeIcon
                                        icon={config?.theme?.light?.icon}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={config?.theme?.dark?.icon}
                                    />
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
                            name={config?.sideBar?.userImage?.name}
                            size={config?.sideBar?.userImage?.size}
                            src={config?.sideBar?.userImage?.src}
                            // height={config?.sideBar?.userImage?.height}
                            // width={config?.sideBar?.userImage?.width}
                            margin={config?.sideBar?.userImage?.margin}
                            _hover={{
                                transform: 'scale(1.08)',
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
