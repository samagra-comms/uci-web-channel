import React from "react";
import "./index.css";
import { Box, Flex, Spacer } from "@chakra-ui/react";

const Message = ({
  text,
  username,
  self,
}: {
  text: any;
  username: string;
  self: boolean;
}) => {
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <Box bg="green.600" w="80%">
            <div className="message-username">{username}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
          </Box>
        </>
      )}
      {!self === true && (
        <>
          <Box bg="gray.600" w="80%">
            <div className="message-username">{username}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
          </Box>
          <Spacer />
        </>
      )}
    </Flex>
  );
};

export default class MessageWindow extends React.Component {
  messageWindow: any;
  props: any;
  constructor(props: any) {
    super(props);
    this.props = props;
    this.messageWindow = React.createRef();
  }
  componentDidUpdate() {
    const messageWindow = this.messageWindow.current;
    messageWindow.scrollTop =
      messageWindow.scrollHeight - messageWindow.clientHeight;
  }
  render() {
    const username: string = this.props.username;
    const messages: any = this.props.messages || [];
    console.log({ username, messages });
    return (
      <Box ref={this.messageWindow}>
        {messages.length > 0 &&
          messages.map((msg: any, i: number) => {
            return (
              <Message
                key={i}
                text={msg.text}
                username={msg.username}
                self={username === msg.username}
              />
            );
          })}
        <div>&nbsp;</div>
      </Box>
    );
  }
}
