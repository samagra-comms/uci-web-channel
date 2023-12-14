import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { find, floor, slice } from "lodash";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { AppContext } from "../../../utils/app-context";
import ChatItem from "../../ChatItem";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";

import { User } from "../../../types/index";
import moment from "moment";
import FullScreenLoader from "../../FullScreenLoader";
import {
  logToAndroid,
  sendEventToAndroid,
  triggerEventInAndroid,
} from "../../../utils/android-events";
import { MDBListGroup } from "mdb-react-ui-kit";

interface recentChatsProps {
  allUsers: Array<User>;
}

const RecentChats: React.FC<recentChatsProps> = ({ allUsers }) => {
  const history = useHistory();
  const [botToFocus] = useLocalStorage("botToFocus", "");
  const context = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(Number(sessionStorage.getItem("page") || 1));
  const perPage = 10;

  const StarredViewHandler = (): void => {
    history.push("/starredChats");

    sendEventToAndroid(
      "nl-chatbotscreen-chatbot_starmessagesearch",
      JSON.stringify({ timestamp: moment().valueOf() })
    );
    logToAndroid(
      `nl-chatbotscreen-chatbot_starmessagesearch event: ${JSON.stringify({
        timestamp: moment().valueOf(),
      })}`
    );
  };

  const maxPage = useMemo(
    () => floor(allUsers.length / perPage),
    [allUsers.length]
  );
  useEffect(() => {
    if (maxPage > 0 && page > maxPage) {
      setPage(maxPage)
      sessionStorage.setItem("page", "1");}
  }, [maxPage, page]);

  // const fetchUser = useCallback(() => {
  //   if (allUsers.length > 0) {
  //     console.log("shri_ram", { allUsers: allUsers.length, page, maxPage });
  //     setIsLoading(true);
  //     const newUsers = slice(allUsers, 0, page * perPage + 1);
  //     setData(newUsers);
  //     sessionStorage.setItem("page", `${Number(page) + 1}`);
  //     if (page < maxPage) {
      
  //       sessionStorage.setItem("page", `${Number(page) + 1}`);
  //       setPage(Number(page) + 1);
  //       setIsLoading(false);
  //     } 
  //     else if (page >= maxPage) {
  //       setIsLoading(false);
  //       return;
  //       // setPage(maxPage-1);
  //       // localStorage.setItem('page',`${maxPage-1}`)
  //     }
     
  //   }
  // }, [allUsers, maxPage, page]);

  // toChangeCurrentUser
  useEffect(() => {
    try {
      if (botToFocus) {
        const bot = find(allUsers, { id: botToFocus });
        if (bot) {
          localStorage.removeItem("botToFocus");
          logToAndroid(`removing botToFocus:${botToFocus}`);

          context?.toChangeCurrentUser(bot);
          setTimeout(() => {
            history.push(`/chats/${bot?.id}`);
          }, 100);
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, allUsers, botToFocus, context?.toChangeCurrentUser]);

  const bottomRef = useRef(null);

  // useEffect(() => {
  //   const options = {
  //     root: null, // Use the viewport as the root
  //     rootMargin: "0px",
  //     threshold: 0.1, // Trigger when 10% of the target is visible
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && !isLoading) {
  //       fetchUser(); // Fetch more data when the bottom is reached
  //     }
  //   }, options);

  //   if (bottomRef.current) {
  //     observer.observe(bottomRef.current);
  //   }

  //   return () => {
  //     if (bottomRef.current) {
  //       observer.unobserve(bottomRef.current);
  //     }
  //   };
  // }, [fetchUser, isLoading, page]);

  useEffect(() => {
    if (context?.loading)
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

  const refs = useMemo(
    () =>
      allUsers.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
      }, {}),
    [allUsers]
  );

  useEffect(() => {
    if (context?.botToScroll) {
      const scrolTo = context?.botToScroll?.id;
      refs?.[scrolTo]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [refs, context?.botToScroll]);

  const onBotClick = useCallback(
    (user) => () => {
      context?.setBotToScroll(user);
    },
    [context]
  );

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
                triggerEventInAndroid("onDestroyScreen");
              } catch (err) {
                logToAndroid(
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
          <MDBListGroup style={{ minWidth: '22rem' }} light>
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
            </MDBListGroup>
            {/* {isLoading && <p>Loading...</p>}
            <div ref={bottomRef} style={{ height: "1px" }}></div> */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RecentChats;
