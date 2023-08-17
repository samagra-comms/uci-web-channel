
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import React, { useCallback, useContext, useMemo } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import profilePic from '../../../assets/images/bot_icon_2.png';
import crossPic from '../../../assets/images/cross.png';
import { useRouter } from 'next/navigation';
import { profilePic } from '@/assets';
import { User } from '@/types';
import { AppContext } from '@/context';
import moment from 'moment';
import { AvatarContainer, AvatarImage, ChatItemText, Container, Paragraph, UserName } from './styled';
import { useTheme } from '@/providers/ThemeProvider';

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
  const [userImage, setBotImage] = useState(profilePic);
  const { theme } = useTheme();

  const isMobile = useBreakpointValue({ base: true, md: false });

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

  const expiredItem = useMemo(() => {
    return (user?.endDate !== undefined && user.endDate < moment().format()) || (user?.status !== 'ENABLED');
  }, [user]);

  const onChangeUser = useCallback(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    context?.toChangeCurrentUser(user);
    if (isMobile) {
      history.push(`/chats/${user?.id}`);
    }
  }, [context, history, user, isMobile]);

  return (
    <React.Fragment>
      <Container onClick={onChangeUser} disabled={isBlank} active={active} theme={theme}>
          <AvatarContainer>
            <AvatarImage src={userImage} alt="profile pic" />
          </AvatarContainer>
          <ChatItemText theme={theme}>
            <UserName isBot={phoneNumber == null}>
              <Paragraph expired={expiredItem} theme={theme}>{name}</Paragraph>
            </UserName>
          </ChatItemText>
      </Container>
    </React.Fragment>
  );
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
								marginBottom: '0',
								color: expiredItem ? 'lightgrey' : 'black'
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