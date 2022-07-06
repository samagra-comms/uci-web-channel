import React from "react";
import { Flex, Text } from '@chakra-ui/react';

const ProfileSection: React.FC = () => {
  return (
    <Flex flex="6" flexDirection="column">
      <Flex flex="2" alignItems="end" pl="0.5rem" fontWeight="extrabold">
        <Text fontSize="2xl">Arshpreet Singh</Text>
      </Flex>
      <Flex flex="3" pl="0.5rem">
        <Text fontSize="xs">
          It's the journey that matters, not the destination
        </Text>
      </Flex>
    </Flex>
  );
};


export default ProfileSection;