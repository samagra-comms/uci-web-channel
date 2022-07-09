import React, { MutableRefObject, RefObject, useRef } from "react";
import { Box, Button, calc, InputRightAddon } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faLocationDot,
  faPaperclip,
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
  onSend: (name: string) => void;
}

const TextBar: React.FC<textBarProps> = (props) => {
  // Toggle Settings
  const bg = useColorModeValue("#06d755", "#202C33");
  // const childrenIcon = useColorModeValue("#202C33","#AEBAC1")
  const textColor = useColorModeValue("#000", "#fff");
  const faIcon = useColorModeValue("#202C33", "#fff");
  // ---------------

  const input: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const message: string | undefined = input.current?.value;
    if (input.current?.value.trim().length === 0) {
      toast.error("Please enter a valid message");
    } else if (message!.length > 0) {
      props?.onSend && props.onSend(input.current!.value);
    }
    input.current!.value = "";
  };

  const sendMessageIfEnter: React.KeyboardEventHandler = (
    e: React.KeyboardEvent
  ) => {
    if (+e.key === 13 && input.current!.value.length > 0) {
      sendMessage(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box className="chat__footer" width="75%">
        <form>
          <InputGroup
            position="relative"
            // transition="all 300ms"
            boxShadow="2xl"
            padding="0 20px"
            border="none"
            // height="35px"
            mx="10px"
            p="0 1rem"
            fontSize="15px"
          >
            <Input
              color={"black"}
              placeholder="Type your message"
              _placeholder={{ color: "black" }}
              ref={input}
              onKeyDown={sendMessageIfEnter}
              size="sm"
              borderRadius="20px"
              // width="calc('100% - 200px')"
            />
            <InputRightElement
              mr="2rem"
              children={
                <Stack direction="row" spacing="2" mb="10px">
                  <Button size="xs">
                    <FontAwesomeIcon color="#202C33" icon={faPaperclip} />
                  </Button>
                  <Button size="xs">
                    <FontAwesomeIcon color="#202C33" icon={faLocationDot} />
                  </Button>
                </Stack>
              }
            />
          </InputGroup>
          <Button
            bgColor={bg}
            color={faIcon}
            w="46px"
            h="46px"
            borderRadius="50%"
            boxShadow="0px 0px 2px 0px #0000005e"
            border="none"
            className="send__btn"
            onClick={sendMessage}
            type="submit"
            mr="1rem"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </form>
      </Box>
    </>
  );
};

export default TextBar;
