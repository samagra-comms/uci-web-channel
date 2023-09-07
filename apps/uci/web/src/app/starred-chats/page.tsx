'use client';
import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { forEach } from 'lodash';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context';
import { User } from '@/types';

import { NextPage } from 'next';
import StarredChatItem from '@/components/common/starred-chat-item';
import { setStarMessage } from '@/store/slices/userMessageSlice';
import { useSelector } from 'react-redux';

const StarredChats: NextPage = () => {
    const context = useContext(AppContext);
    const history = useRouter();
    const starredMessage = useSelector(
        (state: any) => state.userMessages.starMessage,
    );

    const starredBots = useMemo(() => {
        const botIds = Object.keys(starredMessage);
        const bots: Array<User> = [];
        forEach(context?.allUsers, user => {
            if (botIds.includes(user?.id)) bots.push(user);
        });
        return bots;
    }, [context?.allUsers, starredMessage]);

    const redirectToHome = useCallback(() => history.push('/'), [history]);

    return (
        <Flex flexDirection="column" height="100vh">
            <Box className={`${styles.top_section}`}>
                {/* For the back button */}
                <Box flex="1.5">
                    <Button
                        style={{
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '50%',
                            fontSize: '14px',
                        }}
                        onClick={redirectToHome}
                        size="sm"
                        variant="ghost"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </Box>
                {/* Name and Icon */}
                <Flex
                    flex="9"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex justifyContent="center" alignItems="center">
                        <Box className={`${styles.avatarContainer}`}>
                            <Box>Starred Messages</Box>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            <Box className={styles.mainContainer}>
                <Box className={`${styles.backBox}`}>
                    <Box className={styles.chatList}>
                        <Box
                            style={{
                                textAlign: 'center',
                                fontWeight: 700,
                                fontFamily: 'Mulish',
                            }}
                        >
                            प्रत्येक चैट के Starred Messages को देखने के लिए,
                            नीचे चैट पर क्लिक करें।
                        </Box>
                        {starredBots.length > 0 ? (
                            <>
                                {(starredBots ?? [])?.map((user, index) => (
                                    <StarredChatItem
                                        toChangeCurrentUser={(): null => null}
                                        key={index}
                                        active={user.active}
                                        name={user.name}
                                        phoneNumber={user.number}
                                        user={user}
                                    />
                                ))}
                            </>
                        ) : (
                            <StarredChatItem
                                toChangeCurrentUser={(): null => null}
                                key={0}
                                active={false}
                                name={'No Starred Messages'}
                                isBlank
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default StarredChats;
