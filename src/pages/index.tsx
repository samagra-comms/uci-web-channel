import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import App from "../components/App";
import Settings from "../components/Settings";
import ChatSection from "../components/ChatSection";
import React from "react";
import PhoneView from "../components/PhoneView";
// import SideBar from "../components/SideBar/Index";
// import * as serviceWorker from "../utils/serviceWorker";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript, Flex, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  // User Settingss
  const [profileName, setProfileName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userBio, setUserBio] = useState("");

  // All Users
  const [users, setUsers] = useState<
    { name: string; number: string | null; active: boolean }[]
  >([{ name: "Farmer Bot", number: null, active: true }]);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    number: string | null;
  }>({ name: "", number: "" });

  const [toggleSettings, setToggleSettings] = useState(0);

  useEffect(() => {
    setProfileName(localStorage.getItem("profileName") || "");
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
    setUserBio(localStorage.getItem("userBio") || "");
    // if (localStorage.getItem("AllUsers") || "" !== "") {
    //   setUsers(JSON.parse(localStorage.getItem("AllUsers") || ""));
    //   JSON.parse(localStorage.getItem("AllUsers") || "").forEach(
    //     (user: { name: string; number: string | null; active: boolean }) => {
    //       if (user.active === true) {
    //         setCurrentUser({
    //           name: user.name,
    //           number: user.number,
    //         });
    //       }
    //     }
    //   );
    // }
    setCurrentUser({
      name: "uci",
      number: "7668717742",
    });
  }, []);

  const showSettings: React.MouseEventHandler = (event: React.MouseEvent) => {
    setToggleSettings(1);
  };

  const showChatSection: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    setToggleSettings(0);
  };

  const onChangeProfileName = (newName: string) => {
    setProfileName(newName);
    localStorage.setItem("profileName", newName);
  };

  const onChangePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    localStorage.setItem("phoneNumber", newPhoneNumber);
  };

  const onChangeUserBio = (newBio: string) => {
    setUserBio(newBio);
    localStorage.setItem("userBio", newBio);
  };

  const onRemoveUser = (name: string, number: string | null) => {
    const newUsers = users.filter((user) => {
      return user.name !== name && user.number !== number;
    });
    setUsers(newUsers);
    localStorage.setItem("AllUsers", JSON.stringify(newUsers));
  };

  const onChangeCurrentUser = (name: string, number: string | null) => {
    const myUser = users.find((user) => {
      return user.name === name;
    }) || { name: "Farmer Bot", number: null };
    users.forEach((user, index) => {
      if (user.name === name && user.number === number) {
        user.active = true;
      } else if (user.active === true) {
        user.active = false;
      }
    });
    setCurrentUser(myUser);
  };

  const onAddUser = (newName: string, newNumber: string | null) => {
    if (users.length === 0) {
      localStorage.setItem(
        "AllUsers",
        JSON.stringify([{ name: newName, number: newNumber, active: true }])
      );
      setUsers([{ name: newName, number: newNumber, active: true }]);
      return;
    }
    setUsers(
      (
        prevUsers: { name: string; number: string | null; active: boolean }[]
      ) => {
        localStorage.setItem(
          "AllUsers",
          JSON.stringify([
            ...prevUsers,
            { name: newName, number: newNumber, active: false },
          ])
        );
        return [
          ...prevUsers,
          { name: newName, number: newNumber, active: false },
        ];
      }
    );
  };

  // New Code

  return (
    <>
      {/*  <React.StrictMode> */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="UCI Web Channel" content="A project under C4GT" />
        <title>Farmer Bot</title>
      </Head>
      <CookiesProvider>
        <App
          currentUser={currentUser}
          userName={profileName}
          allUsers={users}
          toChangeCurrentUser={onChangeCurrentUser}
          toAddUser={onAddUser}
          toRemoveUser={onRemoveUser}
        />

        {/* <Flex>
          <Box className="SideBar" flex="1" max-width="25%" position="relative">
            <Flex
              width="25%"
              max-height="100vh"
              overflow-y="auto"
              position="fixed"
            >
              {" "}
              {toggleSettings === 0 ? (
                <ChatSection
                  toShowSettings={showSettings}
                  allUsers={users}
                  toChangeCurrentUser={onChangeCurrentUser}
                  toRemoveUser={onRemoveUser}
                />
              ) : (
                <Settings
                  userName={profileName}
                  userBio={userBio}
                  toChangePhoneNumber={onChangePhoneNumber}
                  toChangeProfileName={onChangeProfileName}
                  toChangeUserBio={onChangeUserBio}
                  toShowChatSection={showChatSection}
                  toAddUser={onAddUser}
                />
              )}
            </Flex>
          </Box>

          <App
            currentUser={currentUser}
            userName={profileName}
            allUsers={users}
          />  
        </Flex> */}

        <ColorModeScript />
      </CookiesProvider>
      {/* </React.StrictMode> */}
    </>
  );
};
export default Home;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
