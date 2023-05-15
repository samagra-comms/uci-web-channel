"use client";
import React, { useContext, FC, useMemo, useEffect } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { find } from 'lodash';
import profilePic from '../../../assets/images/bot_icon_2.png';
import styles from "./page.module.css";
import Image from 'next/image';
import { AppContext } from '@/context';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { StarredChatList } from '@/components';


const StarredChat: NextPage<{ params: { chatId: string } }> = ({ params }) => {
	const context = useContext(AppContext);

	const history = useRouter();
	const user = useMemo(() => find(context?.allUsers, { id: params?.chatId }), [context?.allUsers, params?.chatId]);

	useEffect(() => {
		window && window?.androidInteract?.onBotListingScreenFocused(false);
		window &&
			window?.androidInteract?.onEvent(`On Home Page onBotListingScreenFocused:false triggered`);
	}, []);

	return (
		<Flex bgColor="var(--primarydarkblue)" flexDirection="column" height="100vh" width="100%">
			{/* Top Section */}
			<Box className={`${styles.top_section}`}>
				{/* For the back button */}
				<Box flex="1.5">
					<Button
						style={{
							border: 'none',
							padding: '0.75rem 1rem',
							borderRadius: '50%',
							fontSize: '14px'
						}}
						onClick={(): void => {
							history.push('/starredChats');
						}}
						size="sm"
						variant="ghost"
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</Button>
				</Box>
				{/* Name and Icon */}
				<Flex flex="9" justifyContent="space-between" alignItems="center">
					<Flex justifyContent="center" alignItems="center">
						<Box className={`${styles.avatarContainer} `}>
							{
								<>
									<div className={styles.innerRing}>
										<Image src={profilePic} alt="profile pic" />
									</div>
									<Box>
										<p
											style={{
												textOverflow: 'ellipsis',
												maxWidth: '70vw',
												overflow: 'hidden',
												whiteSpace: 'nowrap',
												marginBottom: 'auto',
												marginTop: 'auto'
											}}
										>
											{user?.name}
										</p>
									</Box>
								</>
							}
						</Box>
					</Flex>
				</Flex>
			</Box>

			{/* Chat Window */}
			<Box className={`${styles.chatWindow}`}>
				{/* NeoMorphism Box */}
				<Box className={`${styles.BackBox}`} style={{ borderRadius: '0px' }}>
					{/* Chat Area */}
					<Box style={{ }}>
						<StarredChatList user={user} />
					</Box>
				</Box>
			</Box>
		</Flex>
	);
};

export default StarredChat;