import React from "react";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";


interface chatItemProps {
    image: string,
    name: string
}

const ChatItem: React.FC<chatItemProps> = ({image, name}) => {
  const borderColor = useColorModeValue("#000", "#fff");

  return (
    <Flex cursor="pointer" height="max-content" m="0.5rem">
      <Flex fontSize="35px" flex="1" alignItems="center" justifyContent="end">
        <Box
          borderRadius="50%"
          bgImage={image}
          height="80px"
          width="80px"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        />
      </Flex>
      <Flex
        ml="0.5rem"
        pl="0.5rem"
        flex="4"
        fontWeight="extrabold"
        alignItems="center"
        borderTop={`0.5px solid ${borderColor}`}
        borderBottom={`0.5px solid ${borderColor}`}
      >
        <Text fontSize="md">{name}</Text>
      </Flex>
    </Flex>
  );
};
export default ChatItem;
