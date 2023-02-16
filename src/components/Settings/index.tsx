import React, { useState } from "react";
import { Flex, Box, Text, Button, Input } from "@chakra-ui/react";
import styles from "./RecentChats.module.css";
import Setting from "./Setting";
import TextBar from "../TextBar";
import ProfileSection from "./profileSection";
import Modal from "../Modal";
import { useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClone,
  faUser,
  faPhone,
  faBomb,
} from "@fortawesome/free-solid-svg-icons";

interface recentChatProps {
  toShowChatSection: (event: React.MouseEvent) => void;
  toChangeProfileName: (newName: string) => void;
  toChangePhoneNumber: (newPhoneNumber: string) => void;
  toChangeUserBio: (newBio: string) => void;
  toAddUser: (newName: string, newNumber: string) => void;

  userName: string;
  userBio: string;
}

const Settings: React.FC<recentChatProps> = ({
  userName,
  userBio,
  toChangeUserBio,
  toChangePhoneNumber,
  toChangeProfileName,
  toShowChatSection,
  toAddUser,
}) => {
  const bg = useColorModeValue("var(--primarygreen)", "var(--tertiarydarkblue)");

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showBioModal, setBioModal] = useState(false);
  const [showUsersModal, setUsersModal] = useState(false);

  const setProfileName = (newName: string) => {
    toChangeProfileName(newName);
  };

  const setPhoneNumber = (newPhoneNumber: string) => {
    toChangePhoneNumber(newPhoneNumber);
  };

  const setUserBio = (newBio: string) => {
    toChangeUserBio(newBio);
  };

  const addNewUser = (newName: string, newNumber: string) => {
    toAddUser(newName, newNumber);
  };

  const changingProfileName: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setShowNameModal(true);
  };

  const changingPhoneNumber: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setShowPhoneModal(true);
  };

  const changingUserBio: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setBioModal(true);
  };

  const addUser: React.MouseEventHandler = (event: React.MouseEvent) => {
    setUsersModal(true);
  };

  interface FormElements extends HTMLFormControlsCollection {
    input: HTMLInputElement;
    Username: HTMLInputElement;
    Bio: HTMLInputElement;
    Name: HTMLInputElement;
    PhoneNumber: HTMLInputElement;
  }
  interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const closingPhoneNumberModal: React.FormEventHandler = (
    event: React.FormEvent<UsernameFormElement>
  ) => {
    // event.preventDefault();
    // const newNum  = event.currentTarget.elements.input.value;
    // if (newNum === "") return
    // setPhoneNumber(newNum);
    // setShowPhoneModal(false);
  };

  const closingProfileNameModal: React.FormEventHandler = (
    event: React.FormEvent<UsernameFormElement>
  ) => {
    event.preventDefault();
    const newName = event.currentTarget.elements.Username.value;
    if (newName === "") return;
    setProfileName(newName);
    setShowNameModal(false);
  };

  const closingUserBioModal: React.FormEventHandler = (
    event: React.FormEvent<UsernameFormElement>
  ) => {
    event.preventDefault();
    const newBio = event.currentTarget.elements.Bio.value;
    if (newBio === "") return;
    setUserBio(newBio);
    setBioModal(false);
  };

  const closingUsersModal: React.FormEventHandler = (
    event: React.FormEvent<UsernameFormElement>
  ) => {
    event.preventDefault();
    const newName = event.currentTarget.elements.Name.value;
    const newNumber = event.currentTarget.elements.PhoneNumber.value;
    addNewUser(newName, newNumber);
    setUsersModal(false);
  };

  const undoUsersModal: React.MouseEventHandler = (event: React.MouseEvent) => {
    setUsersModal(false);
  };
  const undoUsersBioModal: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setBioModal(false);
  };
  const undoNameModal: React.MouseEventHandler = (event: React.MouseEvent) => {
    setShowNameModal(false);
  };
  return (
    <Box className={styles.main__container}>
      {/* Settings Heading */}
      <Flex flex="1" bgColor={bg} mb="1rem" flexWrap="wrap">
        <Box
          fontSize="30px"
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="ghost" onClick={toShowChatSection}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Box>

        <Box fontSize="2xl" flex="5" display="flex" alignItems="center">
          <h1>Settings</h1>
        </Box>
      </Flex>

      {/* Profile Section */}
      <Flex flex="1" flexWrap="wrap">
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
        <ProfileSection name={userName} bio={userBio} />
      </Flex>

      {/* Settings */}
      <Box flex="6" mt="1rem" pr="0.5rem">
        {/* <Setting icon={faClone} settingName="Wallpaper Theme"></Setting> */}
        <Setting
          icon={faUser}
          clickFunction={changingProfileName}
          settingName="Change Name"
        ></Setting>
        <Modal
          undo={undoNameModal}
          open={showNameModal}
          toClose={closingProfileNameModal}
          inputList={["Username"]}
        />

        {/* <Setting icon={faPhone} clickFunction={changingPhoneNumber} settingName="Change Phone Number"></Setting>
        <Modal open={showPhoneModal} toClose={closingPhoneNumberModal}>Phone Number</Modal> */}

        <Setting
          icon={faBomb}
          clickFunction={changingUserBio}
          settingName="Change User's Bio"
        ></Setting>
        <Modal
          undo={undoUsersBioModal}
          open={showBioModal}
          toClose={closingUserBioModal}
          inputList={["Bio"]}
        />

        <Setting
          icon={faUser}
          clickFunction={addUser}
          settingName="Add New User"
        ></Setting>
        <Modal
          undo={undoUsersModal}
          open={showUsersModal}
          toClose={closingUsersModal}
          inputList={["Name", "PhoneNumber"]}
        />
      </Box>
    </Box>
  );
};

export default Settings;
