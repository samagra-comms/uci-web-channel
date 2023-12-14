import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import styles from "./index.module.css";
//@ts-ignore
import botImage from "../../assets/images/bot_icon_2.png";
//@ts-ignore
import crossPic from "../../assets/images/cross.png";
//@ts-ignore
import loader from "../../assets/images/loader.gif";
import { AppContext } from "../../utils/app-context";
import { User } from "../../types";

import { useDispatch } from "react-redux";
import { setBotImage } from "../../store/slices/userSlice";
import { getMonthInHindi } from "../../utils/util-functions";
import axios from "axios";
import ListItem from "../list-item";
import { MDBBadge, MDBListGroupItem } from "mdb-react-ui-kit";

interface chatItemProps {
  active: boolean;
  name: string;
  phoneNumber: string | null;
  user?: User;
  isBlank?: boolean;
}

const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ChatItem: React.FC<chatItemProps> = ({
  active,
  name,
  phoneNumber,
  user,
  isBlank,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const context = useContext(AppContext);
  const [isImageFetching, setIsImageFetching] = useState(false);
  const [botIcon, setBotIcon] = useState(user?.botImage);
  const [blobImage, setBlobImage] = useState(null);
  const fontColorToggle = useColorModeValue(
    styles.darkFontColor,
    styles.lightFontColor
  );

  const onChangingCurrentUserHandler = useCallback(() => {
    context?.toChangeCurrentUser(user);
    history.push(`/chats/${user?.id}`);
  }, [context, history, user]);

  useEffect(() => {
    if (user?.botImage) {
      if (!user?.useIcon) {
        setIsImageFetching(true);
        axios
          .get(user?.botImage, {
            responseType: "blob", // Set the response type to blob
          })
          .then(async (res) => {
            setIsImageFetching(false);

            if (res.status === 403) {
              setBotIcon(botImage);
            } else {
              setBotIcon(res.data);
              dispatch(setBotImage({ user, image: res.data }));
              setBlobImage(res.data);
              const dataURL = await blobToDataURL(res.data);
              //@ts-ignore
              localStorage.setItem('blobImage',dataURL)
            }
          })
          .catch((err) => {
            setIsImageFetching(false);
            setBotIcon(botImage);
          });
      } else {
        setBotIcon(user?.botImage);
        setBlobImage(user?.botImage);
      }
    } else {
      setBotIcon(botImage);
      setIsImageFetching(false);
    }
  }, [dispatch, user, user?.botImage]);

  //@ts-ignore
  const createdAt = getMonthInHindi(user);

  const [maxWidth, setMaxWidth] = useState(null);

  // Reference to Element A
  const elementARef = React.createRef();

  // Reference to Element B
  const elementBRef = React.createRef();

  // Function to calculate maxWidth based on Element A's width
  const calculateMaxWidth = useCallback(() => {
    if (elementARef.current && elementBRef.current) {
      //@ts-ignore
      const elementAWidth = elementARef.current.offsetWidth;
      //@ts-ignore
      const elementBWidth = elementBRef.current.offsetWidth;
      // Calculate maxWidth based on Element A's width (adjust this calculation as needed)
      const calculatedMaxWidth = elementAWidth - elementBWidth; // Adjust this multiplier as needed
      setMaxWidth(calculatedMaxWidth);
    }
  }, [elementARef, elementBRef]);

  // Use useEffect to recalculate maxWidth whenever Element A's size changes
  useEffect(() => {
    calculateMaxWidth();
    window.addEventListener("resize", calculateMaxWidth); // Listen for window resize events

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", calculateMaxWidth);
    };
  }, [calculateMaxWidth]);

  const avatarImage = useMemo(() => {
    if (isImageFetching) {
      return !isBlank ? loader : crossPic;
    } else {
      if (blobImage) {
        return URL.createObjectURL(blobImage);
      }
      return !isBlank ? botIcon : crossPic;
    }
  }, [blobImage, botIcon, isBlank, isImageFetching]);

  const showNewBadge = useMemo(
    () => (!user?.isConvStarted && !isBlank),
    [isBlank, user?.isConvStarted]
  );
  return (
    <>
      <MDBListGroupItem
        onClick={onChangingCurrentUserHandler}
        disabled={isBlank}
        className="d-flex justify-content-between align-items-center py-2"
        style={{
          border: "none",
          borderBottom: `1px solid rgb(128,128,128,0.2)`,
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={avatarImage}
            alt=""
            style={{
              width: "45px",
              height: "45px",
              border: showNewBadge ? "2px solid #2d3594" : "",
            }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p
              className="fw-bold mb-0"
              style={{
                textOverflow: "ellipsis",
                maxWidth: `${maxWidth}px`,
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: "0",
                color:"black",
                textDecoration: "none",
                // color: user?.isExpired ? "lightgrey" : "black",
                // textDecoration: user?.isExpired ? "line-through" : "none",
              }}
            >
              {name}
            </p>
            <p className=" mb-0" style={{ color: "#2d3594" }}>
              {createdAt}
            </p>
          </div>
        </div>
        {showNewBadge && (
          <MDBBadge pill light color="primary" style={{ color: "#2d3594" }}>
            नया
          </MDBBadge>
        )}
      </MDBListGroupItem>
      {/* <>
        <button
          onClick={onChangingCurrentUserHandler}
          disabled={isBlank}
          className={styles.container}
        >
          <div
            className={`${styles.avatar} ${
              user?.isExpired
                ? styles.disabled
                : !user?.isConvStarted && !isBlank
                ? styles.unread_border
                : null
            }`}
          >
            <img
              src={avatarImage}
              alt="profile blob"
              height={"100%"}
              width={"100%"}
            />
          </div>

        
          <Box className={`${styles.chatItem_text}`}>
            <Box
              className={`${
                phoneNumber === null
                  ? styles.chatItem_botName
                  : styles.chatItem_userName
              } ${active ? styles.activeFont : fontColorToggle}`}
              style={{ position: "relative" }}
              //@ts-ignore
              ref={elementARef}
            >
              <p
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: `${maxWidth}px`,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  marginBottom: "0",
                  color: user?.isExpired ? "lightgrey" : "black",
                  textDecoration: user?.isExpired ? "line-through" : "none",
                }}
              >
                <span
                  className={styles.date}
                  //@ts-ignore
                  ref={elementBRef}
                >
                  {createdAt}
                </span>
                {name}
                {!user?.isConvStarted && !isBlank && ( 
                 <span className={styles.new}>नया</span>)} 
              </p>
            </Box>
          </Box>
        </button>
      </> */}
    </>
  );
};

export default ChatItem;
