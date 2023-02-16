import React, { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import styles from "./index.module.css";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShower } from "@fortawesome/free-solid-svg-icons";
import { useColorModeValue, IconButton } from "@chakra-ui/react";
import KrushakOdisha from "../../../assets/images/krushak_odisha.png";
import GovtOfOdisha from "../../../assets/images/logo.png";
import KrishiMela from "../../../assets/images/KrishiMela.png";
import Phone from "../../../assets/images/phone.png";
import Image from "next/image";

interface chatWindowProps {
  currentMessageObj: {
    user: string;
    phoneNumber: string | null;
    messages: any[];
  };
  toClearChat: () => void;
  messages: any[];
  // recieved: boolean;
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  toSendMessage: (text: string, media: any) => void;
  currentUser: { name: string; number: string | null };
  onSendLocation: (location: string) => void;
}

const ChatWindow: React.FC<chatWindowProps> = ({
  currentMessageObj,
  toClearChat,
  messages,
  // recieved,
  username,
  selected,
  toSendMessage,
  currentUser,
  onSendLocation,
}) => {
  const textColor = useColorModeValue("black", "white");
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

  let classname = localStorage.getItem("wallpaper");

  return (
    <Flex className={`${styles.container}`}>
      {/* Top Section */}
      <Box className={`${styles.top_section} ${backgroundColorToggle}`}>
        {/* Name and Icon */}

        <Flex>
          <div style={{ margin: "auto", marginRight: "5px" }}>
            <Image src={GovtOfOdisha} width={55} height={50} />
          </div>
          <div style={{ margin: "auto", marginRight: "5px" }}>
            <Image src={KrushakOdisha} width={45} height={50} />
          </div>
          <div style={{ margin: "auto", marginRight: "5px" }}>
            <Image src={KrishiMela} width={60} height={50} />
          </div>
          <div style={{ margin: "auto", marginRight: "5px" }}>
            <Image src={Phone} width={53} height={58} />
          </div>
          <Box className={`${styles.avatarContainer} ${headingColorToggle} `}>
            {/* {currentUser.name === ""?<Box>UCI</Box>:<Box className={styles.innerRing} />} */}
            {
              <>
                {/* <Box className={styles.innerRing} /> */}
                <Box>KONNECT Ama KrushAI Chat Bot</Box>
              </>
            }
          </Box>
          {/* <Box className={`${styles.UserName} ${headingColorToggle}`}>
            {currentUser.name}
          </Box> */}
        </Flex>

        <Box className={styles.toggleButtonContainer}>
          {/* <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color={textColor}
            onClick={() => {
              toClearChat();
            }}
            marginLeft="2"
            icon={<FontAwesomeIcon icon={faShower} />}
            aria-label={`Clear Chat`}
          /> */}
          <ColorModeSwitcher />
        </Box>
      </Box>

      {/* Chat Window */}
      <Box className={`${styles.chatWindow} ${backgroundColorToggle}`}>
        {/* NeoMorphism Box */}

        <Box className={`${styles.BackBox} ${backBoxToggle}`}>
          <Box
            id="wall"
            className={
              classname === "wallpaper1"
                ? styles.wallpaper1
                : classname === "wallpaper2"
                ? styles.wallpaper2
                : styles.BackBox
            }
          >
            {/* <Box className={classname}> */}
            {/* Chat Area */}
            <Box style={{ minHeight: "90px" }}>
              <MessageWindow
                currentMessageObj={currentMessageObj}
                messages={messages}
                // recieved={recieved}
                username={username}
                selected={selected}
              />
            </Box>

            {/* TextBar */}
            <Box className={styles.inputSection}>
              <TextBar currentMessageObj={currentMessageObj} username={username} onSend={toSendMessage} onSendLocation={onSendLocation} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
