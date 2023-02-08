import React, { MutableRefObject, RefObject, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { Input, useColorModeValue } from "@chakra-ui/react";

interface textBarProps {
    onSend: (name: string) => void,
}

const TextBar: React.FC<textBarProps> = (props) => {

   // Toggle Settings
   const bg = useColorModeValue("#06d755","#202C33");
   const textColor = useColorModeValue("#000","#fff");
   const faIcon = useColorModeValue("#202C33","#fff");
   // ---------------

  const input = useRef<HTMLInputElement>(null);
  const send_btn = useRef<HTMLButtonElement>(null);

    const sendMessage: React.MouseEventHandler = (e: React.MouseEvent) => {
      e.preventDefault();
      const message: string | undefined = input.current?.value;
      if(input.current?.value.trim().length === 0) {
        toast.error("Please enter a valid message");
      }
      else if (message!.length > 0 ){
        props?.onSend && props.onSend(input.current!.value);
      }
      input.current!.value = "";
    };

  const sendMessageIfEnter: React.KeyboardEventHandler = (e: React.KeyboardEvent) => {
    if (+e.key === 13 && input.current!.value.length > 0) {
      send_btn.current?.click();
    }
  };

  return (
    <>
      <ToastContainer />
      <Box className="chat__footer">
        <form>
          <Input
            color={"black"}
            placeholder="Type your message"
            _placeholder={{color: "black"}}
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <Button ref={send_btn} bgColor={bg} color={faIcon} w="46px" h="46px" borderRadius="50%" boxShadow="0px 0px 2px 0px #0000005e" border="none"  className="send__btn" onClick={sendMessage} type="submit">
           <FontAwesomeIcon icon={faPaperPlane}  />
          </Button>
        </form>
      </Box>
    </>
  );
};

export default TextBar;
