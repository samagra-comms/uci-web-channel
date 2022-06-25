import { useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";

const Message = ({
  text,
  username,
  self,
  choices,
  data,
}: {
  text: any;
  username: string;
  self: boolean;
  choices: any;
  data: any;
}) => {
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <div className="chat-message chat-reciever">
            <div className={styles.message_username}>{username}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
          </div>
        </>
      )}
      {!self === true && (
        <>
          <div>
            <div
              className={
                text === "Invalid Input!!! Please try again."
                  ? "chat-error-message"
                  : "chat-message"
              }
            >
              <div className={styles.message_username}>{username}</div>
              <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
            </div>
            {choices && choices.length > 0 && (
              <div className="chat-choices-container">
                {choices.map((choice: any) => (
                  <Button
                    className="chat-choices"
                    key={choice.key}
                    onClick={() => data(choice)}
                  >
                    {choice.key} {choice.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <Spacer />
        </>
      )}
    </Flex>
  );
};

const MessageWindow = (props: any) => {
  let messageWindow: any = useRef(null);

  // { current: null }
  useEffect(() => {
    // messageWindow = messageWindow.current;
    messageWindow.current.scrollTop =
      messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.messages || [];
  console.log({ username, messages });
  return (
    <Box ref={messageWindow}>
      {messages.length > 0 &&
        messages.map((msg: any, i: number) => {
          return (
            <Message
              key={i}
              text={msg.text}
              username={msg.username}
              self={username === msg.username}
              choices={msg.choices}
              data={props.selected}
            />
          );
        })}
      <div>&nbsp;</div>
    </Box>
  );
};

export default MessageWindow;
