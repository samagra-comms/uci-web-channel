import React, { useCallback, useContext } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';
import { AppContext } from '@/context';

interface ChatItemProps {
  active: boolean;
  name: string;
  phoneNumber: string | null;
  user?: User;
  isBlank?: boolean;
}

interface Config {
	styles: {
	  darkFontColor: string;
	  lightFontColor: string;
	};
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
  

const ChatItem: React.FC<ChatItemProps> = ({ active, name, phoneNumber, user, isBlank }) => {
  const history = useRouter();
  const context = useContext(AppContext);

  const fontColorToggle = useColorModeValue(config.styles.darkFontColor, config.styles.lightFontColor);
  const textStyles = config.textStyles.ellipsis;

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
            src={!isBlank ? config.images.profilePic : config.images.crossPic}
            alt="profile pic"
          />
        </div>
        <Box className={`${styles.chatItem_text}`}>
          <Box
            className={`${
              phoneNumber === null ? styles.chatItem_botName : styles.chatItem_userName
            } ${active ? styles.activeFont : fontColorToggle}`}
          >
            <p style={textStyles}>{name}</p>
          </Box>
        </Box>
      </button>
    </React.Fragment>
  );
};

export default ChatItem;
