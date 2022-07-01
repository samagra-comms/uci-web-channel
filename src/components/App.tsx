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
import { withCookies } from 'react-cookie';
import { useRouter } from "next/router";
import ColorModeSwitcher from "./ColorModeSwitcher";

const App = (): any => {
  const router = useRouter();

  
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState(false);
  const [accessToken, setAccessToken] = useState();



  // useEffect(() => {
  //     let token = ""
  //     if (typeof window !== 'undefined') {
  //       token = localStorage.getItem("jwtToken") || "";
  //     }
  //     if (token !== "") {
  //       setVerified(true);
  //     } else {
  //       console.log("You are not logged In... Sending you to /login")
  //       router.push("/login")
  //     }
  //   setLoading(false);
  // });

  const [profileOpen, setProfileOpen] = useState(false);

  // Chakra Theme Toggle Information
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

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect((): void => {
    if (!router.query.state) {
      router.push("/login");
    }

    // setAccessToken(props.cookies.get('access_token'));
    registerOnMessageCallback(onMessageReceived);
    registerOnSessionCallback(onSessionCreated);
    scrollToBottom();
  }, [state]);

  const onSessionCreated = (session: any) => {
    console.log({ session });
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: any) => {
    // let message = msg.content.title;
    // if (msg.content.choices && msg.content.choices.length > 0) {
    //   for (let i = 0; i < msg.content.choices.length; i++) {
    //     message =
    //       message +
    //       "\n" +
    //       msg.content.choices[i].key +
    //       ". " +
    //       msg.content.choices[i].text;
    //   }
    //   console.log(msg.content.choices);
    // }
    setState({
      ...state,
      messages: state.messages.concat({
        username: "UCI",
        text: msg.content.title,
        choices: msg.content.choices,
      }),
    });
  };

  const setUserName = (name: string) => {
    setState({
      ...state,
      username: name,
    });
  };

  const sendMessage = (text: any) => {
    send(text, state.session);
    setState({
      ...state,
      messages: state.messages.concat({
        username: state.username,
        text: text,
      }),
    });
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

  const selected = (option: any) => {
    const toSend = option.key + " " + option.text;
    sendMessage(toSend);
  };

  const showProfile = () => {
    setProfileOpen(true);
  };

  return (
    <>
    {loading? 
    (<h1>"Page is Loading"</h1>): 
    (isVerified && 
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
      <Box className="chat-body-container">
        <Box className="chat-body">
          <MessageWindow
            messages={state.messages}
            username={state.username}
            selected={selected}
          />
        </Box>
        <TextBar onSend={sendMessage} />
      </Box>
      </>
    )
    }  
    </>
  );
};

export default withCookies(App);
