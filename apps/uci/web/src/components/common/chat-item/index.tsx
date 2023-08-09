import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { profilePic } from '@/assets';
import { User } from '@/types';
import { AppContext } from '@/context';
import moment from 'moment';
import { AvatarContainer, AvatarImage, ChatItemText, Container, Paragraph, UserName } from './styled';

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
      <Container onClick={onChangeUser} disabled={isBlank} active={active}>
        <AvatarContainer>
          <AvatarImage src={userImage} alt="profile pic" />
        </AvatarContainer>
        <ChatItemText>
          <UserName isBot={phoneNumber == null}>
            <Paragraph expired={expiredItem}>{name}</Paragraph>
          </UserName>
        </ChatItemText>
      </Container>
    </React.Fragment>
  );
};

export default ChatItem;