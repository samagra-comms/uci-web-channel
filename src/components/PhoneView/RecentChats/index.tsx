import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Flex } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import {
  capitalize,
  concat,
  find,
  floor,
  sortBy,
} from "lodash";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { AppContext } from "../../../utils/app-context";
import ChatItem from "../../ChatItem";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";

import { User } from "../../../types/index";
import FullScreenLoader from "../../FullScreenLoader";
import {
  logToAndroid,
  sendEventToAndroid,
  triggerEventInAndroid,
} from "../../../utils/android-events";
import { MDBListGroup } from "mdb-react-ui-kit";

import _styles from "./ChatApp.module.css";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import Search from "../../search";
import moment from "moment";

interface recentChatsProps {
  allUsers: Array<User>;
}

const RecentChats: React.FC<recentChatsProps> = ({ allUsers }) => {
  const history = useHistory();
  const [botToFocus] = useLocalStorage("botToFocus", "");
  const context = useContext(AppContext);
  const [inputMsg, setInputMsg] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [activeBucket, setActiveBucket] = useState("सभी");
  const [page, setPage] = useState(Number(sessionStorage.getItem("page") || 1));
  const perPage = 10;

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  const maxPage = useMemo(
    () => floor(allUsers.length / perPage),
    [allUsers.length]
  );
  useEffect(() => {
    if (maxPage > 0 && page > maxPage) {
      setPage(maxPage);
      sessionStorage.setItem("page", "1");
    }
  }, [maxPage, page]);

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

  const onSearchChange = useCallback((ev) => {
    setInputMsg(ev.target.value);
  }, []);

  useEffect(() => {
    const newList = allUsers.filter((bot) =>
      bot.name.toLowerCase().includes(inputMsg.toLowerCase())
    );

    setFilteredUsers(newList);
  }, [allUsers, inputMsg]);

  const onBucketClick = useCallback(
    (bucketName: string) => () => {
      if (bucketName !== "सभी") {
        sendEventToAndroid(
          "bucket-clicked",
          JSON.stringify({
            bucket: bucketName,
            timestamp: moment().valueOf(),
          })
        );
      }
      setActiveBucket(bucketName);
      if (bucketName === "सभी") {
        setFilteredUsers(allUsers);
        return;
      }
      const newList = allUsers.filter((bot) =>
        //@ts-ignore
        bot.tags.includes(bucketName)
      );
      setFilteredUsers(newList);
    },
    [allUsers]
  );

  const buckets = useMemo(
    () => concat("सभी", sortBy(context?.bucketList) ?? []),
    [context?.bucketList]
  );

  const onSeachbarClicked = useCallback(() => {
    sendEventToAndroid(
      "searchbar-clicked",
      JSON.stringify({
        timestamp: moment().valueOf(),
      })
    );
  }, []);
  return (
    <Flex flexDirection="column" height="100vh" >
      <FullScreenLoader loading={context?.loading} />

      <div className={_styles.topBar} onClick={onSeachbarClicked}>
        <FaArrowLeft onClick={(): void => {
              try {
                triggerEventInAndroid("onDestroyScreen");
              } catch (err) {
                logToAndroid(
                  `error in destroying screen:${JSON.stringify(err)}`
                );
              }
            }} className={_styles.backIcon} />
        <Search onChange={onSearchChange} />
      </div>

      <Box className="p-2" style={{ background: "#2d3594" }}>
        <div
          style={{ borderTopRightRadius: "30px", borderTopLeftRadius: "30px" }}
        >
          <Box className={`${styles.backBox}`}>
            <div className={_styles.storiesContainer}>
              <div className={_styles.stories}>
                {buckets?.map((item, index) => (
                  <div
                    className={_styles.story}
                    key={index}
                    onClick={onBucketClick(item)}
                  >
                    <div
                      className={`${_styles.friendAvatar} ${
                        activeBucket === item ? _styles.activeStory : ""
                      }`}
                    >
                      <span className={_styles.friendName}>
                        {capitalize(item)}
                      </span>
                    </div>
                    {/* <span className={_styles.friendName}> {capitalize(item)}</span> */}
                  </div>
                ))}
              </div>
            </div>
            <Box className={styles.chatList}>
              <MDBListGroup style={{ minWidth: "22rem" }} light>
                {filteredUsers?.length > 0 ? (
                  <>
                    {(filteredUsers ?? [])?.map((user, index) => (
                      <div
                        key={user?.id}
                        ref={refs[user.id]}
                        onClick={onBotClick(user)}
                      >
                        <ChatItem
                          key={index}
                          index={index}
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
                    name={"कोई चैट उपलब्ध नहीं है"}
                    phoneNumber={""}
                    isBlank
                  />
                )}
              </MDBListGroup>
            </Box>
          </Box>
        </div>
      </Box>
    </Flex>
  );
};

export default RecentChats;
