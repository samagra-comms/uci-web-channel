import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import profilePic from "../../../assets/images/bot_icon_2.png";
import ChatUiWindow from "./ChatUiWindow";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppContext } from "../../../utils/app-context";
import { User } from "../../../types";
import moment from "moment";
import {
  logToAndroid,
  sendEventToAndroid,
} from "../../../utils/android-events";
import axios from "axios";


interface chatWindowProps {
  currentUser: User;
}

const ChatWindow: React.FC<chatWindowProps> = ({ currentUser }) => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [showNavExternal3, setShowNavExternal3] = useState(false);
  const [active, setActive] = useState(false);
  const [botIcon, setBotIcon] = useState(profilePic);
  const [imageBlob, setImageBlob] = useState(null);

  const handleClick = (msg: string): void => {
    setShowNavExternal3(!showNavExternal3);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    context?.sendMessage(msg, null, true, currentUser);
  };

  useEffect(() => {
    const telemetryData = {
      botId: currentUser?.id,
      state: currentUser?.isExpired ? "expired" : "open",
      timestamp: moment().valueOf(),
    };
    try {
      sendEventToAndroid(
        "nl-chatbotscreen-chatbot-interactions",
        JSON.stringify(telemetryData)
      );
      logToAndroid(
        `nl-chatbotscreen-chatbot-interactions event: ${JSON.stringify(
          telemetryData
        )}`
      );
    } catch (err) {
      logToAndroid(`error in opening the bot:${JSON.stringify(err)}`);
    }
  }, [currentUser]);

  


  
  useEffect(() => {
   
    if (currentUser?.botImage) {
      if (!currentUser?.useIcon) {
        axios
          .get(currentUser?.botImage, {
            responseType: "blob", // Set the response type to blob
          })
          .then((res) => {
            if (res.status === 403) {
              setBotIcon(profilePic);
            } else {
              setBotIcon(res.data);

              setImageBlob(res.data);
            }
          })
          .catch((err) => {
            setBotIcon(profilePic);
          });
      } else {
        setBotIcon(currentUser?.botImage);
        setImageBlob(currentUser?.botImage);
      }
    } else {
      setBotIcon(profilePic);
    }
  }, [currentUser, currentUser?.botImage, currentUser?.useIcon]);

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
              localStorage.removeItem("userMsgs");
              // context?.setMessages([]);
              history.push("/");
            }}
            size="sm"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Box>
        {/* Name and Icon  */}
        <Flex flex="9" justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" alignItems="center" width={"100%"}>
            <Box
              className={`${styles.avatarContainer} `}
              style={{ width: "100%" }}
            >
              {
                <>
                  <div className={styles.innerRing}>
                    {imageBlob ? (
                      <img
                        src={URL.createObjectURL(imageBlob)}
                        height={"100%"}
                        width={"100%"}
                        alt="profile pic"
                      />
                    ) : (
                      <img
                        src={botIcon}
                        height={"100%"}
                        width={"100%"}
                        alt="profile pic"
                      />
                    )}
                  </div>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      verticalAlign: "center",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        maxWidth: "45vw",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        marginBottom: "auto",
                        marginTop: "auto",
                        // textDecoration: currentUser?.isExpired
                        //   ? "line-through"
                        //   : "none",
                      }}
                    >
                      {currentUser?.name}
                    </p>
                    <MDBNavbar>
                      <MDBContainer fluid>
                        <MDBNavbarToggler
                          className="ms-auto"
                          type="span"
                          style={{
                            backgroundColor: active ? "white" : "#2d3594",
                            boxShadow: "none",
                          }}
                          data-target="#navbarToggleExternalContent"
                          aria-controls="navbarToggleExternalContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                          onClick={(): void => {
                            setActive((prev) => !prev);
                            setShowNavExternal3(!showNavExternal3);
                          }}
                        >
                          <MDBIcon
                            icon="bars"
                            style={{ color: active ? "black" : "white" }}
                            fas
                          />
                        </MDBNavbarToggler>
                      </MDBContainer>
                    </MDBNavbar>

                    <MDBCollapse
                      show={showNavExternal3}
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        top: "9vh",
                        right: 0,
                        width: "60vw",
                      }}
                    >
                      <div className="bg-light shadow-3 p-1">
                        <MDBBtn
                          block
                          className="border-bottom m-0 fs-6"
                          color="link"
                          onClick={(): void => {
                            setActive((prev) => !prev);
                            handleClick("*");
                          }}
                        >
                          चैट फिर से शुरू करे
                        </MDBBtn>
                        <MDBBtn
                          block
                          className="border-bottom m-0 fs-6"
                          color="link"
                          onClick={(): void => {
                            setActive((prev) => !prev);
                            handleClick("#");
                          }}
                        >
                          पिछली प्रतिक्रिया संपादित करें
                        </MDBBtn>
                      </div>
                    </MDBCollapse>
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
            <ChatUiWindow />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChatWindow;
