'use client';
import { AppContext } from "@/context";
import { Box, Flex, useBreakpointValue, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filter, forEach } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import ChatItem from "@/components/common/chat-item";
import moment from "moment";
import StarredChatItem from "@/components/common/starred-chat-item";
import { User } from "@/types";


export default function Home() {
  const { currentUser, allUsers, setMessages } = useContext(AppContext);

  useEffect(() => {
    try {
      const userMsgsFromLocal = JSON.parse(localStorage.getItem("userMsgs") || '');
      if (userMsgsFromLocal?.length > 0) {
        const userMsgs = filter(userMsgsFromLocal, {
          botUuid: currentUser?.id,
        });
        setMessages(userMsgs);
      }
    } catch (err: any) {
      toast.error(err?.message || err)
    }
  }, [setMessages, currentUser?.id]);

  const history = useRouter();
  const context = useContext(AppContext);

  const onStarredChatsClick = useCallback((): void => {
    history.push("/starred-chats");
  }, [history]);

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  const sortedUsers = useMemo(() => {
    return [...allUsers].sort((user1, user2) => {
      const user1Expired = (user1?.endDate !== undefined && user1.endDate < moment().format()) || (user1?.status !== 'ENABLED');
      const user2Expired = (user2?.endDate !== undefined && user2.endDate < moment().format()) || (user2?.status !== 'ENABLED');

      if (user1Expired && !user2Expired) {
        return 1;
      } else if (!user1Expired && user2Expired) {
        return -1;
      } else {
        return 0;
      }
    });
  }, [allUsers]);

  // Create a state to track the active tab
  const [activeTab, setActiveTab] = useState("bots");

  const onTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const starredBots = useMemo(() => {
    const botIds = Object.keys(context?.starredMsgs);
    const bots: Array<User> = [];
    forEach(context?.allUsers, (user) => {
      if (botIds.includes(user?.id))
        bots.push(user);
    });
    return bots;
  }, [context?.allUsers, context?.starredMsgs]);

  const redirectToHome = useCallback(() => history.push('/'), [history]);

  return (
    <Flex>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Flex flexDirection="column" height="100vh" width="100vw">
          {/* Top Section */}
          <Box className={`${styles.top_section}`}>
            {/* For the back button */}
            <Box flex="1.5">
              <FontAwesomeIcon icon={faComment} className={`${styles.button}`} />
            </Box>
            <Flex flex="9" justifyContent="space-between" alignItems="center">
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="xl" fontWeight="bold" color="teal.500">Chats</Text>
              </Flex>
            </Flex>
          </Box>
          <Box className={styles.mainContainer} width={isMobile ? "100%" : "35%"}>
            <Box className={`${styles.backBox}`}>
              {/* Tab View */}
              <Tabs isFitted variant="soft" colorScheme="teal" onChange={onTabChange}>
                <TabList>
                  <Tab _selected={{ color: "white", bg: "teal.500" }} _focus={{ outline: "none" }}>Bots</Tab>
                  <Tab _selected={{ color: "white", bg: "teal.500" }} _focus={{ outline: "none" }}>Starred Chats</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* Scrollable Chat List */}
                    <Box className={`${styles.chatList}`} maxHeight="85vh" overflowY="auto">
                      {sortedUsers?.length > 0 ? (
                        <>
                          {sortedUsers.map((user: any, index: any) => (
                            <div key={user?.id}>
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
                          name={"No Bots Available"}
                          phoneNumber={""}
                          isBlank
                        />
                      )}
                    </Box>
                  </TabPanel>
                  {/* Starred Chats Tab */}
                  <TabPanel>
                    {/* Scrollable Chat List */}
                    <Box className={`${styles.chatList}`} maxHeight="60vh" overflowY="auto">
                      {starredBots.length > 0 ? (
                        <>
                          {(starredBots ?? [])?.map((user, index) => (
                            <StarredChatItem
                              toChangeCurrentUser={(): null => null}
                              key={index}
                              active={user.active}
                              name={user.name}
                              phoneNumber={user.number}
                              user={user}
                            />
                          ))}
                        </>
                      ) : (
                        <StarredChatItem
                          toChangeCurrentUser={(): null => null}
                          key={0}
                          active={false}
                          name={'No Starred Messages'}
                          isBlank
                        />
                      )}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Flex>
      </main>
    </Flex>
  )
}