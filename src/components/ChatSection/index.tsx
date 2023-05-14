import React from "react";
import { Flex, Box, Text, useColorModeValue, Button } from "@chakra-ui/react";
import styles from "./ChatSection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ChatItem from "./ChatItem";
import image from "../../assets/images/avatar.jpg"
import Image from "next/image";
import killua from "../../assets/images/killua.jpg"

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
  // const bg = useColorModeValue("#06d755", "#202C33");
  const bg = useColorModeValue("#B05B3A", "#202C33");

  const changingUser = (name: string) => {
    toChangeCurrentUser(name);
  };
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
          <Image src={killua} alt='Dan Abramov' height="60px" width="60px" className={styles.image_box}/>
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
        {allUsers.map((user) => {
          return (
            <ChatItem key={user.name} toRemoveUser={toRemoveUser} image={image} active={user.active} name={user.name} toChangeUser={changingUser} />
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatSection;
