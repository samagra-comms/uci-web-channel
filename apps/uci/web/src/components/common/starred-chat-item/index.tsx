"use client";
import React, { useCallback } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import profilePic from '@/assets/images/bot_icon_2.png';
import crossPic from '@/assets/images/cross.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';
import { Text, ChatButton, UserName,AvatarImage } from './styled';

interface chatItemProps {
	active: boolean;
	name: string;
	phoneNumber?: string | null;
	toChangeCurrentUser: (name: string, number: string | null) => void;
	user?: User;
	isBlank?: boolean;
}

const StarredChatItem: React.FC<chatItemProps> = ({ active, name, phoneNumber, user, isBlank }) => {
	const history = useRouter();

	const fontColorToggle = useColorModeValue(styles.darkFontColor, styles.lightFontColor);

	const onChangingCurrentUserHandler = useCallback(() => {
		history.push(`/starred-chat/${user?.id}`);
	}, [history, user]);

	return (
		<React.Fragment>
			<ChatButton disabled={isBlank}
				onClick={onChangingCurrentUserHandler}
				active={active}>
				<AvatarImage>
						<Image src={!isBlank ? profilePic : crossPic}
						alt="profile pic"/>
				</AvatarImage>
				<Text>
					<UserName active={active} phoneNumber={phoneNumber}>
						<p>{name}</p>
					</UserName>
				</Text>
			</ChatButton>
		</React.Fragment>
	);
};

export default StarredChatItem;