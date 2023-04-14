import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface profileSectionProps {
  name: string;
  bio: string;
}

const ProfileSection: React.FC<profileSectionProps> = ({ name, bio }) => { 
  return (
    <Flex flex="6" flexDirection="column">
      <Flex flex="2" alignItems="end" pl="0.5rem" fontWeight="extrabold">
        <h1 style={{ fontSize: '32px' }}>{name}</h1>
      </Flex>
      <Flex flex="3" px="0.5rem">
        <p>{bio}</p>
      </Flex>
    </Flex>
  );
};

export default ProfileSection;
