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
import { filter, find, forEach, reverse } from 'lodash';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ChatItem from '@/components/common/chat-item';
import StarredChatItem from '@/components/common/starred-chat-item';
import { User } from '@/types';
import { AppContext } from '@/context';
import { config } from '@/config';
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
    LoadMoreButton,
    LoadMoreIcon,
} from './styled';
import moment from 'moment';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import { usersDataSelector } from '@/store/slices/userListSlice';
import { starredMessageSelector } from '@/store/slices/userMessageSlice';

export default function Home() {
    const { currentUser, allUsers, setMessages } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [showStarredtab, setShowStarredTab] = useState(false);
    const { theme } = useTheme();
    const usersData = useSelector(usersDataSelector);
    const starredMessage = useSelector(starredMessageSelector);

    // useEffect(() => {
    //     if (usersData?.length > 0) {
    //         console.log('Users data: ', usersData);
    //     }
    // }, [usersData]);

    const sortedUsersData = [...usersData].sort((a: any, b: any) => {
        const endDateA = moment(a.endDate);
        const endDateB = moment(b.endDate);
        return endDateA.isBefore(endDateB)
            ? -1
            : endDateA.isAfter(endDateB)
            ? 1
            : 0;
    });
    reverse(sortedUsersData);

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
    const [visibleBots, setVisibleBots] = useState(10);
    const botsPerPage = 20;
    const onLoadMoreClick = () => {
        setVisibleBots(prevVisibleBots => prevVisibleBots + botsPerPage);
    };
    const isMobile = useBreakpointValue({ base: true, md: false });
    // Create a state to track the active tab
    const [activeTab, setActiveTab] = useState('bots');
    const onTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const starredBots = useMemo(() => {
        const botIds = Object.keys(starredMessage);
        const bots: Array<User> = [];
        forEach(usersData, user => {
            if (botIds.includes(user?.id)) bots.push(user);
        });
        return bots;
    }, [usersData, starredMessage]);

    return (
        <>
            <StyledFlex>
                <StyledBox isMobile={isMobile}>
                    <StyledMainContainer isMobile={isMobile}>
                        <StyledBackBox theme={theme} isMobile={isMobile}>
                            <StyledSearchBox
                                config={config}
                                isMobile={isMobile}
                            >
                                <InputGroup padding={'0.5'}>
                                    <StyledInput
                                        theme={theme}
                                        config={config}
                                        value={searchTerm}
                                        onChange={e =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder={
                                            config?.search?.placeholder
                                        }
                                    />
                                    <StyledInputLeftElement config={config}>
                                        <FontAwesomeIcon
                                            icon={config?.search?.icon}
                                            color="gray"
                                        />
                                    </StyledInputLeftElement>
                                </InputGroup>
                            </StyledSearchBox>
                            <Box>
                                <Tabs
                                    isFitted
                                    variant="unstyled"
                                    colorScheme="teal"
                                    onChange={onTabChange}
                                    marginTop="5"
                                >
                                    <StyledTabList>
                                        {showStarredtab ? (
                                            <StyledTab
                                                config={config}
                                                theme={theme}
                                                _selected={{
                                                    color: theme?.color,
                                                    bg: theme?.mainBackground,
                                                }}
                                                onClick={() =>
                                                    setShowStarredTab(false)
                                                }
                                            >
                                                {config?.tab?.bots?.text}
                                            </StyledTab>
                                        ) : (
                                            <StyledTab
                                                theme={theme}
                                                config={config}
                                                _selected={{
                                                    color: theme?.color,
                                                    bg: theme?.mainBackground,
                                                }}
                                                onClick={() =>
                                                    setShowStarredTab(true)
                                                }
                                            >
                                                {config?.tab?.Starredchat?.text}
                                            </StyledTab>
                                        )}
                                    </StyledTabList>
                                    <TabPanels>
                                        {!showStarredtab ? (
                                            <TabPanel>
                                                <StyledChatList>
                                                    {sortedUsersData?.length >
                                                    0 ? (
                                                        <>
                                                            {sortedUsersData
                                                                .slice(
                                                                    0,
                                                                    visibleBots,
                                                                )
                                                                .map(
                                                                    (
                                                                        user: any,
                                                                        index: any,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                user?.id
                                                                            }
                                                                        >
                                                                            <ChatItem
                                                                                image={
                                                                                    user?.botImage
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                                active={
                                                                                    user.active
                                                                                }
                                                                                name={
                                                                                    user.name
                                                                                }
                                                                                phoneNumber={
                                                                                    user.number
                                                                                }
                                                                                user={
                                                                                    user
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ),
                                                                )}
                                                        </>
                                                    ) : (
                                                        <ChatItem
                                                            key={0}
                                                            active={false}
                                                            name={
                                                                'No Bots Available'
                                                            }
                                                            phoneNumber={''}
                                                            isBlank
                                                        />
                                                    )}
                                                </StyledChatList>
                                            </TabPanel>
                                        ) : (
                                            <TabPanel>
                                                <StyledChatList>
                                                    {starredBots.length > 0 ? (
                                                        <>
                                                            {(
                                                                starredBots ??
                                                                []
                                                            )?.map(
                                                                (
                                                                    user,
                                                                    index,
                                                                ) => (
                                                                    <StarredChatItem
                                                                        toChangeCurrentUser={(): null =>
                                                                            null
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        active={
                                                                            user.active
                                                                        }
                                                                        name={
                                                                            user.name
                                                                        }
                                                                        phoneNumber={
                                                                            user.number
                                                                        }
                                                                        user={
                                                                            user
                                                                        }
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
                                                            name={
                                                                'No Starred Messages'
                                                            }
                                                            isBlank
                                                        />
                                                    )}
                                                </StyledChatList>
                                            </TabPanel>
                                        )}
                                    </TabPanels>
                                </Tabs>
                            </Box>
                            <LoadMoreButton onClick={onLoadMoreClick}>
                                <div>
                                    <LoadMoreIcon icon={faAngleDown} />
                                </div>
                            </LoadMoreButton>
                        </StyledBackBox>
                    </StyledMainContainer>
                </StyledBox>
            </StyledFlex>
        </>
    );
}
