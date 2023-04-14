import React from "react";
import { Flex, Box, Text, useColorModeValue, Button } from "@chakra-ui/react";
import styles from "./ChatSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ChatItem from "./ChatItem";

interface chatSectionProps {
  toShowSettings: (event: React.MouseEvent) => void;
  toChangeCurrentUser: (name: string) => void;
  toRemoveUser: (name: string) => void;
  allUsers: { name: string; number: string | null, active: boolean }[]; 
}

const ChatSection: React.FC<chatSectionProps> = ({
  toShowSettings,
  toChangeCurrentUser,
  toRemoveUser,
  allUsers,
}) => {

  const changingUser = (name: string) => {
    toChangeCurrentUser(name);
  };
  return (
    <Box className={styles.main__container}>
      {/* Settings Heading */}
      <Box
        flex="1"
        // bgColor={bg}
        mb="1rem"
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Flex justifyContent="center" alignItems="center" flex="1">
          <Box
            borderRadius="50%"
            bgImage="url('/killua.jpg')"
            height="60px"
            width="60px"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          />
        </Flex>

        <Box
          fontSize="30px"
          flex="3"
          display="flex"
          justifyContent="end"
          alignItems="center"
          pr="1rem"
        >
          <Button variant="ghost" onClick={toShowSettings}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box flex="8">
        {allUsers.map((user) => {
          return (
            <ChatItem key={user.name} toRemoveUser={toRemoveUser} image="url('/avatar.jpg')" active={user.active} name={user.name} toChangeUser={changingUser} />
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatSection;