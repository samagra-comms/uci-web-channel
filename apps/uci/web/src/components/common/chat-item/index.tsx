import React, { useCallback, useContext, useMemo } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { profilePic, crossPic } from '@/assets';
import { User } from '@/types';
import { AppContext } from '@/context';
import moment from 'moment';
import { theme } from '@/config';

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

	const expiredItem = useMemo(() => {
		return user?.endDate !== undefined && user.endDate < moment().format() && user?.status === 'ENABLED';
	}, [user]);

	const onChangeUser = useCallback(() => {
		localStorage.setItem('currentUser', JSON.stringify(user));
		context?.toChangeCurrentUser(user);
		// console.log('user Date', user?.endDate);
		// console.log('user Status', user?.status);
		history.push(`/chats/${user?.id}`);
	}, [context, history, user]);

	return (
		<React.Fragment>
			<button
				onClick={onChangeUser}
				disabled={isBlank}
				className={` ${active ? styles.activeContainer : styles.container}`}
			>
				<div className={styles.avatar}>
					<Image
						src={!isBlank ? profilePic : crossPic}
						alt="profile pic"
						width={theme.image.width}
						height={theme.image.height}
					/>
				</div>
				<Box className={`${styles.chatItem_text}`}>
					<Box
						className={`${phoneNumber === null ? styles.chatItem_botName : styles.chatItem_userName
							} ${active ? styles.activeFont : fontColorToggle}`}>
						<p className={`${styles.paragraphStyle} ${expiredItem ? styles.paragraphStyleExpired : styles.paragraphStyleActive}`}>
							{name}
						</p>
					</Box>
				</Box>
			</button>
		</React.Fragment>
	);
};

export default ChatItem;
