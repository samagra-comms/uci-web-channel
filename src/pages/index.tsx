import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import App from "../components/App";
import Settings from "../components/Settings";
import ChatSection from "../components/ChatSection";
import React from "react";
// import * as serviceWorker from "../utils/serviceWorker";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript, Flex, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  // User Settings

  const [profileName, setProfileName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userBio, setUserBio] = useState("");

  const [users, setUsers] = useState<{ name: string; number: string }[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    number: string | null;
  }>({ name: "UCI", number: null });

  const [toggleSettings, setToggleSettings] = useState(0);

  useEffect(() => {
    setProfileName(localStorage.getItem("profileName") || "");
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
    setUserBio(localStorage.getItem("userBio") || "");
    // setUsers(JSON.parse(localStorage.getItem("AllUsers") || []))
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

  const onChangeCurrentUser = (name: string) => {
    const myUser = users.find((user) => {
      return user.name === name;
    }) || { name: "UCI", number: null };
    setCurrentUser(myUser);
  };

  const onAddUser = (newName: string, newNumber: string) => {
    setUsers((prevUsers: { name: string; number: string }[]) => {
      localStorage.setItem(
        "AllUsers",
        JSON.stringify([...prevUsers, { name: newName, number: newNumber }])
      );
      return [...prevUsers, { name: newName, number: newNumber }];
    });
  };
  return (
    <React.StrictMode>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>UCI PWA</title>
      </Head>
      <CookiesProvider>
        <Flex>
          <Flex flex="1" min-width="25%" max-height="100vh" overflow-y="auto">
            {" "}
            {toggleSettings === 0 ? (
              <ChatSection
                toShowSettings={showSettings}
                allUsers={users}
                toChangeCurrentUser={onChangeCurrentUser}
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

          <App currentUser={currentUser} />
        </Flex>

        <ColorModeScript />
      </CookiesProvider>
    </React.StrictMode>
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

