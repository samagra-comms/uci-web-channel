import { useContext, FC, useMemo, useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

import { find } from "lodash";
import { AppContext } from "../utils/app-context";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from "../assets/images/bot_icon_2.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./starred-chat-page.module.css";
import StarredChatList from "../components/StarredChatList";
//@ts-ignore
import loader from "../assets/images/loader.gif";
import { logToAndroid, triggerEventInAndroid } from "../utils/android-events";
import axios from "axios";

const StarredChatsPage: FC = () => {
  const context = useContext(AppContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const user = useMemo(
    () => find(context?.allUsers, { id }),
    [context?.allUsers, id]
  );

  const [isImageFetching, setIsImageFetching] = useState(false);
  const [botIcon, setBotIcon] = useState(loader);

  useEffect(() => {
    if (user?.botImageUrl) {
      setIsImageFetching(true);
      axios
        .get(user?.botImageUrl)
        .then(async (res) => {
          setIsImageFetching(false);
          if (res.status === 403) {
            setBotIcon(botImage);
          } else {
            setBotIcon(user?.botImageUrl);
          }
        })
        .catch((err) => {
          setIsImageFetching(false);
          setBotIcon(botImage);
        });
    } else {
      setBotIcon(botImage);
      setIsImageFetching(false);
    }
  }, [user, user?.botImage]);

  const avatarImage = useMemo(() => {
    if (isImageFetching) {
      return loader;
    } else {
      return botIcon;
    }
  }, [botIcon, isImageFetching]);

  useEffect(() => {
    triggerEventInAndroid("onBotListingScreenFocused", false);
    logToAndroid(`On Home Page onBotListingScreenFocused:false triggered`);
  }, []);

  return (
    <Flex
      bgColor="var(--primarydarkblue)"
      flexDirection="column"
      height="100vh"
      width="100%"
    >
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
              history.push("/starredChats");
            }}
            size="sm"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Box>
        {/* Name and Icon */}
        <Flex flex="9" justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Box className={`${styles.avatarContainer} `}>
              {
                <>
                  <div className={styles.innerRing}>
                    <img
                      src={avatarImage}
                      height={"100%"}
                      width={"100%"}
                      alt="profile pic"
                    />
                  </div>
                  <Box>
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        maxWidth: "70vw",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginBottom: "auto",
                        marginTop: "auto",
                      }}
                    >
                      {user?.name}
                    </p>
                  </Box>
                </>
              }
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Chat Window */}
      <Box className={`${styles.chatWindow}`}>
        {/* NeoMorphism Box */}
        <Box className={`${styles.BackBox}`} style={{ borderRadius: "0px" }}>
          {/* Chat Area */}
          <Box style={{ height: "100%" }}>
            <StarredChatList user={user} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default StarredChatsPage;
