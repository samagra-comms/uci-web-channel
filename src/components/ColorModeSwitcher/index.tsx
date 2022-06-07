import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import useNetwork from "hooks/useNetwork.js"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {

   if(!useNetwork().online){
    alert("Make it config driven env variable");
  }
  
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
