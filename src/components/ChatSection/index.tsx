import React from "react";
import { Flex, Box, Text, useColorModeValue, Button } from "@chakra-ui/react";
import styles from "./ChatSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ChatItem from "./ChatItem";

interface chatSectionProps {
  toShowSettings: (event: React.MouseEvent) => void;
}

const ChatSection: React.FC<chatSectionProps> = ({ toShowSettings }) => {
  const bg = useColorModeValue("#06d755", "#202C33");

  return (
    <Box className={styles.main__container}>
      {/* Settings Heading */}
      <Box
        flex="1"
        bgColor={bg}
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
          <Button onClick={toShowSettings}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box flex="8">
        <ChatItem image="url('/killua.jpg')" name="Neelesh" />
        <ChatItem image="url('/killua.jpg')" name="Chakshu" />
        <ChatItem image="url('/killua.jpg')" name="Shruti" />
      </Box>
    </Box>
  );
};

export default ChatSection;
