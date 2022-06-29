import { useState, useEffect } from 'react';
import {
    registerOnMessageCallback,
    registerOnSessionCallback,
    send,
  } from "./websocket";
import MessageWindow from "./MessageWindow";
import TextBar from "./TextBar";
import { useColorModeValue, Box } from "@chakra-ui/react";

import Notification from "./Notifications";

import ColorModeSwitcher from "./ColorModeSwitcher";

const App = (): any => {

  // Chakra Theme Toggle Information
  const bg = useColorModeValue("#06d755","#202C33");
  const textColor = useColorModeValue("#202C33","#fff");
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
      const toSend = option.key+" "+option.text;
      sendMessage(toSend);
    }
  
    return (
      <>
        <Box bgColor={bg} className="chat-header">
        <Box color={textColor} className="chat__header--info">
          <h1>Chakshu Gautam</h1>
        </Box>
        <div className="chat__header--right">
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
    );
  };


export default App;