import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import styles from "./index.module.css";
import { useState } from "react";
import Profile from "../../Profile";

interface chatItemProps {
  active: boolean;
  name: string;
  phoneNumber: string | null;
  toChangeCurrentUser: (name: string, number: string | null) => void;
  toRemoveUser: (name: string, number: string | null) => void;
}

const ChatItem: React.FC<chatItemProps> = ({
  active,
  name,
  phoneNumber,
  toChangeCurrentUser,
  toRemoveUser,
}) => {
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const fontColorToggle = useColorModeValue(
    styles.darkFontColor,
    styles.lightFontColor
  );
  const phoneColorToggle = useColorModeValue(
    styles.darkPhoneColor,
    styles.lightPhoneColor
  );

  const [toShowProfile, setToShowProfile] = useState(false);

  const onChangingCurrentUserHandler: React.MouseEventHandler = (
    e: React.MouseEvent
  ) => {
    toChangeCurrentUser(name, phoneNumber);
  };

  const showProfileModal: React.MouseEventHandler = (e: React.MouseEvent) => {
    setToShowProfile(true);
  };

  const hideProfileModal: React.MouseEventHandler = (e: React.MouseEvent) => {
    setToShowProfile(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={onChangingCurrentUserHandler}
        className={`${backgroundColorToggle} ${
          active ? styles.activeContainer : styles.container
        }`}
      >
        <Box onClick={showProfileModal} className={styles.avatar}></Box>
        <Box className={`${styles.chatItem_text}`}>
          <Box
            className={`${
              phoneNumber === null
                ? styles.chatItem_botName
                : styles.chatItem_userName
            } ${active ? styles.activeFont : fontColorToggle}`}
          >
            {name}
          </Box>
          <Box
            className={`${
              phoneNumber === null
                ? styles.chatItem_botNumber
                : styles.chatItem_phoneNumber
            } ${active ? styles.activephoneFont : phoneColorToggle}`}
          >
            {phoneNumber}
          </Box>
        </Box>
      </button>
      <Profile
        show={toShowProfile}
        toHide={hideProfileModal}
        name={name}
        number={phoneNumber}
        toRemoveProfile={toRemoveUser}
      />
    </React.Fragment>
  );
};

export default ChatItem;
