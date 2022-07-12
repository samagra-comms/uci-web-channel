import { useRef, useEffect, MutableRefObject } from "react";
import styles from "./index.module.css";
import { Text, Box, Flex, Spacer, Button, useColorModeValue } from "@chakra-ui/react";

interface messageProps {
  text: any,
  username: string,
  self: boolean,
  choices: any,
  data: any
}

const Message: React.FC<messageProps> = ({
  text,
  username,
  self,
  choices,
  data
}: {
  text: any;
  username: string;
  self: boolean;
  choices: any;
  data: any;
}) => {
  // Theme toggle Settings
  const box_color = useColorModeValue("#06d755","#202C33");
  const text_color = useColorModeValue("#000","#fff");
  // ------------
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <Box borderColor="white" color={text_color} bgColor={box_color} className="chat-message chat-reciever">
            <Box  className={styles.message_username}><Text fontSize='md' fontWeight='bold'>{username}</Text></Box>
            <Box style={{ whiteSpace: "pre-wrap" }}>{text}</Box>
          </Box>
        </>
      )}
      {!self === true && (
        <>
          <div>
          <Box
              bgColor={box_color}
              color={text_color}
              borderColor="white"
              className={
                text === "Invalid Input!!! Please try again."
                ? "chat-error-message"
                : "chat-message"
              }
              >
              <Box className={styles.message_username}><Text fontSize='md' fontWeight='bold'>{username}</Text></Box>
              <Box fontWeight="thin" style={{ whiteSpace: "pre-wrap" }}>{text}</Box>
            </Box>
            {choices && choices.length > 0 && (
              <Box className="chat-choices-container">
                {choices.map((choice: any) => (
                  <Button borderColor="white" className="chat-choices" key={choice.key} onClick={() => data(choice)}>{choice.key}{" "}{choice.text}</Button>
                  ))}
              </Box>
            )}
          </div>
          <Spacer />
        </>
      )}
    </Flex>
  );
};

interface messageWindowProps {
  selected: (option: any) => void ,
  messages: messageProps[],
  username: string
}

const MessageWindow: React.FC<messageWindowProps> = (props) => {
  let messageWindow: MutableRefObject<any> = useRef(null);

  // { current: null }
  useEffect(() => {
    // messageWindow = messageWindow.current;
    messageWindow.current.scrollTop = 
      messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.messages || [];
  console.log({ username, messages});
  return (
    <Box mt={20} ref={messageWindow}>
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
