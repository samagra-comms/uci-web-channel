import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import styles from "./index.module.css";
import MessageWindow from "../../MessageWindow";
import TextBar from "../../TextBar";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import { useColorModeValue, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShower } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
const FontSizeChanger = dynamic(
  () => {
    return import("react-font-size-changer");
  },
  { ssr: false }
);

interface chatWindowProps {
  currentMessageObj: {
    user: string;
    phoneNumber: string | null;
    messages: any[];
  };
  toClearChat: () => void;
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  toSendMessage: (text: string, media: any) => void;
  currentUser: { name: string; number: string | null };
  sendLocation: (location: string) => void;
  toShowChats: (event: React.MouseEvent) => void;
}

const ChatWindow: React.FC<chatWindowProps> = ({
  toClearChat,
  currentMessageObj,
  messages,
  username,
  selected,
  toSendMessage,
  currentUser,
  sendLocation,
  toShowChats,

}) => {

  const textColor = useColorModeValue("#202C33", "#fff");
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const backBoxToggle = useColorModeValue(
    styles.lightBackBox,
    styles.darkBackBox
  );
  const headingColorToggle = useColorModeValue(
    styles.lightUsername,
    styles.darkUsername
  );



  return (
    <Flex bgColor="#282A37" flexDirection="column" height="100vh" width="100%">
      {/* Top Section */}
      <Box className={`${styles.top_section} ${backgroundColorToggle}`}>
        {/* For the back button */}
        {/* <Box flex="1" className={headingColorToggle}>
          <Button
            onClick={toShowChats}
            ml="0.5rem"
            size="xs"
            variant="ghost"
            fontSize="sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Box> */}
        {/* Name and Icon */}
        <Flex flex="9" justifyContent='space-between' alignItems='center'>
          <Flex justifyContent='center' alignItems='center'>
            <Box className={`${styles.avatarContainer} ${headingColorToggle} `}>
              {/* {currentUser.name === ""?<Box>UCI</Box>:<Box className={styles.innerRing} />} */}
              {<><Box className={styles.innerRing} /> <Box>UCI</Box></>}
            </Box>
            <Box className={`${styles.UserName} ${headingColorToggle}`}>
              {currentUser.name}
            </Box>
          </Flex>


          {/* <FontSizeChanger
            targets={['.messages', '.recievedMessage']}
            options={{
              stepSize: 5,
              range: 3
            }}
            customButtons={{
              up: <span style={{ 'fontSize': '15px', 'cursor': 'pointer' }}>A+</span>,
              down: <span style={{ 'fontSize': '15px', 'cursor': 'pointer' }}>A-</span>,
              style: {
                color: '#1d90f5',
                WebkitBoxSizing: 'border-box',
                WebkitBorderRadius: '5px',
                width: '30px'
              },
              buttonsMargin: 10
            }}
          /> */}

          <Box mr="1rem">
            <IconButton
              size="md"
              fontSize="lg"
              variant="ghost"
              color={textColor}
              onClick={() => { toClearChat(); }}
              marginLeft="2"
              icon={<FontAwesomeIcon icon={faShower} />}
              aria-label={`Clear Chat`}
            />
            <ColorModeSwitcher />
          </Box>
        </Flex>
      </Box>

      {/* Chat Window */}
      <Box className={`${styles.chatWindow} ${backgroundColorToggle}`}>
        {/* NeoMorphism Box */}
        <Box className={`${styles.BackBox} ${backBoxToggle}`}>
          {/* Chat Area */}
          <Box>
            <MessageWindow
              currentMessageObj={currentMessageObj}
              messages={messages}
              username={username}
              selected={selected}
            />
          </Box>

          {/* TextBar */}
          <Box className={styles.inputSection}>
            <TextBar onSend={toSendMessage} onSendLocation={sendLocation} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
