'use client';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import profilePic from '@/assets/images/bot_icon_2.png';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { useTheme } from '@/providers/ThemeProvider';
import { AppContext } from '@/context';
import {
    AvatarContainer,
    AvatarImage,
    ChatItemText,
    Container,
    Paragraph,
    UserName,
} from './styled';
import { config } from '@/config';
import { useBreakpointValue } from '@chakra-ui/react';

interface chatItemProps {
    active: boolean;
    name: string;
    phoneNumber?: string | null;
    toChangeCurrentUser: (name: string, number: string | null) => void;
    user?: User;
    isBlank?: boolean;
}

const StarredChatItem: React.FC<chatItemProps> = ({
    active,
    name,
    phoneNumber,
    user,
    isBlank,
}) => {
    const history = useRouter();
    const { theme } = useTheme();
    const context = useContext(AppContext);
    const [userImage, setBotImage] = useState(profilePic);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { setShowStarredChat } = useContext(AppContext);

    const onChangingCurrentUserHandler = useCallback(() => {
        setShowStarredChat(true);
        if (isMobile) {
            history.push(`/starred-chat/${user?.id}`);
        }
    }, [history, user, isMobile]);

    useEffect(() => {
        if (context?.currentUser?.botImage) {
            fetch(context?.currentUser?.botImage)
                .then(res => {
                    if (res.status === 403) {
                        setBotImage(profilePic);
                    } else {
                        setBotImage(context?.currentUser?.botImage);
                    }
                })
                .catch(err => {
                    setBotImage(profilePic);
                });
        } else {
            setBotImage(profilePic);
        }
    }, [context?.currentUser?.botImage]);

    return (
        <Fragment>
            <Container
                disabled={isBlank}
                onClick={onChangingCurrentUserHandler}
                active={active}
                theme={theme}
            >
                <AvatarContainer config={config}>
                    <AvatarImage src={userImage} alt="profile pic" />
                </AvatarContainer>
                <ChatItemText theme={theme} config={config}>
                    <UserName isBot={phoneNumber == null}>
                        <Paragraph theme={theme}>{name}</Paragraph>
                    </UserName>
                </ChatItemText>
            </Container>
        </Fragment>
    );
};

export default StarredChatItem;
