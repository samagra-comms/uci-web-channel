import React from 'react'
import {Box} from "@chakra-ui/react";
import styles from "./index.module.css";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface settingsButtonsProps {
    icon: IconDefinition;
    active: boolean;
    height: string;
    width: string;
    toChangeActiveState: (icon: IconDefinition) => void
}


const SettingsButton: React.FC<settingsButtonsProps> = ({icon, active,width,height,toChangeActiveState}) => {

  const changeCurrentState: React.MouseEventHandler = (e: React.MouseEvent) => {
    toChangeActiveState(icon);
  }

  return (
    <button onClick={changeCurrentState} style={{height:`${height}`,width:`${width}`}} className={active?styles.activebutton_container:styles.button_container} >
        <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default SettingsButton;