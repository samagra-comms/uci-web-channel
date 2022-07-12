import React from "react";
import { useState } from "react";
import ReactDom from "react-dom";
import { Box, Input, Button, Flex } from "@chakra-ui/react";

interface modalProps {
  undo: (event: React.MouseEvent) => void;
  open: boolean;
  toClose: (event: React.FormEvent) => void;
  inputList: string[]
}

const Modal: React.FC<modalProps> = ({ undo,open, toClose, inputList }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Box
        onClick={undo}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "1000",
        }}
      ></Box>
      <Box
        bg="#18978F"
        p="2rem"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        zIndex="1000"
        justifyContent="center"
        alignItems="center"
        borderRadius="10px"
      >
        <form onSubmit={toClose}>
            <Flex>
              {inputList.map(settingName => {
                return (<Input name={settingName} placeholder={`${settingName}`} _placeholder={{color: 'black'}}></Input>)
              })}
          <Button type="submit">Submit</Button>
            </Flex>
         
        </form>
      </Box>
    </>,
    document.getElementById("modal_portal") as HTMLDivElement
  );
};

export default Modal;
