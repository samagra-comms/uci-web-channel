import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { find, floor, map } from "lodash";
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
  triggerEventInAndroid,
} from "../../../utils/android-events";
import {
  MDBIcon,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
} from "mdb-react-ui-kit";

import RenderVoiceRecorder from "../../recorder/RenderVoiceRecorder";

interface recentChatsProps {
  allUsers: Array<User>;
}

const RecentChats: React.FC<recentChatsProps> = ({ allUsers }) => {
  const history = useHistory();
  const [botToFocus] = useLocalStorage("botToFocus", "");
  const context = useContext(AppContext);
const [inputMsg, setInputMsg] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [page, setPage] = useState(Number(sessionStorage.getItem("page") || 1));
  const perPage = 10;

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  // const StarredViewHandler = (): void => {
  //   history.push("/starredChats");

  //   sendEventToAndroid(
  //     "nl-chatbotscreen-chatbot_starmessagesearch",
  //     JSON.stringify({ timestamp: moment().valueOf() })
  //   );
  //   logToAndroid(
  //     `nl-chatbotscreen-chatbot_starmessagesearch event: ${JSON.stringify({
  //       timestamp: moment().valueOf(),
  //     })}`
  //   );
  // };

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

  const onSearchChange = useCallback(
    (ev) => {
      setInputMsg(ev.target.value)
      const newList = allUsers.filter((bot) =>
        bot.name.toLowerCase().includes(ev.target.value.toLowerCase())
      );
      setFilteredUsers(newList);
    },
    [allUsers]
  );

  const onBucketClick = useCallback(
    (bucketName: string) => () => {
      if(bucketName==='showAll'){
        setFilteredUsers(allUsers);
        return
      }
      const newList = allUsers.filter((bot) =>
        //@ts-ignore
        bot.tags.includes(bucketName)
      );
      setFilteredUsers(newList);
    },
    [allUsers]
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
            <Box>{<Box> Chats</Box>}</Box>
          </Flex>
        </Flex>
      </Box>

      <Box className={styles.mainContainer}>
        <Box className={`${styles.backBox}`}>
          {/* <button className={`${styles.starred}`} onClick={StarredViewHandler}>
            Starred Messages
          </button> */}
          {/* <input type="search" className={`${styles.starred}`}/> */}
          <MDBInputGroup
            className=" p-3"
            noBorder
            // textAfter={<MDBIcon fas icon="search" />}
            textAfter={<RenderVoiceRecorder setInputMsg={setInputMsg} tapToSpeak={false}/>}
          >
            
            <input
              className="form-control"
              type="search"
              value={inputMsg}
              placeholder="Search"
              style={{borderRadius:'5px'}}
              onChange={onSearchChange}
            />
          </MDBInputGroup>
       
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
            <div className={styles.floatingBtn}>
              <MDBPopover
                color="secondary"
                btnChildren={<MDBIcon fas icon="filter" className="fa-2x"/>}
                placement="top"
                poperStyle={{
                  maxHeight: "60vh",
                  width: "60vw",
                  inset: "auto auto 15px -25px",
                  border: "1px solid gray",
                }}
              >
                <MDBPopoverHeader style={{background:'#2D3594',color:'white'}}>Select Bucket</MDBPopoverHeader>
                <MDBPopoverBody>
                  <MDBListGroup light>
                  <MDBListGroupItem
                        onClick={onBucketClick('showAll')}
                        tag="a"
                        href="#"
                        action
                        aria-current="true"
                        className="px-3"
                      >
                        All Bots
                      </MDBListGroupItem>
                    {map(context?.bucketList, (item) => (
                      <MDBListGroupItem
                        onClick={onBucketClick(item)}
                        tag="a"
                        href="#"
                        action
                        aria-current="true"
                        className="px-3"
                      >
                        {item}
                      </MDBListGroupItem>
                    ))}
                  </MDBListGroup>
                </MDBPopoverBody>
              </MDBPopover>
            </div>

            {/* {isLoading && <p>Loading...</p>}
            <div ref={bottomRef} style={{ height: "1px" }}></div> */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RecentChats;
