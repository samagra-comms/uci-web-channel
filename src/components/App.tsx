import { useState, useEffect, useRef } from "react";
import {
  registerOnMessageCallback,
  registerOnSessionCallback,
  send,
} from "./websocket";
import MessageWindow from "./MessageWindow";
import Profile from "./Profile";
import TextBar from "./TextBar";
import {
  useColorModeValue,
  Box,
  Flex,
  Text,
  Spacer,
  Image,
  interactivity,
} from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import { startWebsocketConnection } from "./websocket";
import Notification from "./OTPpage/Notifications";
import { useCookies, withCookies } from "react-cookie";
import { useRouter } from "next/router";
import ColorModeSwitcher from "./ColorModeSwitcher";
import { SessionState } from "http2";
import { useCol } from "react-bootstrap/esm/Col";
import PhoneView from "./PhoneView/index";
import WebView from "./WebView";
import RecentChats from "./PhoneView/RecentChats";



interface appProps {
  currentUser: { name: string; number: string | null };
  allUsers: { name: string; number: string | null; active: boolean }[];
  userName: string;
  toChangeCurrentUser: (name: string, number: string | null) => void;
  toAddUser: (newName: string, newNumber: string | null) => void;
  toRemoveUser: (name: string, number: string | null) => void;
  // toShowChats: (name: string, number: string | null) => void;
}

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

