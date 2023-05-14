import { useRef, useEffect, MutableRefObject, useState, useCallback } from "react";
import styles from "./index.module.css";
import { Text, Box, Flex, Spacer, Button, useColorModeValue } from "@chakra-ui/react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface messageProps {
  text: any,
  username: string,
  self: boolean,
  choices: {key: string, text: string, backmenu: boolean}[],
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
  choices: {key: string, text: string, backmenu: boolean}[];
  data: (option: {key: string, text: string, backmenu: boolean}) => void;
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
                {choices.map((choice: {key: string, text: string, backmenu: boolean}) => (
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
  selected: (option: {key: string, text: string, backmenu: boolean}) => void ,
  messages: messageProps[],
  username: string
}

const MessageWindow: React.FC<messageWindowProps> = (props) => {
  const bg = useColorModeValue("#06d755", "#202C33");

  const username: string = props.username;
  const messages: any = props.messages || [];
  let messageWindow = useRef<HTMLDivElement>(null);
  let scrollRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }
    );
    observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(()=>{
    scrollBottom();
  },[])

  useEffect(()=>{
    scrollBottom();
  },[messages])

  const viewBottom=()=>{
    scrollBottom();
  }

  const scrollBottom=()=>{
    if (scrollRef.current)
    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }

  useEffect(() => {
    if (messageWindow.current !== null) {
      messageWindow.current.scrollTop = 
      messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
    }
  }, [messageWindow]);

  
  // console.log({ username, messages});
  return (
    <Box mt={20} ref={messageWindow} pos="relative">
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
        {!isIntersecting &&
        <Button
            bgColor={bg}
            // color={faIcon}
            pos="sticky"
            bottom="0"
            w="40px"
            h="40px"
            borderRadius="50%"
            boxShadow="0px 0px 2px 0px #0000005e"
            border="none"
            className="send__btn"
            onClick={viewBottom}
            
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
          }
      
      <div>&nbsp;</div>

      <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
    </Box>
  );
};

export default MessageWindow;
