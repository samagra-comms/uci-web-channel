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
  const backgroundColorToggle = useColorModeValue("#EEEEEE","#242631")
  // ---------------

  const [location, setLocation] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation(`https://www.google.com/maps?q=${lat},${long}+&output=embed`);
          //props?.onSend && props.onSend(url());
        }
      );
    }
    else{
      toast.error("Geolocation is not supported by this browser.");
    }
  },[])


  const input: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  const send_btn = useRef<HTMLButtonElement | null>(null);


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
    // props?.onSendLocation && props.onSendLocation(location);
    props.onSendLocation(location);
    // props.onSend(location, null);
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
        <Popover>
          <PopoverTrigger>
            <button type="button" className={`${styles.add_button} ${attachmentColorToggle}`}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </PopoverTrigger>
          <PopoverContent className={styles.popover} width="50px" border="none" backgroundColor={backgroundColorToggle}>
            <Button size="md" type="button" style={{margin: "15px 5px 0 0", backgroundColor:"#ff0079", borderRadius:"50%"}} onClick={sendLocation}>
              <FontAwesomeIcon color="#FFFFFF" icon={faLocationDot} />
            </Button>
            <div className="file btn btn-primary" 
                      style={
                        { position: "relative", 
                          overflow: "hidden", 
                          marginRight: '7px', 
                          paddingTop: '5px',
                          margin: "19px 5px 5px 0",
                          backgroundColor:"#2656e9",
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                        }}>
                          <div style={{
                            margin: "5px 0 0 17px",
                          }}>
                            <FontAwesomeIcon color="#FFFFFF" icon={faFile} />
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
        </Popover>

          <input
            type="text"
            className={`${styles.input_box} ${inputColorToggle}`}
            placeholder="Type your message"
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <button
            className={styles.submit_button}
            onClick={sendMessage}
            ref={send_btn}
            type="submit"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          {/* <Button
            bgColor={bg}
            color={faIcon}
            boxShadow="0px 0px 2px 0px #0000005e"
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

// ----------------------------------------------------------------------------------------------------

// import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
// import { Box, Button, calc, InputRightAddon } from "@chakra-ui/react";
// import { MdSend } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPaperPlane,
//   faLocationDot,
//   faPaperclip,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Input,
//   useColorModeValue,
//   InputGroup,
//   InputRightElement,
//   Stack,
// } from "@chakra-ui/react";
// import { ButtonGroup } from "react-bootstrap";

// interface textBarProps {
//   onSend: (name: string, media: any) => void;
//   onSendLocation: (location: any) => void;
// }

// const TextBar: React.FC<textBarProps> = (props) => {
//   //const TextBar = (props: any) => {
//   //Location sharing
//   const [location, setLocation] = useState("");
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position: any) => {
//           const lat = position.coords.latitude;
//           const long = position.coords.longitude;
//           setLocation(`https://www.google.com/maps?q=${lat},${long}+&output=embed`);
//           //props?.onSend && props.onSend(url());
//         }
//       );
//     }
//     else{
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   },[])



//   // Toggle Settings
//   const bg = useColorModeValue("#1D90F5", "#202C33");
//   // const childrenIcon = useColorModeValue("#202C33","#AEBAC1")
//   const bgColor = useColorModeValue("#FFFFFF", "#323644");
//   const textColor = useColorModeValue("#000", "#fff");
//   const faIcon = useColorModeValue("#202C33", "#fff");
//   // ---------------

//   const input: MutableRefObject<HTMLInputElement | null> =
//     useRef<HTMLInputElement | null>(null);

//   const sendMessage = (e: any) => {
//     e.preventDefault();
//     const message: string | undefined = input.current?.value;
//     if (input.current?.value.trim().length === 0) {
//       toast.error("Please enter a valid message");
//     } else if (message!.length > 0) {
//       props?.onSend && props.onSend(input.current!.value,null);
//     }
//     input.current!.value = "";
//   };

//   const sendMessageIfEnter: React.KeyboardEventHandler = (
//     e: React.KeyboardEvent
//   ) => {
//     if (+e.key === 13 && input.current!.value.length > 0) {
//       sendMessage(e);
//     }
//   };

//   const sendLocation = (e: any) => {
//     e.preventDefault();
//     props.onSendLocation(location);
//   };

//   const uploadMedia = async (fileObj: any) => {
//     const data = new FormData();
//     data.append('file',fileObj);
//     try{
//         let res = await fetch(
//         `http://143.110.255.220:8080/cdn/minioSignedUrl`,
//         {
//             method: 'post',
//             body: data,
//         }
//         );
//         let responseJson = await res.json();
//         if (res.status === 200) {
//             props.onSend(" ",responseJson);
//         }else{      
//             console.log('image not uploaded')
//         }
//     }
//     catch{
//         console.error('no response received');
//     }    
//   };
 


//   return (
//     <>
//       <ToastContainer />
//       <Box className="chat__footer" width="75%" backgroundColor={bgColor}>
//         <form>
//           <InputGroup
//             position="relative"
//             // transition="all 300ms"
//             boxShadow="2xl"
//             padding="0 20px"
//             border="none"
//             // height="35px"
//             mx="10px"
//             p="0 1rem"
//             fontSize="15px"
//           >
//             <Input
//               color={"black"}
//               placeholder="Type your message"
//               _placeholder={{ color: "black" }}
//               ref={input}
//               onKeyDown={sendMessageIfEnter}
//               size="lg"
//               borderRadius="20px"
//               // width="calc('100% - 200px')"
//               backgroundColor="white"
//             />
//             <InputRightElement
//               mr="2rem"
//               children={
//                 <Stack direction="row" spacing="2" mb="10px">
//                   <div className="file btn btn-primary" 
//                       style={
//                         { position: "relative", 
//                           overflow: "hidden", 
//                           marginRight: '7px', 
//                           paddingTop: '5px',
//                           margin: "19px 5px 0 0"
//                         }}>
//                           <FontAwesomeIcon color="#202C33"  icon={faPaperclip} />
//                           <input type="file" name="file" 
//                           style={
//                             {position: "absolute", 
//                             fontSize: "50px", 
//                             opacity: "0", 
//                             right: "0", 
//                             top: "0"}
//                             }
//                             onChange={(event) => {
//                               if (!event.target.files || event.target.files.length === 0) {
//                                 // you can display the error to the user
//                                 console.error("Select a file");
//                                 return;
//                               }
//                               uploadMedia(event.target.files[0])
//                             }}/>
//                   </div>
//                   {/* <Button size="xs">
//                   <input type="file" name="file" 
//                 style={
//                   {position: "absolute", 
//                    fontSize: "50px", 
//                    opacity: "0", 
//                    right: "0", 
//                    top: "0"}
//                   }
//                   onChange={(event) => {
//                     if (!event.target.files || event.target.files.length === 0) {
//                       // you can display the error to the user
//                       console.error("Select a file");
//                       return;
//                     }
//                     uploadMedia(event.target.files[0])
//                   }}/>
//                     <FontAwesomeIcon color="#202C33" icon={faPaperclip} />
//                   </Button> */}
//                   <Button size="md" style={{margin: "15px 5px 0 0"}} onClick={sendLocation}>
//                     <FontAwesomeIcon color="#202C33" icon={faLocationDot} />
//                   </Button>
//                 </Stack>
//               }
//             />
//           </InputGroup>
//           <Button
//             bgColor="#1D90F5"
//             color={faIcon}
//             w="46px"
//             h="46px"
//             borderRadius="50%"
//             boxShadow="0px 0px 2px 0px #0000005e"
//             border="none"
//             className="send__btn"
//             onClick={sendMessage}
//             type="submit"
//             mr="1rem"
//           >
//             <FontAwesomeIcon icon={faPaperPlane} />
//           </Button>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default TextBar;