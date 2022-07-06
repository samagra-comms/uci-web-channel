import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import styles from "./RecentChats.module.css";
import Setting from "./Setting";
import ProfileSection from "./profileSection";
import { useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClone,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

interface recentChatProps {
  toShowChatSection: (event: React.MouseEvent) => void;
}

const RecentChats: React.FC<recentChatProps> = ({ toShowChatSection }) => {
  const bg = useColorModeValue("#06d755", "#202C33");

  return (
    <Box className={styles.main__container}>
      {/* Settings Heading */}
      <Flex flex="2" bgColor={bg} mb="1rem">
        <Box
          fontSize="30px"
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={toShowChatSection}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Box>

        <Box flex="5" display="flex" alignItems="center">
          <Text fontSize="3xl">Settings</Text>
        </Box>
      </Flex>

      {/* Profile Section */}
      <Flex flex="2">
        <Flex justifyContent="center" alignItems="center" flex="2" p="10px">
          <Box
            borderRadius="50%"
            bgImage="url('/killua.jpg')"
            height="130px"
            width="130px"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          />
        </Flex>
        <ProfileSection />
      </Flex>

      {/* Settings */}
      <Box flex="10" mt="1rem" pr="0.5rem">
        <Setting icon={faClone} settingName="Wallpaper Theme"></Setting>
        <Setting icon={faUser} settingName="Change Name"></Setting>
        <Setting icon={faPhone} settingName="Change Phone Number"></Setting>
      </Box>
    </Box>
  );
};

export default RecentChats;
