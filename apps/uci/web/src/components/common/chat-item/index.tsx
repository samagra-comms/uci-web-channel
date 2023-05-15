import React, { useCallback, useContext } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import profilePic from '../../../assets/images/bot_icon_2.png';
import crossPic from '../../../assets/images/cross.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';
import { AppContext } from '@/context';

interface chatItemProps {
	active: boolean;
	name: string;
	phoneNumber: string | null;
	user?: User;
	isBlank?: boolean;
}

const ChatItem: React.FC<chatItemProps> = ({ active, name, phoneNumber, user, isBlank }) => {
	const history = useRouter();
	const context = useContext(AppContext);

	const fontColorToggle = useColorModeValue(styles.darkFontColor, styles.lightFontColor);

	const onChangingCurrentUserHandler = useCallback(() => {
		localStorage.setItem('currentUser', JSON.stringify(user));
		context?.toChangeCurrentUser(user);
		history.push(`/chats/${user?.id}`);
	}, [context, history, user]);

	return (
		<React.Fragment>
			<button
				onClick={onChangingCurrentUserHandler}
				disabled={isBlank}
				className={` ${active ? styles.activeContainer : styles.container}`}
			>
				<div className={styles.avatar}>
					<Image
						src={!isBlank ? profilePic : crossPic}
						alt="profile pic"
					/>
				</div>
				<Box className={`${styles.chatItem_text}`}>
					<Box
						className={`${
							phoneNumber === null ? styles.chatItem_botName : styles.chatItem_userName
						} ${active ? styles.activeFont : fontColorToggle}`}
					>
						<p
							style={{
								textOverflow: 'ellipsis',
								maxWidth: '70vw',
								overflow: 'hidden',
								whiteSpace: 'nowrap',
								marginBottom: '0'
							}}
						>
							{name}
						</p>
					</Box>
				</Box>
			</button>
		</React.Fragment>
	);
};

export default ChatItem;
