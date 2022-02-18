import * as React from "react"

import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Link,
  Text,
  VStack,
  theme,
} from "@chakra-ui/react"
import { registerOnMessageCallback, registerOnSessionCallback, send } from './websocket'

import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import MessageWindow from "./MessageWindow"
import TextBar from "./TextBar"

export class App extends React.Component {
  state: {
    messages: any[],
    username: string,
    session: any,
  } = {
    messages: [],
    username: "chaks",
    session: {},
  }

  send = send;

  constructor (props: any) {
    super(props)
    registerOnMessageCallback(this.onMessageReceived.bind(this))
    registerOnSessionCallback(this.onSessionCreated.bind(this))
    this.send.bind(send);
  }

  onSessionCreated(session: any) {
    this.setState({session: session});
  }

  onMessageReceived (msg: any) {
    let message = msg.content.title;
    if(msg.content.choices && msg.content.choices.length > 0) {
      for(let i=0; i<msg.content.choices.length; i++){
        message = message + "\n" + msg.content.choices[i].key + ". " + msg.content.choices[i].text;
      }
    }
    this.setState({
      messages: this.state.messages.concat({username: "UCI", text: message})
    })
  }

  setUserName (name: string) {
    this.setState({
      username: name
    })
  }

  sendMessage (text: any) {
    send(text, this.state.session)
    this.setState({
      messages: this.state.messages.concat({username: this.state.username, text: text})
    })
  }
  
  render () {
    const setUserName = this.setUserName.bind(this);
    const sendMessage = this.sendMessage.bind(this);

    if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter username</div>
          <TextBar onSend={setUserName} />
        </div>
      )
    }
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
            <div className='container'>
              <div className='container-title'>Messages</div>
              <MessageWindow messages={this.state.messages} username={this.state.username} />
              <TextBar onSend={sendMessage} />
            </div>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>);
  }
}
