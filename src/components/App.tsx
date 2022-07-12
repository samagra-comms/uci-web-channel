import { useState, useEffect } from "react";
import {
  registerOnMessageCallback,
  registerOnSessionCallback,
  send,
} from "./websocket";
import MessageWindow from "./MessageWindow";
import Profile from "./Profile";
import TextBar from "./TextBar";
import { useColorModeValue, Box } from "@chakra-ui/react";

import Notification from "./Notifications";
import { useCookies, withCookies } from "react-cookie";
import { useRouter } from "next/router";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { SessionState } from "http2";
// import darkImage from "../../public/dark_back.png";
// import lightImage from "../../public/dark_back.jpg";

type recievedMessage = botMessage | humanMessage;

type botMessage = {
  content: {
    caption: any,
    choices: {key: string, text: string, backmenu: boolean}[],
    media_url: any,
    title: string
  },
  from: string
}


type humanMessage = {
  content: {
    title: string,
    from: string,
    choices: null
  },
  from: string
}

const App: React.FC = () => {
  // Router for Navigation
  const router = useRouter();

  // For Authentication
  const [accessToken, setAccessToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [cookies, setCookies] = useCookies();

  // For showing the Profile
  const [profileOpen, setProfileOpen] = useState(false);

  // Chakra Theme Toggle Information
  const bgImg = useColorModeValue("url('/light_back_2.jpg')","url('/dark_back.png')");
  const bg = useColorModeValue("#06d755", "#202C33");
  const textColor = useColorModeValue("#202C33", "#fff");
  // ----------------------

  const initialState: {
    messages: any[];
    username: string;
    session: any;
  } = {
    messages: [],
    username: "chaks",
    session: {},
  };

  const [state, setState] = useState(initialState);

  const scrollToBottom: () => void = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    if (cookies["access_token"] !== undefined) {
      fetch(`http://localhost:3000/api/auth?token=${cookies["access_token"]}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === {}) {
            throw "Invalid Access Token";
            router.push("/login");
          } 
        })
        .catch((err) => {
          throw err;
        });
      setAccessToken(cookies["access_token"]);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect((): void => {
    if (router.query.state || cookies["access_token"] !== "") {
      registerOnMessageCallback(onMessageReceived);
      registerOnSessionCallback(onSessionCreated);
      scrollToBottom();
    } else {
      router.push("/login");
    }
  }, [state]);

  const onSessionCreated = (session: { session: any }): void => {
    // console.log({ session });
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: recievedMessage): void => {
    setState({
      ...state,
      messages: state.messages.concat({
        username: "UCI",
        text: msg.content.title,
        choices: msg.content.choices,
      }),
    });
  };

  const setUserName = (name: string): void => {
    setState({
      ...state,
      username: name,
    });
  };

  const sendMessage = (text: string): void => {
    if (!accessToken) {
      router.push("/login");
    } else {
      send(text, state.session, accessToken);
      setState({
        ...state,
        messages: state.messages.concat({
          username: state.username,
          text: text,
        }),
      });
    }
  };

  if (state.username === null) {
    console.log("Please set a username first");
    return (
      <div className="container">
        <div className="container-title">Enter username</div>
        <TextBar onSend={setUserName} />
      </div>
    );
  }

  const selected = (option: any): void => {
    const toSend = option.key + " " + option.text;
    sendMessage(toSend);
  };

  const showProfile: () => void = (): void => {
    setProfileOpen(true);
  };

  return (
    <>
      {/* {loading? 
    (<h1>"Page is Loading"</h1>): 
    (isVerified &&  */} 
      <>
        {profileOpen && (
          <Profile
            removeProfile={setProfileOpen}
            name="Chakshu Gautam"
            number="+91 1234567890"
            bio="Hi! I am using UCI :)"
          />
        )}
        <Box
          cursor="pointer"
          bgColor={bg}
          onClick={showProfile}
          className="chat-header"
        >
          <Box color={textColor} className="chat__header--info">
            <h1>Chakshu Gautam</h1>
          </Box>
          <div
            onClick={(event) => {
              if (event.stopPropagation) event.stopPropagation();
              return false;
            }}
            className="chat__header--right"
          >
            <ColorModeSwitcher />
            {/* <Notification /> */}
          </div>
        </Box>
        <Box className="chat-body-container" >
          <Box className="chat-body" bgImage={bgImg} >
            <MessageWindow
              messages={state.messages}
              username={state.username}
              selected={selected}
            />
          </Box>
          <TextBar onSend={sendMessage} />
        </Box>
      </>
    </>
  );
};

export default App;
