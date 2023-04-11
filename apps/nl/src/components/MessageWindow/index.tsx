import { useRef, useEffect, MutableRefObject } from "react";
import styles from "./index.module.css";
import {
  Text,
  Box,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Loading } from "@nextui-org/react";

interface messageProps {
  text: any;
  username: string;
  self: boolean;
  choices: { key: string; text: string; backmenu: boolean }[];
  data: any;
  location: any;
  image: any;
  caption: string;
  audio: any;
  video: any;
  doc: any;
}

const Message: React.FC<messageProps> = ({
  text,
  username,
  self,
  choices,
  data,
  location,
  image,
  caption,
  audio,
  video,
  doc,
}: {
  text: any;
  username: string;
  self: boolean;
  choices: { key: string; text: string; backmenu: boolean }[];
  data: (option: { key: string; text: string; backmenu: boolean }) => void;
  location: any;
  image: any;
  caption: string;
  audio: any;
  video: any;
  doc: any;
}) => {
  // Theme toggle Settings
  const recievedMessageColor = useColorModeValue("white", "var(--darkgrey)");
  const text_color = useColorModeValue("black", "white");
  const messageBodyToggle = useColorModeValue(
    styles.lightModeMessage,
    styles.darkModeMessage
  );

  useEffect(() => {
    console.log('Self:', self);
    let div = document.getElementsByClassName('loader');
    if (self) {
      div[div.length-1]?.classList.remove('hidden');
      div[div.length-1]?.classList.add('flex');
    } else {
      div[div.length-1]?.classList.add('hidden');
      div[div.length-1]?.classList.remove('flex');
    }
  }, [self]);

  // ------------
  return (
    <Flex>
      {self === true && (
        <>
          <div className='loader hidden' style={{marginLeft: '3vw', alignItems: 'flex-end'}}><Loading color='white' size="xl" type="points"/></div>
          <Spacer />
          <Box
            className={`${styles.myMessage} ${
              styles.message
            } ${messageBodyToggle} ${
              text.split(" ").length > 5
                ? styles.bigMessage
                : styles.smallMessage
            }`}
          >
            <Box className={styles.message_username}>
              <Text fontSize="md" fontWeight="bold">
                {username}
              </Text>
            </Box>
            {!image && !audio && !video && !doc && !location && (
              <div className="messages" style={{ whiteSpace: "pre-wrap" }}>
                {text}
              </div>
            )}
            {location && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                <a
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                  target="blank"
                  style={{ color: "White" }}
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                  />
                </a>
              </div>
            )}
            {image && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                <img src={image} style={{ maxWidth: "300px" }} />
              </div>
            )}
            {audio && (
              <audio controls>
                <source src={audio} />
                Your browser does not support the audio element.
              </audio>
            )}
            {video && (
              <video width="320" height="240" controls>
                <source src={video} />
                Your browser does not support the video tag.
              </video>
            )}
            {doc && (
              <Button colorScheme="blackAlpha" padding="10px" marginTop="10px">
                <Link href={doc} isExternal>
                  Click to open this file <ExternalLinkIcon mx="2px" />
                </Link>
              </Button>
            )}
          </Box>
        </>
      )}
      {!self === true && (
        <>
          <div>
            <Box
              bgColor={
                text === "Invalid Input!!! Please try again."
                  ? "var(--red)"
                  : recievedMessageColor
              }
              borderColor="white"
              className={
                text === "Invalid Input!!! Please try again."
                  ? `${styles.message} ${styles.errorMessage} ${
                      text.split(" ").length > 5
                        ? styles.bigMessage
                        : styles.smallMessage
                    }`
                  : `${styles.message} ${
                      styles.recievedMessage
                    } ${recievedMessageColor} ${
                      text.split(" ").length > 5
                        ? styles.bigMessage
                        : styles.smallMessage
                    }`
              }
            >
              {/* <Box className={styles.message_username}>
                <Text fontSize="md" fontWeight="bold">
                  {username}
                </Text>
              </Box> */}
              {!image &&
                !audio &&
                !video &&
                !doc &&
                !location &&
                text.substring(0, 5) !== "https" && (
                  <div
                    className="recievedMessage"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {text}
                  </div>
                  //<iframe src={text}></iframe>
                )}
              {!image &&
                !audio &&
                !video &&
                !doc &&
                !location &&
                text.substring(0, 5) === "https" && (
                  // <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
                  <iframe src={text}></iframe>
                )}
              {image && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <img src={image} style={{ maxWidth: "300px" }} />
                </div>
              )}
              {audio && (
                <audio controls>
                  <source src={audio} />
                  Your browser does not support the audio element.
                </audio>
              )}
              {location && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <a
                    href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                    target="blank"
                    style={{ color: "White" }}
                  >
                    <iframe
                      src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}+&output=embed`}
                    />
                  </a>
                </div>
              )}
              {video && (
                <video width="320" height="240" controls>
                  <source src={video} />
                  Your browser does not support the video tag.
                </video>
              )}
              {doc && (
                <Button
                  colorScheme="blackAlpha"
                  padding="10px"
                  marginTop="10px"
                >
                  <Link href={doc} isExternal>
                    Click to open this file <ExternalLinkIcon mx="2px" />
                  </Link>
                </Button>
              )}
              <div style={{ whiteSpace: "pre-wrap" }}>{caption}</div>
            </Box>
            {choices && choices.length > 0 && (
              <Box className={styles.chatChoices_container}>
                {choices.map((choice: any) => (
                  <Button
                    borderColor="white"
                    backgroundColor={recievedMessageColor}
                    className={styles.chatChoices}
                    key={choice.key}
                    onClick={() => data(choice.key)}
                  >
                    {choice.key} {choice.text}
                  </Button>
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
  currentMessageObj: {
    user: string;
    phoneNumber: string | null;
    messages: any[];
  };
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  messages: messageProps[];
  username: string;
}

const MessageWindow: React.FC<messageWindowProps> = (props) => {
  let messageWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageWindow.current !== null) {
      messageWindow.current.scrollTop =
        messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
    }
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.currentMessageObj.messages || [];
  console.log({ username, messages });
  return (
    <Box mt={4} ref={messageWindow} className={`${styles.messagesContainer}`}>
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
              location={msg.location}
              image={msg.image}
              caption={msg.caption}
              audio={msg.audio}
              video={msg.video}
              doc={msg.doc}
            />
          );
        })}
      <div>&nbsp;</div>
    </Box>
  );
};

export default MessageWindow;
