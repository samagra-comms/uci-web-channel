import React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { Box } from "@chakra-ui/react";
import ChatItem from "./ChatItem";
import Modal from "./../Modal";
import { useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface RecentChats {
  allUsers: { name: string; number: string | null; active: boolean }[];
  toChangeCurrentUser: (name: string, number: string | null) => void;
  onAddingNewUser: (newName: string, newNumber: string | null) => void;
  toRemoveUser: (name: string, number: string | null) => void;
}

interface FormElements extends HTMLFormControlsCollection {
  nput: HTMLInputElement;
  Username: HTMLInputElement;
  Bio: HTMLInputElement;
  Name: HTMLInputElement;
  phoneNumber: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const RecentChat: React.FC<RecentChats> = ({
  allUsers,
  toChangeCurrentUser,
  onAddingNewUser,
  toRemoveUser,
}) => {
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const fontColorToggle = useColorModeValue(
    styles.lightColor,
    styles.darkColor
  );
  const buttonToggle = useColorModeValue(
    styles.lightModeButton,
    styles.darkModeButton
  );

  const [showModal, setShowModal] = useState(false);

  const onchangingCurrentUserHandler = (
    name: string,
    number: string | null
  ) => {
    toChangeCurrentUser(name, number);
  };

  const toShowModal: React.MouseEventHandler = (e: React.MouseEvent) => {
    setShowModal(true);
  };

  const toHideModal: React.MouseEventHandler = (e: React.MouseEvent) => {
    setShowModal(false);
  };


    const newUserInfo: React.FormEventHandler = (
    e: React.FormEvent<UsernameFormElement>
  ) => {
    e.preventDefault();
    const newName = e.currentTarget.elements.Name.value;
    const newPhoneNumber = e.currentTarget.elements.phoneNumber.value;
    if (newPhoneNumber.length !== 10) {
      if (newPhoneNumber === "") {
        onAddingNewUser(newName, null);
        return
      } else {
        alert("Wrong Number of digits");
        return;
      }
    }

    onAddingNewUser(newName, newPhoneNumber);
  };

  return (
    <Box className={`${backgroundColorToggle}`}>
        
        {/* Heading */}
      <Box className={`${styles.top_section} ${fontColorToggle}`}>Chats</Box>
        {/* Chat Items */}
      <Box className={styles.Chat_items_section}>
        {allUsers.map((user) => {
          return (
            <ChatItem
              key={user.number}
              toRemoveUser={toRemoveUser}
              name={user.name}
              phoneNumber={user.number}
              active={user.active}
              toChangeCurrentUser={onchangingCurrentUserHandler}
            />
          );
        })}
        <button onClick={toShowModal} className={`${styles.addUser_button} ${buttonToggle}`}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {showModal ? (
          <Modal onHideModal={toHideModal} onSubmitForm={newUserInfo} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
);
};
export default RecentChat;