import React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import SettingsButton from "./Buttons";
import Modal from "../Modal";
import ChatItem from "./ChatItem";
import {
  faCog,
  faDesktop,
  faCampground,
  faPlus,
  faShower,
  faPlusSquare,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface FormElements extends HTMLFormControlsCollection {
  input: HTMLInputElement;
  Username: HTMLInputElement;
  Bio: HTMLInputElement;
  Name: HTMLInputElement;
  phoneNumber: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface recentChatsProps {
  allUsers: { name: string; number: string | null; active: boolean }[];
  toChangeCurrentUser: (name: string, number: string | null) => void;
  onAddingNewUser: (newName: string, newNumber: string) => void;
  toRemoveUser: (name: string, number: string | null) => void;
  toShowChatWindow: () => void
}

const RecentChats: React.FC<recentChatsProps> = ({
  allUsers,
  toChangeCurrentUser,
  onAddingNewUser,
  toRemoveUser,
  toShowChatWindow
}) => {
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const fontColorToggle = useColorModeValue(
    styles.lightColor,
    styles.darkColor
  );

  const backBoxToggle = useColorModeValue(
    styles.lightBackBox,
    styles.darkBackBox
  );

  const settingsBarToggle = useColorModeValue(
    styles.lightSettingsBar,
    styles.darkSettingsBar
  );


  const [allButtons,setAllButtons] = useState<{key: string,icon: IconDefinition, active: boolean}[]>([
   
    {
        key: '3',
        icon: faDesktop,
        active: false
      },
      {
      key: "4",
        icon: faShower,
        active: false,
    }
])


const onChangeCurrentButton = (icon: IconDefinition) => {
    
    const newButtons = allButtons.map( (button) => {
        if (button.icon === icon) {
            button.active = !button.active;
            return button;
        } else {
            return button;
        }
    })

    setAllButtons(newButtons)
}

  const [showModal, setShowModal] = useState(false);

  const onchangingCurrentUserHandler = (
    name: string,
    number: string | null
  ) => {
    toChangeCurrentUser(name, number);
    toShowChatWindow();
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
        onAddingNewUser(newName, "");
        return
      } else {
        alert("Wrong Number of digits");
        return;
      }
    }
    onAddingNewUser(newName, newPhoneNumber);
  };

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      className={backgroundColorToggle}
    >
      {/* Top Section */}
      <Box className={`${styles.headerContainer}  ${fontColorToggle}`}>
        <Box className={styles.heading}>Chats</Box>
        <Box className={styles.logo_box}></Box>
      </Box>

      <Box className={styles.mainContainer}>
        {/* Chat Section */}

        <Box className={`${styles.backBox} ${backBoxToggle}`}>
          <Box className={styles.chatList}>
            {allUsers.map((user) => {
              return (
                <ChatItem
                  toRemoveUser={toRemoveUser}
                  toChangeCurrentUser={onchangingCurrentUserHandler}
                  key={user.number}
                  active={user.active}
                  name={user.name}
                  phoneNumber={user.number}
                />
              );
            })}
            {/* <ChatItem
              name="Arshpreet"
              phoneNumber="1234567890"
              active={false}
            />
            <ChatItem name="Shruti" phoneNumber="1234567890" active={true} />
            <ChatItem name="Neelesh" phoneNumber="1234567890" active={false} /> */}
            <button onClick={toShowModal} className={`${styles.addUser_button} ${settingsBarToggle}`}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {showModal ? (
              <Modal onHideModal={toHideModal} onSubmitForm={newUserInfo} />
            ) : (
              <></>
            )}
          </Box>
        </Box>

        {/* Settings Bar */}
        <Box className={`${styles.settingsBar} ${settingsBarToggle}`}>
          {allButtons.map(button => {
            return (<SettingsButton key={button.key} toChangeActiveState={onChangeCurrentButton} icon={button.icon} active={button.active} />)
          })}
        </Box>
      </Box>
    </Flex>
  );
};

export default RecentChats;
