import React from "react";
import { useState } from "react";
import Profile from "../Profile";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";

interface chatItemProps {
  image: string;
  name: string;
  toChangeUser: (name: string) => void;
}

const ChatItem: React.FC<chatItemProps> = ({ image, name, toChangeUser }) => {
  const [showProfile, setShowProfile] = useState(false);

  const borderColor = useColorModeValue("#000", "#fff");

  const closingProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Flex cursor="pointer" height="max-content" m="0.5rem">
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
          onClick={() => {toChangeUser(name)}}
          ml="0.5rem"
          pl="0.5rem"
          flex="4"
          alignItems="center"
          borderTop={`0.5px solid ${borderColor}`}
          borderBottom={`0.5px solid ${borderColor}`}
        >
          <p>{name}</p>
        </Flex>
      </Flex>
      <Profile
        show={showProfile}
        name={name}
        userImg={image}
        removeProfile={closingProfile}
      />
    </>
  );
};

export default ChatItem;
