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

const App = (): any => {
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

  useEffect((): void => {
    registerOnMessageCallback(onMessageReceived);
    registerOnSessionCallback(onSessionCreated);
  }, [state]);

  const onSessionCreated = (session: any) => {
    console.log({ session });
    setState({
      ...state,
      session: session,
    });
  };

  const onMessageReceived = (msg: any) => {
    let message = msg.content.title;
    if (msg.content.choices && msg.content.choices.length > 0) {
      for (let i = 0; i < msg.content.choices.length; i++) {
        message =
          message +
          "\n" +
          msg.content.choices[i].key +
          ". " +
          msg.content.choices[i].text;
      }
      console.log(msg.content.choices);
    }
    setState({
      ...state,
      messages: state.messages.concat({ username: "UCI", text: message }),
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
  return (
    <ChakraProvider theme={theme}>
      <Notification />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Box w="100%">
              <MessageWindow
                messages={state.messages}
                username={state.username}
              />
              <TextBar onSend={sendMessage} />
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
