"use client";
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import profilePic from '@/assets/images/bot_icon_2.png';
import crossPic from '@/assets/images/cross.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';
import { Text, ChatButton, UserName,AvatarImage } from './styled';
import { useTheme } from '@/providers/ThemeProvider';
import { AppContext } from '@/context';

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
	const {theme }= useTheme();
	const context = useContext(AppContext);
	const [userImage, setBotImage] = useState(profilePic);
	const onChangingCurrentUserHandler = useCallback(() => {
		history.push(`/starred-chat/${user?.id}`);
	}, [history, user]);

	useEffect(() => {
		if (context?.currentUser?.botImage) {
		  fetch(context?.currentUser?.botImage)
			.then((res) => {
			  if (res.status === 403) {
				setBotImage(profilePic);
			  } else {
				setBotImage(context?.currentUser?.botImage);
			  }
			})
			.catch((err) => {
			  setBotImage(profilePic);
			});
		} else {
		  setBotImage(profilePic);
		}
	  }, [context?.currentUser?.botImage]);

	return (
		<Fragment>
			<ChatButton disabled={isBlank}
				onClick={onChangingCurrentUserHandler}
				active={active}
				theme = {theme}>
				<AvatarImage>
						<Image src={userImage}
						alt="profile pic" width={150} height={150}/>
				</AvatarImage>
				<Text>
					<UserName active={active} phoneNumber={phoneNumber} theme={theme}>
						<p>{name}</p>
					</UserName>
				</Text>
			</ChatButton>
		</Fragment>
	);
};

export default StarredChatItem;