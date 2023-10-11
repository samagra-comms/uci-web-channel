import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from "../../assets/images/bot_icon_2.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import crossPic from "../../assets/images/cross.png";
//@ts-ignore
import loader from "../../assets/images/loader.gif";
import { User } from "../../types";
import axios from "axios";

interface chatItemProps {
  active: boolean;
  name: string;
  phoneNumber?: string | null;
  toChangeCurrentUser: (name: string, number: string | null) => void;
  user?: User;
  isBlank?: boolean;
}

const StarredChatItem: React.FC<chatItemProps> = ({
  active,
  name,
  phoneNumber,
  user,
  isBlank,
}) => {
  const [isImageFetching, setIsImageFetching] = useState(false);
  const [botIcon, setBotIcon] = useState(loader);
  const history = useHistory();

  const fontColorToggle = useColorModeValue(
    styles.darkFontColor,
    styles.lightFontColor
  );

  const onChangingCurrentUserHandler = useCallback(() => {
    history.push(`/starredChats/${user?.id}`);
  }, [history, user]);

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
      return !isBlank ? loader : crossPic;
    } else {
      if (botIcon) {
        return botIcon;
      }
      return !isBlank ? botIcon : crossPic;
    }
  }, [botIcon, isBlank, isImageFetching]);


  return (
    <React.Fragment>
      <button
        disabled={isBlank}
        onClick={onChangingCurrentUserHandler}
        className={` ${active ? styles.activeContainer : styles.container}`}
      >
        <div className={styles.avatar}>
          {
            <img
              src={avatarImage}
              height={"100%"}
              width={"100%"}
              alt="profile pic"
            />
          }
        </div>
        <Box className={`${styles.chatItem_text}`}>
          <Box
            className={`${
              phoneNumber === null
                ? styles.chatItem_botName
                : styles.chatItem_userName
            } ${active ? styles.activeFont : fontColorToggle}`}
          >
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
              {name}
            </p>
          </Box>
        </Box>
      </button>
    </React.Fragment>
  );
};

export default StarredChatItem;
