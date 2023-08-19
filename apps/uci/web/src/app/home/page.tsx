import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    Box,
    Flex,
    useBreakpointValue,
    Tabs,
    TabPanels,
    TabPanel,
    Tooltip,
    IconButton,
    Heading,
    InputGroup,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filter, find, forEach } from 'lodash';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ChatItem from '@/components/common/chat-item';
import StarredChatItem from '@/components/common/starred-chat-item';
import { User } from '@/types';
import { AppContext } from '@/context';
import { config } from '@/config';
import ThemeToggle from '@/components/common/Toggle-switch';
import { useTheme } from '@/providers/ThemeProvider';
import { useSelector } from 'react-redux';
import {
    StyledBackBox,
    StyledBox,
    StyledChatList,
    StyledFlex,
    StyledInput,
    StyledMainContainer,
    StyledSearchBox,
    StyledTab,
    StyledTabList,
    StyledInputLeftElement,
    StyledTopSection,
} from './styled';

export default function Home() {
    const { currentUser, allUsers, setMessages } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { theme } = useTheme();
    const usersData = useSelector((state: any) => state.userList.users);

    useEffect(() => {
        if (usersData?.length > 0) {
            console.log('Users data: ', usersData);
        }
    }, [usersData]);

    useEffect(() => {
        try {
            const userMsgsFromLocal = JSON.parse(
                localStorage.getItem('userMsgs') || '',
            );
            if (userMsgsFromLocal?.length > 0) {
                const userMsgs = filter(userMsgsFromLocal, {
                    botUuid: currentUser?.id,
                });
                setMessages(userMsgs);
            }
        } catch (err: any) {
            toast.error(err?.message || err);
        }
    }, [setMessages, currentUser?.id]);

    const history = useRouter();
    const context = useContext(AppContext);

    const onStarredChatsClick = useCallback((): void => {
        history.push('/starred-chats');
    }, [history]);

    useEffect(() => {
        try {
            if (localStorage.getItem('botToFocus')) {
                const bot = find(allUsers, {
                    id: localStorage.getItem('botToFocus'),
                });
                if (bot) {
                    localStorage.removeItem('botToFocus');
                    context?.toChangeCurrentUser(bot);
                    setTimeout(() => {
                        history.push(`/chats/${bot?.id}`);
                    }, 100);
                }
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }, [history, allUsers, context]);

    useEffect(() => {
        setTimeout(() => {
            context?.setLoading(false);
            if (document.getElementById('mainLoader')) {
                // @ts-ignore
                document
                    .getElementById('loader')
                    .setAttribute('display', 'none');
                toast.error(
                    'चैटबॉट जवाब नहीं दे पा रहा हैं। कृपया बाद में पुन: प्रयास करें।',
                );
            }
        }, 60000);
    }, [context]);

    const isMobile = useBreakpointValue({ base: true, md: false });

    // Create a state to track the active tab
    const [activeTab, setActiveTab] = useState('bots');

    const onTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const starredBots = useMemo(() => {
        const botIds = Object.keys(context?.starredMsgs);
        const bots: Array<User> = [];
        forEach(context?.allUsers, user => {
            if (botIds.includes(user?.id)) bots.push(user);
        });
        return bots;
    }, [context?.allUsers, context?.starredMsgs]);

    return (
        <StyledFlex>
            <StyledTopSection theme={theme} config={config}>
                <Box flex="1.5">
                    <Tooltip label={config?.icon?.chat?.label}>
                        <IconButton
                            icon={
                                <FontAwesomeIcon
                                    icon={config?.icon?.chat?.icon}
                                />
                            }
                            aria-label="Chats"
                            size={config?.icon?.chat?.size}
                            colorScheme={config?.icon?.chat?.colorScheme}
                            variant={config?.icon?.chat?.variant}
                            margin={config?.icon?.chat?.margin}
                        />
                    </Tooltip>
                </Box>
                <ThemeToggle />
                <Flex
                    flex="9"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex justifyContent="center" alignItems="center">
                        <Heading
                            as="h1"
                            size={config?.heading?.size}
                            color={theme?.headingColor}
                            margin={config?.heading?.margin}
                        >
                            {config?.heading?.text}
                        </Heading>
                    </Flex>
                </Flex>
            </StyledTopSection>
            <Box height="75px" />
            <StyledSearchBox config={config}>
                <InputGroup padding={'0.5'}>
                    <StyledInput
                        theme={theme}
                        config={config}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={config?.search?.placeholder}
                    />
                    <StyledInputLeftElement config={config}>
                        <FontAwesomeIcon
                            icon={config?.search?.icon}
                            color="gray"
                        />
                    </StyledInputLeftElement>
                </InputGroup>
            </StyledSearchBox>
            <StyledBox>
                <StyledMainContainer isMobile={isMobile}>
                    <StyledBackBox theme={theme}>
                        <Tabs
                            isFitted
                            variant="unstyled"
                            colorScheme="teal"
                            onChange={onTabChange}
                            marginTop="5"
                        >
                            <StyledTabList>
                                <StyledTab
                                    config={config}
                                    theme={theme}
                                    _selected={{
                                        color: theme?.color,
                                        bg: theme?.innerBackground,
                                    }}
                                >
                                    {config?.tab?.bots?.text}
                                </StyledTab>
                                <StyledTab
                                    theme={theme}
                                    config={config}
                                    _selected={{
                                        color: theme?.color,
                                        bg: theme?.innerBackground,
                                    }}
                                >
                                    {config?.tab?.Starredchat?.text}
                                </StyledTab>
                            </StyledTabList>
                            <TabPanels>
                                <TabPanel>
                                    <StyledChatList>
                                        {usersData?.length > 0 ? (
                                            <>
                                                {usersData.map(
                                                    (user: any, index: any) => (
                                                        <div key={user?.id}>
                                                            <ChatItem
                                                                key={index}
                                                                active={
                                                                    user.active
                                                                }
                                                                name={user.name}
                                                                phoneNumber={
                                                                    user.number
                                                                }
                                                                user={user}
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </>
                                        ) : (
                                            <ChatItem
                                                key={0}
                                                active={false}
                                                name={'No Bots Available'}
                                                phoneNumber={''}
                                                isBlank
                                            />
                                        )}
                                    </StyledChatList>
                                </TabPanel>
                                <TabPanel>
                                    <StyledChatList>
                                        {starredBots.length > 0 ? (
                                            <>
                                                {(starredBots ?? [])?.map(
                                                    (user, index) => (
                                                        <StarredChatItem
                                                            toChangeCurrentUser={(): null =>
                                                                null
                                                            }
                                                            key={index}
                                                            active={user.active}
                                                            name={user.name}
                                                            phoneNumber={
                                                                user.number
                                                            }
                                                            user={user}
                                                        />
                                                    ),
                                                )}
                                            </>
                                        ) : (
                                            <StarredChatItem
                                                toChangeCurrentUser={(): null =>
                                                    null
                                                }
                                                key={0}
                                                active={false}
                                                name={'No Starred Messages'}
                                                isBlank
                                            />
                                        )}
                                    </StyledChatList>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </StyledBackBox>
                </StyledMainContainer>
            </StyledBox>
        </StyledFlex>
    );
}
