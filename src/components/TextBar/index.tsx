import { useRef } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";

const TextBar = (props: any) => {
  const input: any = useRef(null);
  const sendMessage = () => {
    props?.onSend && props.onSend(input.current.value);
    input.current.value = "";
  };
  const sendMessageIfEnter = (e: any) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <div className="chat-footer">
      <Input
        w="80%"
        placeholder="Type your message"
        ref={input}
        onKeyDown={sendMessageIfEnter}
      />
      <Button
        leftIcon={<MdSend />}
        colorScheme="pink"
        variant="solid"
        onClick={sendMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default TextBar;
