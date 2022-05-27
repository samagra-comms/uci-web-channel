import { useState, useEffect } from "react";
import { Box, ChakraProvider, Grid, VStack, theme } from "@chakra-ui/react";
import {
  registerOnMessageCallback,
  registerOnSessionCallback,
  send,
} from "websocket";
import ColorModeSwitcher from "components/ColorModeSwitcher";
import MessageWindow from "components/MessageWindow";
import TextBar from "components/TextBar";
import Notification from "components/Notifications";
import "styles/global.css";

const App = (props:any): any => {
  const initialState: {
    messages: any[];
    username: string;
    session: any;
    media: any;
  } = {
    messages: [],
    username: "chaks",
    session: {},
    media: null
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
    if (msg.content.msg_type === "IMAGE"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: "UCI",
          text: msg.content.title,
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
          username: "UCI",
          text: msg.content.title,
          audio: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "VIDEO"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: "UCI",
          text: msg.content.title,
          video: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else if (msg.content.msg_type === "DOCUMENT"){
      setState({
        ...state,
        messages: state.messages.concat({
          username: "UCI",
          text: msg.content.title,
          doc: msg.content.media_url,
          choices: msg.content.choices,
        }),
      });
    }
    else{
      setState({
        ...state,
        messages: state.messages.concat({
          username: "UCI",
          text: msg.content.title,
          choices: msg.content.choices,
        }),
      });
    }
  };

  const setUserName = (name: string) => {
    setState({
      ...state,
      username: name,
    });
  };

  const sendMessage = (text: any) => {
    // console.log('testing messages');
    // console.log(state.messages)
    // if(state.messages.at(-1).image){
    //   console.log('this is Image')
    // }
    // else{
    //   console.log('not image')
    // }
    // console.log('testing done')
    send(text, state.session, state.media);
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
      <div className="chat-header">
        <div className="chat__header--info">
          <h3>Chakshu Gautam</h3>
        </div>
        <div className="chat__header--right">
          <Notification />
        </div>
      </div>
      <div className="chat-body-container">
        <div className="chat-body">         
          <MessageWindow messages={state.messages} username={state.username} selected={selected}/>          
        </div>
        <TextBar onSend={sendMessage} session={state.session}/>
      </div>
    </>
  );
};

export default App;