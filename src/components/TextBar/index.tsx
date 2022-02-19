import { Box, Button, Input } from "@chakra-ui/react";
import React, { Component } from "react";

import { MdSend } from "react-icons/md";

export default class TextBar extends Component {
  props: any;
  input: any;
  constructor(props: any) {
    super(props);
    this.props = props;
    this.input = React.createRef();
  }
  sendMessage() {
    this.props.onSend && this.props.onSend(this.input.current.value);
    this.input.current.value = "";
  }
  sendMessageIfEnter(e: any) {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }
  render() {
    const sendMessage = this.sendMessage.bind(this);
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this);

    return (
      <Box bg="transparent" w="100%" p={4} color="white">
        <Input
          w="80%"
          placeholder="Type your message"
          ref={this.input}
          onKeyDown={sendMessageIfEnter}
        />
        <Button
          leftIcon={<MdSend />}
          colorScheme="pink"
          variant="solid"
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    );
  }
}