const App: React.FC<appProps> = ({
  toRemoveUser,
  currentUser,
  allUsers,
  userName,
  toChangeCurrentUser,
  toAddUser,
}) => {
  // Router for Navigation
  const router = useRouter();

  // For Authentication
  const [accessToken, setAccessToken] = useState("");
  // const [recieved, setrecieved] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [socket, setSocket] = useState<Socket>();
  const [profileName, setProfileName] = useState(userName);

  const [currentUserMessageObject, setCurrentUserMessageObject] = useState<{
    user: string;
    phoneNumber: string | null;
    messages: any[];
  }>({ user: "Farmer Bot", phoneNumber: null, messages: [] });

  const initialState: {
    allMessages: {
      user: string;
      phoneNumber: string | null;
      messages: any[];
    }[];
    messages: any[];
    username: string;
    session: any;
  } = {
    allMessages: [{ user: "Farmer Bot", phoneNumber: null, messages: [] }],
    messages: [],
    username: "",
    session: {},
  };

  const [state, setState] = useState<{
    allMessages: {
      user: string;
      phoneNumber: string | null;
      messages: any[];
    }[];
    messages: any[];
    username: string;
    session: any;
  }>(initialState);

  const scrollToBottom: () => void = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  // useEffect(() => {
  //   setState(initialState);
  // }, [currentUser]);

  useEffect(() => {
    if (cookies["access_token"] !== undefined) {
      fetch(`http://localhost:3000/api/auth?token=${cookies["access_token"]}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === null) {
            throw "Invalid Access Token";
            // router.push("/login");
          }
        })
        .catch((err) => {
          throw err;
        });
      setAccessToken(cookies["access_token"]);
    } else {
      router.push("/login");
    }


// const usersList = JSON.parse(localStorage.getItem("AllUsers") || "");
    // const newAllMessages = usersList.map(
    //   (obj: { name: string; number: string | null; active: boolean }) => {
    //     return { user: obj.name, phoneNumber: obj.number, messages: [] };
    //   }
    // );
    // setState({
    //   ...state,
    //   allMessages: newAllMessages,
    // });
    try {
      const retrievedMessages: {
        user: string;
        phoneNumber: string | null;
        messages: any[];
      }[] = JSON.parse(localStorage.getItem("allMessages") || "") || [];
      if (retrievedMessages.length !== 0) {
        setState({
          ...state,
          allMessages: retrievedMessages,
        });
      }
    } catch (err) {
      console.log(err);
    }    
  }, []);

  useEffect(() => {
    setSocket(
      io("wss://ts.gpt3.samagra.io", {
        query: { deviceId: `phone:${localStorage.getItem("phoneNumber")}` },
      })
    );
    return () => {
console.log("unmount")
    }
  },[])
  
  useEffect(() => {    
    if (socket !== undefined) {    
        startWebsocketConnection(socket);     
    }
  }, [socket]);  

  useEffect(() => {
    if (router.query.state || cookies["access_token"] !== "") {
      registerOnMessageCallback(onMessageReceived);
      registerOnSessionCallback(onSessionCreated);
      scrollToBottom();
    } else {
      router.push("/login");
    }    
    return () => {
      console.log('unmounted')
    }
  }, [state])


  const onSessionCreated = (session: { session: any }): void => {
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: any): void => {
    // console.log('message: ', msg.content.msg_type);
    if (msg.content.msg_type === "IMAGE"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          time:
            (new Date().getHours() % 12 || 12) +
            ":" +
            (new Date().getMinutes() < 10 ? "0" : "") +
            new Date().getMinutes() +
            (new Date().getHours() > 12 ? " PM" : " AM"),
          date:
            (new Date().getDate() < 10 ? "0" : "") +
            new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1 < 10 ? "0" : "") +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
          image: msg.content.media_url,
          choices: msg.content.choices,
          caption: msg.content.caption,
        }),
      });
    }
    else if (msg.content.msg_type === "AUDIO"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          time:
            (new Date().getHours() % 12 || 12) +
            ":" +
            (new Date().getMinutes() < 10 ? "0" : "") +
            new Date().getMinutes() +
            (new Date().getHours() > 12 ? " PM" : " AM"),
          date:
            (new Date().getDate() < 10 ? "0" : "") +
            new Date().getDate() +
            "/" +
            ((new Date().getMonth()+1) < 10 ? "0" : "") +
            (new Date().getMonth()+1) +
            "/" +
            new Date().getFullYear(),
          audio: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "VIDEO"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          time:
            (new Date().getHours() % 12 || 12) +
            ":" +
            (new Date().getMinutes() < 10 ? "0" : "") +
            new Date().getMinutes() +
            (new Date().getHours() > 12 ? " PM" : " AM"),
          date:
            (new Date().getDate() < 10 ? "0" : "") +
            new Date().getDate() +
            "/" +
            ((new Date().getMonth()+1) < 10 ? "0" : "") +
            (new Date().getMonth()+1) +
            "/" +
            new Date().getFullYear(),
          video: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "DOCUMENT"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          time:
            (new Date().getHours() % 12 || 12) +
            ":" +
            (new Date().getMinutes() < 10 ? "0" : "") +
            new Date().getMinutes() +
            (new Date().getHours() > 12 ? " PM" : " AM"),
          date:
            (new Date().getDate() < 10 ? "0" : "") +
            new Date().getDate() +
            "/" +
            ((new Date().getMonth()+1) < 10 ? "0" : "") +
            (new Date().getMonth()+1) +
            "/" +
            new Date().getFullYear(),
          doc: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "TEXT"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: currentUser.name,
          text: msg.content.title,
          time:
            (new Date().getHours() % 12 || 12) +
            ":" +
            (new Date().getMinutes() < 10 ? "0" : "") +
            new Date().getMinutes() +
            (new Date().getHours() > 12 ? " PM" : " AM"),
          date:
            (new Date().getDate() < 10 ? "0" : "") +
            new Date().getDate() +
            "/" +
            ((new Date().getMonth()+1) < 10 ? "0" : "") +
            (new Date().getMonth()+1) +
            "/" +
            new Date().getFullYear(),
          choices: msg.content.choices,
        }),
      });
    }

    const newMessageList = [
      ...currentUserMessageObject.messages,
      {
        username: currentUser.name,
        text: msg.content.title,
        time:
          (new Date().getHours() % 12 || 12) +
          ":" +
          (new Date().getMinutes() < 10 ? "0" : "") +
          new Date().getMinutes() +
          (new Date().getHours() > 12 ? " PM" : " AM"),
        date:
          (new Date().getDate() < 10 ? "0" : "") +
          new Date().getDate() +
          "/" +
          ((new Date().getMonth()+1) < 10 ? "0" : "") +
          (new Date().getMonth()+1) +
          "/" +
          new Date().getFullYear(),
        choices: msg.content.choices,
      },
    ];
    const newCurrentMessageObj = {
      user: currentUserMessageObject.user,
      phoneNumber: currentUserMessageObject.phoneNumber,
      messages: newMessageList,
    };
    const oldAllMessages = [...state.allMessages];

    const newAllMessages = oldAllMessages.filter((object) => {
      return (
        object.user !== currentUserMessageObject.user &&
        object.phoneNumber !== currentUserMessageObject.phoneNumber
      );
    });
    // setrecieved(true);
    newAllMessages.push(newCurrentMessageObj);
    localStorage.setItem("allMessages", JSON.stringify(newAllMessages));

    setCurrentUserMessageObject(newCurrentMessageObj);
    setState({
      ...state,
      allMessages: newAllMessages
    })

    // if (msg.from.split(":")[1] === currentUser.number) {
    //   setState({
    //     ...state,
    //     messages: state.messages.concat({
    //       username: currentUser.name,
    //       text: msg.content.title,
    //       choices: msg.content.choices,
    //     }),
    //   });
    // } else if (currentUser.number === null) {
    //   setState({
    //     ...state,
    //     messages: state.messages.concat({
    //       username: currentUser.name,
    //       text: msg.content.title,
    //       choices: msg.content.choices,
    //     }),
    //   });
    // }
  };

  const onAddingUser = (name: string, phoneNumber: string | null) => {
    const newMessageObject = {
      user: name,
      phoneNumber: phoneNumber,
      messages: [],
    };
    setState({
      ...state,
      allMessages: state.allMessages.concat(newMessageObject),
    });
    toAddUser(name, phoneNumber);
  };

  const onChangingCurrentUser = (name: string, phoneNumber: string | null) => {

    if (name === currentUser.name && phoneNumber === currentUser.number) {
      return;
    }
    // To Save the currentMessageObject in allMessages

    // const oldAllMessages = [...state.allMessages];

    // const newAllMessages = oldAllMessages.filter((object) => {
    //   return (
    //     object.user !== currentUserMessageObject.user &&
    //     object.phoneNumber !== currentUserMessageObject.phoneNumber
    //   );
    // });

    // newAllMessages.push(currentUserMessageObject);
    // setState({
    //   ...state,
    //   allMessages: newAllMessages,
    // });

    // To Change the currentMessageObject
    const newCurrentMessageObject = state.allMessages.find((obj, index) => {
      return obj.user === name && obj.phoneNumber === phoneNumber;
    });
    if (newCurrentMessageObject !== undefined) {
      setCurrentUserMessageObject(newCurrentMessageObject);
    } else {
      throw "userMessageObject Not Found!";
      // setCurrentUserMessageObject({
      //   user: "test",
      //   phoneNumber: null,
      //   messages: [],
      // });
    }

    toChangeCurrentUser(name, phoneNumber);
  };

  const onClearingChat = () => {

    const newCurrentMessageObj = {
      user: currentUserMessageObject.user,
      phoneNumber: currentUserMessageObject.phoneNumber,
      messages: [],
    };

    const oldAllMessages = [...state.allMessages];

      const newAllMessages = oldAllMessages.filter((object) => {
        return (
          object.user !== currentUserMessageObject.user &&
          object.phoneNumber !== currentUserMessageObject.phoneNumber
        );
      });


      newAllMessages.push(newCurrentMessageObj);
      localStorage.setItem("allMessages", JSON.stringify(newAllMessages));
      setCurrentUserMessageObject(newCurrentMessageObj);
      setState({
        ...state,
        allMessages: newAllMessages
      })
  }

  const setUserName = (name: string): void => {
    setState({
      ...state,
      username: name,
    });
  };

 const sendMessage = (text: string, media: any): void => {
    if (!accessToken) {
      router.push("/login");
    } else {
      // send(text, state.session, accessToken, currentUser, socket,null);
      if(media){  
        if (media.mimeType.slice(0,5) === "image"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              image: media.url,
              time:
                (new Date().getHours() % 12 || 12) +
                ":" +
                (new Date().getMinutes() < 10 ? "0" : "") +
                new Date().getMinutes() +
                (new Date().getHours() > 12 ? " PM" : " AM"),
              date:
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate() +
                "/" +
                ((new Date().getMonth()+1) < 10 ? "0" : "") +
                (new Date().getMonth()+1) +
                "/" +
                new Date().getFullYear(),
            }),
          });
        }
        else if (media.mimeType.slice(0,5) === "audio"){          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              audio: media.url,
              time:
                (new Date().getHours() % 12 || 12) +
                ":" +
                (new Date().getMinutes() < 10 ? "0" : "") +
                new Date().getMinutes() +
                (new Date().getHours() > 12 ? " PM" : " AM"),
              date:
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate() +
                "/" +
                ((new Date().getMonth()+1) < 10 ? "0" : "") +
                (new Date().getMonth()+1) +
                "/" +
                new Date().getFullYear(),
            }),
          });
        }
        else if (media.mimeType.slice(0,5) === "video"){
         setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              video: media.url,
              time:
                (new Date().getHours() % 12 || 12) +
                ":" +
                (new Date().getMinutes() < 10 ? "0" : "") +
                new Date().getMinutes() +
                (new Date().getHours() > 12 ? " PM" : " AM"),
              date:
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate() +
                "/" +
                ((new Date().getMonth()+1) < 10 ? "0" : "") +
                (new Date().getMonth()+1) +
                "/" +
                new Date().getFullYear(),
            }),
          });
        }
        else if (media.mimeType.slice(0,11) === "application"){
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              doc: media.url,
              time:
                (new Date().getHours() % 12 || 12) +
                ":" +
                (new Date().getMinutes() < 10 ? "0" : "") +
                new Date().getMinutes() +
                (new Date().getHours() > 12 ? " PM" : " AM"),
              date:
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate() +
                "/" +
                ((new Date().getMonth()+1) < 10 ? "0" : "") +
                (new Date().getMonth()+1) +
                "/" +
                new Date().getFullYear(),
            }),
          });
        }else{
          setState({
            ...state,
            messages: state.messages.concat({
              username: state.username,
              text: text,
              doc: media.url,
              time:
                (new Date().getHours() % 12 || 12) +
                ":" +
                (new Date().getMinutes() < 10 ? "0" : "") +
                new Date().getMinutes() +
                (new Date().getHours() > 12 ? " PM" : " AM"),
              date:
                (new Date().getDate() < 10 ? "0" : "") +
                new Date().getDate() +
                "/" +
                ((new Date().getMonth()+1) < 10 ? "0" : "") +
                (new Date().getMonth()+1) +
                "/" +
                new Date().getFullYear(),
            }),
          });
        }
      }
      else{
        const newMessage = [
          ...currentUserMessageObject.messages,
          {
            username: state.username,
            text: text,
            time:
              (new Date().getHours() % 12 || 12) +
              ":" +
              (new Date().getMinutes() < 10 ? "0" : "") +
              new Date().getMinutes() +
              (new Date().getHours() > 12 ? " PM" : " AM"),
            date:
              (new Date().getDate() < 10 ? "0" : "") +
              new Date().getDate() +
              "/" +
              ((new Date().getMonth()+1) < 10 ? "0" : "") +
              (new Date().getMonth()+1) +
              "/" +
              new Date().getFullYear(),
          },
        ];
  
        const newCurrentMessageObj = {
          user: currentUserMessageObject.user,
          phoneNumber: currentUserMessageObject.phoneNumber,
          messages: newMessage,
        };
  
        const oldAllMessages = [...state.allMessages];
  
        const newAllMessages = oldAllMessages.filter((object) => {
          return (
            object.user !== currentUserMessageObject.user &&
            object.phoneNumber !== currentUserMessageObject.phoneNumber
          );
        });

        newAllMessages.push(newCurrentMessageObj);
        localStorage.setItem("allMessages", JSON.stringify(newAllMessages));
  
        // setrecieved(false);
        send(text, state.session, accessToken, currentUser, socket , null);
  
        console.log("this is")
        console.log(newCurrentMessageObj)
        setCurrentUserMessageObject(newCurrentMessageObj);
        setState({
          ...state,
          allMessages: newAllMessages
        })
        // setState({
        //   ...state,
        //   messages: state.messages.concat({
        //     username: state.username,
        //     text: text,
        //   }),
        // });

      }
    }
  };

  const sendLocation = (location: any): void => {
    send(location,state.session, accessToken, currentUser, socket,null);
    // navigator.geolocation.getCurrentPosition((position: any) => {
    //   setState({
    //     ...state,
    //     messages: state.messages.concat({
    //       username: state.username,
    //       location: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       }
    //     }),
    //   });
    // })
  };

  if (state.username === null) {
    console.log("Please set a username first");
    return (
      <div className="container">
        <div className="container-title">Enter username</div>
        <TextBar onSend={setUserName} onSendLocation={sendLocation} />
      </div>
    );

  }

  const selected = (option: {
    key: string;
    text: string;
    backmenu: boolean;
  }): void => {
    const toSend = option.key + " " + option.text;
    sendMessage(toSend,null);
  };

  const sizeVar = useWindowSize();
  if (sizeVar.width < 768) {
    return (
      <PhoneView
      currentMessageObj={currentUserMessageObject}
      toClearChat={onClearingChat}
        messages={state.messages}
        // recieved={recieved}
        username={state.username}
        selected={selected}
        sendMessageFunc={sendMessage}
        allUsers={allUsers}
        toChangeCurrentUser={onChangingCurrentUser}
        currentUser={currentUser}
        addingNewUser={onAddingUser}
        toRemoveUser={toRemoveUser}
        onSendLocation={sendLocation} 
        toShowChats={{
          name: "",
          number: null,
        }}
      />
    );
  } else {
    return (
      <WebView
        currentMessageObj={currentUserMessageObject}
        toClearChat={onClearingChat}
        messages={state.messages}
        // recieved={recieved}
        username={state.username}
        selected={selected}
        sendMessageFunc={sendMessage}
        allUsers={allUsers}
        toChangeCurrentUser={onChangingCurrentUser}
        currentUser={currentUser}
        addingNewUser={onAddingUser}
        toRemoveUser={toRemoveUser}
        onSendLocation={sendLocation}
      />
    );
  }
};

export default App;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize

      // Set window width/height to state

      // Add event listener
      window.addEventListener("resize", () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });

      // Call handler right away so state gets updated with initial window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Remove event listener on cleanup
      return () =>
        window.removeEventListener("resize", () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
