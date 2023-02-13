import React, { useEffect } from "react";
import { useState } from "react";
import {
  background,
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import styles from "./index.module.css";
import SettingsButton from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faDesktop,
  faCampground,
  IconDefinition,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import { useColorModeValue } from "@chakra-ui/react";
import LightWallpapers from "./Light";
import dynamic from "next/dynamic";
const FontSizeChanger = dynamic(
  () => {
    return import("react-font-size-changer");
  },
  { ssr: false }
);

const SettingsBar: React.FC = () => {
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const buttonToggle = useColorModeValue(
    styles.lightModeButton,
    styles.darkModeButton
  );

  const [allButtons, setAllButtons] = useState<
    { key: string; icon: IconDefinition; active: boolean }[]
  >([
    {
      key: "1",
      icon: faCampground,
      active: false,
    },
    {
      key: "2",
      icon: faCog,
      active: true,
    },
    {
      key: "3",
      icon: faDesktop,
      active: false,
    },
  ]);

  const onChangeCurrentButton = (icon: IconDefinition) => {
    const newButtons = allButtons.map((button) => {
      if (button.icon === icon) {
        button.active = !button.active;
        return button;
      } else {
        return button;
      }
    });

    setAllButtons(newButtons);
  };

  return (
    <React.Fragment>
      <Box className={`${styles.container} ${backgroundColorToggle}`}>
        {/* Settings Button */}
        <Box className={styles.settingsContainer}>
          {/* {allButtons.map((button) => {
                return (
                return (<SettingsButton key={button.key} toChangeActiveState={onChangeCurrentButton} icon={button.icon} active={button.active} width="3vw" height="6vh" />)
              })
            } */}
          <Popover placement="right">
            <PopoverTrigger>
              <button className={`${styles.button_container} ${buttonToggle}`}>
                <FontAwesomeIcon icon={faTextHeight} />
              </button>
            </PopoverTrigger>
            <PopoverContent className={styles.fontSize} width="0px">
              <FontSizeChanger
                targets={[".messages ", ".recievedMessages", ".choice"]}
                options={{
                  stepSize: 5,
                  range: 3,
                }}
                customButtons={{
                  up: <span style={{ fontSize: "15px" }}>A+</span>,
                  down: <span style={{ fontSize: "15px" }}>A-</span>,
                  style: {
                    // backgroundColor: "#1d90f5",
                    // color: "white",
                    WebkitBoxSizing: "border-box",
                    WebkitBorderRadius: "5px",
                    width: "30px",
                    fontWeight: "bold",
                  },
                  buttonsMargin: 10,
                }}
              />
            </PopoverContent>
          </Popover>
          <Popover placement="right">
            <PopoverTrigger>
              <button className={`${styles.button_container} ${buttonToggle}`}>
                <FontAwesomeIcon icon={faDesktop} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={styles.wallpaperPopover}
              width="100vh"
              display="flex"
              flexDirection="row"
            >
              <LightWallpapers />
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SettingsBar;
