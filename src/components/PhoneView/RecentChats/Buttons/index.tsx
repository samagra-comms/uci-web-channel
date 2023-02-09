import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import styles from "./index.module.css";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface settingsButtonsProps {
  icon: IconDefinition;
  active: boolean;
  toChangeActiveState: (icon: IconDefinition) => void;
}

const SettingsButton: React.FC<settingsButtonsProps> = ({ icon, active,toChangeActiveState }) => {
  const buttonColorToggle = useColorModeValue(
    styles.lightButton,
    styles.darkButton
  );

  const activeButtonToggle = useColorModeValue(
    styles.lightActiveButton,
    styles.darkActiveButton
  );

  const changeCurrentState: React.MouseEventHandler = (e: React.MouseEvent) => {
    toChangeActiveState(icon);
  };

  return (
    <button
      onClick={changeCurrentState}
      className={`${
        active
          ? `${styles.activebutton_container} ${activeButtonToggle}`
          : `${styles.button_container} ${buttonColorToggle}`
      }`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default SettingsButton;
