import { useState, useEffect, useRef, useContext } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useRouter } from "next/router";

import WebView from "./WebView";

import { useWindowSize } from "../hooks/useWindowSize";
import { filter } from "lodash";
import { AppContext } from "../context";
import dynamic from "next/dynamic";
const RecentChats = dynamic(() => import("./PhoneView/RecentChats"), {
  ssr: false,
});

type recievedMessage = botMessage | humanMessage;

type botMessage = {
  content: {
    caption: any;
    choices: { key: string; text: string; backmenu: boolean }[];
    media_url: any;
    title: string;
  };
  from: string;
};

type humanMessage = {
  content: {
    title: string;
    from: string;
    choices: null;
  };
  from: string;
};

const App: React.FC = () => {
  // Router for Navigation
  const router = useRouter();

  // For Authentication
  const [accessToken, setAccessToken] = useState("");
  // const [recieved, setrecieved] = useState(false);
  const [cookies, setCookies] = useCookies();

  const { currentUser, allUsers, setMessages } = useContext(AppContext);

  useEffect(() => {
    try {
      // @ts-ignore
      const userMsgsFromLocal = JSON.parse(localStorage.getItem("userMsgs"));

      if (userMsgsFromLocal?.length > 0) {
        const userMsgs = filter(userMsgsFromLocal, {
          botUuid: currentUser?.id,
        });
        // setMessages(retrievedMessages);
        setMessages(userMsgs);
      }
      window &&
        window?.androidInteract?.log(localStorage.getItem("allMessages") || "");
    } catch (err) {
      window &&
        window?.androidInteract?.log(
          `error in fetching allMessages:${JSON.stringify(err)}`
        );
    }
  }, [setMessages, currentUser?.id]);

  const sizeVar = useWindowSize();
  const scrollToBottom: () => void = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  // useEffect(() => {
  //   if (cookies["access_token"] !== undefined) {
  //     fetch(`http://localhost:3000/api/auth?token=${cookies["access_token"]}`, {
  //       method: "GET",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data === null) {
  //           throw "Invalid Access Token";
  //           // router.push("/login");
  //         }
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //     setAccessToken(cookies["access_token"]);
  //   } else {
  //     router.push("/login");
  //   }},[])

  // useEffect(() => {
  //   if (router.query.state || cookies["access_token"] !== "") {
  //     registerOnMessageCallback(onMessageReceived);
  //     registerOnSessionCallback(onSessionCreated);
  //     scrollToBottom();
  //   } else {
  //     router.push("/login");
  //   }
  //   return () => {
  //     console.log('unmounted')
  //   }
  // }, [])

  if (sizeVar?.width < 768) {
    return <RecentChats allUsers={allUsers} />;
  } else {
    return (
      <>hello webview</>
      //     <WebView
      //     currentMessageObj={currentUserMessageObject}
      //     toClearChat={onClearingChat}
      //     messages={state.messages}
      //     // recieved={recieved}
      //   username={state.username}
      //   selected={selected}
      //   sendMessageFunc={sendMessage}
      //   allUsers={allUsers}
      //   toChangeCurrentUser={onChangingCurrentUser}
      //   currentUser={currentUser}
      //   addingNewUser={onAddingUser}
      //   toRemoveUser={toRemoveUser}
      //   onSendLocation={sendLocation}
      // />
    );
  }
};

export default App;
