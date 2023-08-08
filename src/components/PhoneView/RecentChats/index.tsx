import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { find } from "lodash";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { AppContext } from "../../../utils/app-context";
import ChatItem from "./ChatItem";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";

import { User } from "../../../types/index";
import moment from "moment";
import FullScreenLoader from "../../FullScreenLoader";

interface recentChatsProps {
  allUsers: Array<User>;
}

const RecentChats: React.FC<recentChatsProps> = ({ allUsers }) => {
  const history = useHistory();
  const [botToFocus] = useLocalStorage("botToFocus", "");
  const context = useContext(AppContext);

  const StarredViewHandler = (): void => {
    history.push("/starredChats");
    window &&
      window?.androidInteract?.onEvent(
        "nl-chatbotscreen-chatbot_starmessagesearch",
        JSON.stringify({ timestamp: moment().valueOf() })
      );
    window &&
      window?.androidInteract?.log(
        `nl-chatbotscreen-chatbot_starmessagesearch event: ${JSON.stringify({
          timestamp: moment().valueOf(),
        })}`
      );
  };

  // toChangeCurrentUser
  window && window?.androidInteract?.log(`botToFocus:${botToFocus}`);
  useEffect(() => {
    try {
      if (botToFocus) {
        const bot = find(allUsers, { id: botToFocus });
        if (bot) {
          localStorage.removeItem("botToFocus");
          window &&
            window?.androidInteract?.log(`removing botToFocus:${botToFocus}`);

          context?.toChangeCurrentUser(bot);
          setTimeout(() => {
            history.push(`/chats/${bot?.id}`);
          }, 100);
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [history, allUsers, botToFocus, context]);

  useEffect(() => {
    setTimeout(() => {
      context?.setLoading(false);
      if (document.getElementById("mainLoader")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById("loader").setAttribute("display", "none");
        toast.error(
          "चैटबॉट जवाब नहीं दे पा रहा हैं। कृपया बाद में पुन: प्रयास करें।"
        );
      }
    }, 60000);
  }, [context]);

  const refs = useMemo(()=>allUsers.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {}),[allUsers]);

  useEffect(() => {
    if (context?.botToScroll) {
      const scrolTo = context?.botToScroll?.id;
      refs[scrolTo].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [refs,context?.botToScroll]);

  const onBotClick=useCallback((user)=>()=> {
    context?.setBotToScroll(user)
              try {
                window &&
                  window?.androidInteract?.onEvent(
                    "nl-chatbotscreen-chatbot-interactions",
                    JSON.stringify({
                      botId: user.id,
                      timestamp: moment().valueOf(),
                    })
                  );
                window &&
                  window?.androidInteract?.log(
                    `nl-chatbotscreen-chatbot-interactions event: ${JSON.stringify(
                      { botId: user.id, timestamp: moment().valueOf() }
                    )}`
                  );
              } catch (err) {
                window &&
                  window?.androidInteract?.log(
                    `error in opening the bot:${JSON.stringify(err)}`
                  );
              }
            },[context])

  return (
    <Flex flexDirection="column" height="100vh">
      <FullScreenLoader loading={context?.loading} />
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
            onClick={(): void => {
              try {
                window && window?.androidInteract?.onDestroyScreen();
              } catch (err) {
                window &&
                  window?.androidInteract?.log(
                    `error in destroying screen:${JSON.stringify(err)}`
                  );
              }
            }}
            size="sm"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Box>
        <Flex flex="9" justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Box>{<Box>Chats</Box>}</Box>
          </Flex>
        </Flex>
      </Box>

      <Box className={styles.mainContainer}>
        <Box className={`${styles.backBox}`}>
          <button className={`${styles.starred}`} onClick={StarredViewHandler}>
            Starred Messages
          </button>
          <Box className={styles.chatList}>
            {allUsers?.length > 0 ? (
              <>
                {(allUsers ?? [])?.map((user, index) => (
                  <div
                  key={user?.id}
                    ref={refs[user.id]}
                    onClick={onBotClick(user)}
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

export default RecentChats;
