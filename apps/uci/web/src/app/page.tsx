'use client';

import { Flex } from '@chakra-ui/react';
import Chats from './chats/[chatid]/page';
import Home from './home/page';
import { AppContext } from "@/context";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filter, find } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import ChatItem from "@/components/common/chat-item";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser, allUsers, setMessages } = useContext(AppContext);
  const usersData = useSelector((state: any) => state.userList.users);
  

  useEffect(() => {
    if(usersData.length > 0)
    {
      console.log("Users data: ", usersData);
    }
  }, [usersData]);

  useEffect(() => {
    try {
      const userMsgsFromLocal = JSON.parse(localStorage.getItem("userMsgs")|| '');
      if (userMsgsFromLocal?.length > 0) {
        const userMsgs = filter(userMsgsFromLocal, {
          botUuid: currentUser?.id,
        });
        setMessages(userMsgs);
      }
    } catch (err:any) {
     toast.error(err?.message || err)
    }
  }, [setMessages, currentUser?.id]);


  const history = useRouter();
  const context = useContext(AppContext);

  const onStarredChatsClick = useCallback( (): void => {
    history.push("/starred-chats");
  },[history]);


  useEffect(() => {
    try {
      if (localStorage.getItem('botToFocus')) {
        const bot = find(allUsers, { id: localStorage.getItem('botToFocus') });
        if (bot) {
          localStorage.removeItem("botToFocus");
          context?.toChangeCurrentUser(bot);
          setTimeout(() => {
            history.push(`/chats/${bot?.id}`);
          }, 100);
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [history, allUsers, context]);

  useEffect(() => {
    setTimeout(() => {
      context?.setLoading(false);
      if (document.getElementById("mainLoader")) {
        // @ts-ignore
        document.getElementById("loader").setAttribute("display", "none");
        toast.error(
          "चैटबॉट जवाब नहीं दे पा रहा हैं। कृपया बाद में पुन: प्रयास करें।"
        );
      }
    }, 60000);
  }, [context]);


const ParentComponent = () => {
  return (
    <Flex >
      <Home/>
      <Chats/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Flex flexDirection="column" height="100vh" width="100vw">
      {/* Top Section */}
      <Box className={`${styles.top_section}`}>
        {/* For the back button */}
        <Box flex="1.5">
          <Button
            style={{
              border: "none",
              padding: "0.75rem 1rem",
              borderRadius: "50%",
              fontSize: "14px",
            }}
            size="sm"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Box>
        <Flex flex="9" justifyContent="space-between" alignItems="center" >
          <Flex justifyContent="center" alignItems="center" >
            <Box>{<Box>Chats</Box>}</Box>
          </Flex>
        </Flex>
      </Box>

      <Box className={styles.mainContainer}>
        <Box className={`${styles.backBox}`}>
          <button className={`${styles.starred}`} onClick={onStarredChatsClick}>
            Starred Messages
          </button>
          <Box className={styles.chatList}>
            {usersData?.length > 0 ? (
              <>
                {(usersData ?? [])?.map((user:any, index:string) => (
                  <div key={user?.id}
                  >
                    <ChatItem
                      key={index}
                      active={user.active}
                      name={user.name}
                      phoneNumber={user.number}
                      user={user}
                    />
                  </div>
                ))}
              </>
            ) : (
              <ChatItem
                key={0}
                active={false}
                name={"No Chats Available"}
                phoneNumber={""}
                isBlank
              />
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ParentComponent;

