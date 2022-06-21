import { useRef, useEffect } from "react";
import "./index.css";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Message = ({
  text,
  username,
  self,
  choices,
  data,
  image,
  caption,
  audio,
  video,
  doc
}: {
  text: any;
  username: string;
  self: boolean;
  choices: any;
  data: any;
  image: any;
  caption: string;
  audio: any;
  video: any;
  doc: any;
}) => {
  return (
    <Flex>
      {self === true && (
        <>
          <Spacer />
          <div className="chat-message chat-reciever">
            <div className="message-username">{username}</div>
              {(!image && !audio && !video && !doc) && 
                <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
              }
              {image &&
                <div style={{ whiteSpace: "pre-wrap" }}><img src={image} style={{maxWidth: "300px"}}/></div>
              } 
              {audio &&
                <audio controls>
                  <source src={audio}/>
                  Your browser does not support the audio element.
                </audio>
              }
              {video &&
                <video width="320" height="240" controls>
                  <source src={video}/>
                  Your browser does not support the video tag.
              </video>
              } 
              {doc &&
                <Button colorScheme='blackAlpha' padding="10px" marginTop='10px'>
                  <Link href={doc} isExternal>
                    Click to open this file <ExternalLinkIcon mx='2px' />
                  </Link>
                </Button>
              } 
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
              <div className="message-username">{username}</div>
              {(!image && !audio && !video && !doc) && 
                <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
              }
              {image &&
                <div style={{ whiteSpace: "pre-wrap" }}><img src={image} style={{maxWidth: "300px"}}/></div>
              } 
              {audio &&
                <audio controls>
                  <source src={audio}/>
                  Your browser does not support the audio element.
                </audio>
              }
              {video &&
                <video width="320" height="240" controls>
                  <source src={video} />
                  Your browser does not support the video tag.
              </video>
              } 
              {doc &&
                <Button colorScheme='blackAlpha' padding="10px" marginTop='10px'>
                  <Link href={doc} isExternal>
                    Click to open this file <ExternalLinkIcon mx='2px' />
                  </Link>
                </Button>
              } 
              <div style={{ whiteSpace: "pre-wrap" }}>{caption}</div>
            </div>
            {choices && choices.length > 0 && (
              <div className="chat-choices-container">
                {choices.map((choice: any) => (
                  <Button className="chat-choices" onClick={() => data(choice)}>{choice.key}{" "}{choice.text}</Button>
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
  useEffect(() => {
    messageWindow = messageWindow.current;
    messageWindow.scrollTop =
      messageWindow.scrollHeight - messageWindow.clientHeight;
  }, [messageWindow]);

  const username: string = props.username;
  const messages: any = props.messages || [];
  console.log({ username, messages});
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
