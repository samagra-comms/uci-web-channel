import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  calc,
  ChakraComponent,
  InputRightAddon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  background,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPaperPlane,
  faLocationDot,
  faPaperclip,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import {IoMdSend} from 'react-icons/io';
import {
  Input,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ButtonGroup } from "react-bootstrap";

interface textBarProps {
  onSend: (name: string, media: any) => void;
  onSendLocation: (location: string) => void;
}

const TextBar: React.FC<textBarProps> = (props) => {
  // Toggle Settings
  const inputColorToggle = useColorModeValue(styles.lightInput,styles.darkInput)
  const attachmentColorToggle = useColorModeValue(styles.lightAttach,styles.darkAttach)
  const backgroundColorToggle = useColorModeValue("white","var(--tertiarydarkblue)")
  const SubmitColorToggle = useColorModeValue(styles.lightModeSubmitButton,styles.darkModeSubmitButton)
  // ---------------

  const [location, setLocation] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(
      //   (position: any) => {
      //     const lat = position.coords.latitude;
      //     const long = position.coords.longitude;
      //     setLocation(`https://www.google.com/maps?q=${lat},${long}+&output=embed`);
      //     //props?.onSend && props.onSend(url());
      //   }
      // );
    }
    else{
      toast.error("Geolocation is not supported by this browser.");
    }
  },[])
  const send_btn = useRef<HTMLButtonElement | null>(null);
  const input: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  const sendMessage: React.MouseEventHandler = (
    event: React.MouseEvent
  ): void => {
    event.preventDefault();
    const message: string | undefined = input.current?.value;
    if (input.current?.value.trim().length === 0) {
      toast.error("Please enter a valid message");
    } else if (message!.length > 0) {
      props?.onSend && props.onSend(input.current!.value,null);
    }
    input.current!.value = "";
  };

  const sendMessageIfEnter: React.KeyboardEventHandler = (
    event: React.KeyboardEvent
  ) => {
    if (event.key === "Enter") {
	      event.preventDefault();
      if (input.current!.value.length > 0) {
        console.log(send_btn.current?.click());
      }
    }
  };

  const sendLocation = (e: any) => {
    e.preventDefault();
    props?.onSendLocation && props.onSendLocation(location);
  };

  const uploadMedia = async (fileObj: any) => {
    const data = new FormData();
    data.append('file',fileObj);
    try{
        let res = await fetch(
        `http://143.110.255.220:8080/cdn/minioSignedUrl`,
        {
            method: 'post',
            body: data,
        }
        );
        let responseJson = await res.json();
        if (res.status === 200) {
            props.onSend(" ", responseJson);
        }else{      
            console.log('image not uploaded')
        }
    }
    catch{
        console.error('no response received');
    }    
  };

  return (
    <>
      <ToastContainer />
      <Box className={styles.container}>
        <form className={styles.sendMessage_form}>
        {/* <Popover>
          <PopoverTrigger>
            <button type="button" className={`${styles.add_button} ${attachmentColorToggle}`}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </PopoverTrigger>
          <PopoverContent marginLeft="5px" width="50px" border="none" alignContent="center" alignItems="center" backgroundColor={backgroundColorToggle} paddingLeft="5px">
            <Button size="md" style={{margin: "15px 5px 0 0", backgroundColor:"var(--red)", borderRadius:"50%"}} onClick={sendLocation}>
              <FontAwesomeIcon color="white" icon={faLocationDot} />
            </Button>
            <div className="file btn btn-primary" 
                      style={
                        { position: "relative", 
                          overflow: "hidden", 
                          marginRight: '7px', 
                          paddingTop: '5px',
                          margin: "19px 5px 5px 0",
                          backgroundColor:"var(--blue)",
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                        }}>
                          <div style={{
                            margin: "5px 0 0 17px",
                          }}>
                            <FontAwesomeIcon color="white" icon={faFile} />
                          </div>
                          <input type="file" name="file" 
                          style={
                            {position: "absolute", 
                            fontSize: "50px", 
                            opacity: "0", 
                            right: "0", 
                            top: "0"}
                            }
                            onChange={(event) => {
                              if (!event.target.files || event.target.files.length === 0) {
                                // you can display the error to the user
                                console.error("Select a file");
                                return;
                              }
                              uploadMedia(event.target.files[0])
                            }}/>
                  </div>
          </PopoverContent>
        </Popover> */}

          <input
            type="text"
            className={`${styles.input_box} ${inputColorToggle}`}
            placeholder="Ask your question"
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <button
            className={`${styles.submit_button} ${SubmitColorToggle}`}
            onClick={sendMessage}
            ref={send_btn}
            type="submit"
          >
            {/* <FontAwesomeIcon icon={faPaperPlane} /> */}
            <div style={{fontSize: '22px'}}><IoMdSend/></div>
          </button>
          {/* <Button
            bgColor={bg}
            color={faIcon}
            boxShadow="0px 0px 2px 0px black"
            border="none"
            onClick={sendMessage}
            type="submit"
            id="send__message"
            fontSize="10px"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button> */}
        </form>
      </Box>
    </>
  );
};

export default TextBar;
