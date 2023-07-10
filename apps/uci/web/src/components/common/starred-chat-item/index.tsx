import React, { useCallback } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';

interface chatItemProps {
	active: boolean;
	name: string;
	phoneNumber?: string | null;
	toChangeCurrentUser: (name: string, number: string | null) => void;
	user?: User;
	isBlank?: boolean;
}

interface Config {
	images: {
		profilePic: string;
		crossPic: string;
	};
	textStyles: {
		ellipsis: {
			textOverflow: 'ellipsis';
			maxWidth: string;
			overflow: 'hidden';
			whiteSpace: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'initial' | 'inherit';
			marginBottom: string;
		};
	};
}

const config = (require('./config.json') as Config);

const StarredChatItem: React.FC<chatItemProps> = ({ active, name, phoneNumber, user, isBlank }) => {
	const history = useRouter();
	const fontColorToggle = useColorModeValue(styles.darkFontColor, styles.lightFontColor);

	const onChangingCurrentUserHandler = useCallback(() => {
		history.push(`/starred-chat/${user?.id}`);
	}, [history, user]);

	return (
		<React.Fragment>
			<button
				disabled={isBlank}
				onClick={onChangingCurrentUserHandler}
				className={` ${active ? styles.activeContainer : styles.container}`}
			>
				<div className={styles.avatar}>
					{
						<Image
							src={!isBlank ? require(config.images.profilePic) : require(config.images.crossPic)}
							alt="profile pic"
						/>
					}
				</div>
				<Box className={`${styles.chatItem_text}`}>
					<Box
						className={`${phoneNumber === null ? styles.chatItem_botName : styles.chatItem_userName
							} ${active ? styles.activeFont : fontColorToggle}`}
					>
						<p style={config.textStyles.ellipsis}>
							{name}
						</p>
					</Box>
				</Box>
			</button>
		</React.Fragment>
	);
};

export default StarredChatItem;
