import React from "react";
import { useState } from "react";
import Profile from "../Profile";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import styles from "./ChatItem.module.css";

interface chatItemProps {
  image: string;
  name: string;
  toChangeUser: (name: string) => void;
  toRemoveUser: (name: string) => void;
  active: boolean;
}

const ChatItem: React.FC<chatItemProps> = ({ image, name, toChangeUser,toRemoveUser,active }) => {
  const [showProfile, setShowProfile] = useState(false);

  const bg = useColorModeValue("rgba(84,167,191,0.25)","rgba(56, 37, 37, 0.25)");

  const closingProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Flex bgColor={bg} className={`${styles.chatContainer} ${active?styles.active:styles.chat__text}`}  cursor="pointer" height="max-content" m="0.5rem">
        <Flex
          fontSize="35px"
          flex="1"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            cursor="pointer"
            onClick={() => {
              setShowProfile(true);
            }}
            borderRadius="50%"
            bgImage={image}
            height="60px"
            width="60px"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          />
        </Flex>
        <Flex
          onClick={() => {
            toChangeUser(name);
          }}
          
          ml="0.5rem"
          // pl="0.25rem"
          flex="4"
          alignItems="center"
        >
          <p>{name}</p>
        </Flex>
      </Flex>
      <Profile
        show={showProfile}
        name={name}
        userImg={image}
        removeProfile={closingProfile}
        toRemoveUser={toRemoveUser}
      />
    </>
  );
};

export default ChatItem;
