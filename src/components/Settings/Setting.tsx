import {border, Box,Flex,Text} from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useColorModeValue } from "@chakra-ui/react";

interface settingProps {
    icon: IconDefinition,
    settingName: string
    clickFunction: (event: React.MouseEvent) => void 
}

const setting: React.FC<settingProps> = ({icon, settingName, clickFunction}) => {

    const borderColor = useColorModeValue("black","white")

    return (
        <Flex cursor="pointer" height="50px" onClick={clickFunction} my="1rem">
            <Flex fontSize="35px" flex="1" alignItems="center" justifyContent="center">
                <FontAwesomeIcon icon={icon} />
            </Flex>
            <Flex ml="0.5rem" pl="0.5rem"  flex="4" fontWeight="extrabold" alignItems="center" borderTop={`0.5px solid ${borderColor}`} borderBottom={`0.5px solid ${borderColor}`}>
                <Text fontSize="md">{settingName}</Text>
            </Flex>
        </Flex>
    )
}


export default setting;