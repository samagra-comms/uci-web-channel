import React, { useEffect } from "react";
import { useState } from 'react';
import { background, Box, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
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
  const backgroundColorToggle = useColorModeValue(styles.lightContainer,styles.darkContainer)

    const [allButtons,setAllButtons] = useState<{key: string,icon: IconDefinition, active: boolean}[]>([
        {
            key: '1',
            icon: faCampground,
            active: false
        },
        {
            key: '2',
            icon: faCog,
            active: true
        },
        {
            key: '3',
            icon: faDesktop,
            active: false
        }
    ])


    const onChangeCurrentButton = (icon: IconDefinition) => {
        
        const newButtons = allButtons.map( (button) => {
            if (button.icon === icon) {
                button.active = !button.active;
                return button;
            } else {
                return button;
            }
        })

        setAllButtons(newButtons)
    }

//   const onChangeCurrentUser = (name: string, number: string|null) => {
//     const myUser = users.find((user) => {
//       return user.name === name;
//     }) || { name: "UCI", number: null };
//     users.forEach((user, index) => {
//       if (user.name === name && user.number === number) {
//         user.active = true;
//       } else if (user.active === true) {
//         user.active = false;
//       }
//     });
//     setCurrentUser(myUser);
//   };


    // const [wallpaper,setWallpaper] = useState("wallpaper1");

    // const onDefaultWallpaper = () => {
    //   setWallpaper("notwallpaper");
    //   localStorage.setItem("wallpaper", "notwallpaper");
    // }

    // const onWallpaper1 = () => {
    //   setWallpaper("wallpaper1");
    //   localStorage.setItem("wallpaper","wallpaper1");
    // }

    // const onWallpaper2 = () => {
    //   setWallpaper("wallpaper2");
    //   localStorage.setItem("wallpaper","wallpaper2");
    // }

    // useEffect(() => {

    //   if(localStorage.getItem("wallpaper") === "notwallpaper") {
    //     setWallpaper(localStorage.getItem("wallpaper") || '');
    //     var a = document.getElementById("wall") as HTMLImageElement;
    //     a.style.backgroundImage = "none";
    //   }

    //   if(localStorage.getItem("wallpaper") === "wallpaper1") {
    //     setWallpaper(localStorage.getItem("wallpaper") || '');
    //     var a = document.getElementById("wall") as HTMLImageElement;
    //     a.style.backgroundImage = "url(https://wallpaperaccess.com/full/51364.jpg)";
    //   }

    //   if(localStorage.getItem("wallpaper") === "wallpaper2") {
    //     setWallpaper(localStorage.getItem("wallpaper") || '');
    //     var a = document.getElementById("wall") as HTMLImageElement;
    //     a.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg)";
    //   }
    // })

  return (
    <React.Fragment>
      <Box className={`${styles.container} ${backgroundColorToggle}`}>
        {/* C4GT Logo */}
        <Box className={styles.c4gtLogo}></Box>

        {/* Settings Button */}
        <Box className={styles.settingsContainer}>
            {/* {allButtons.map((button) => {
                return (
                return (<SettingsButton key={button.key} toChangeActiveState={onChangeCurrentButton} icon={button.icon} active={button.active} width="3vw" height="6vh" />)
              })
            } */}
            <Popover placement="right">
              <PopoverTrigger>
              <button className={styles.button_container}>
                <FontAwesomeIcon icon={faTextHeight} />
              </button>
              </PopoverTrigger>
              <PopoverContent className={styles.fontSize} width="0px">
              <FontSizeChanger
                targets={['.messages ','.recievedMessages','.choice']}
                options={{
                  stepSize: 5,
                  range: 3
                }}
                customButtons={{
                  up: <span style={{'fontSize': '15px'}}>A+</span>,
                  down: <span style={{'fontSize': '15px'}}>A-</span>,
                  style: {
                    backgroundColor: '#1d90f5',
                    color: 'white',
                    WebkitBoxSizing: 'border-box',
                    WebkitBorderRadius: '5px',
                    width: '30px'
                  },
                  buttonsMargin: 10
                }}          
              />
              </PopoverContent>
            </Popover>
            <Popover placement="right">
                    <PopoverTrigger>
                      <button className={styles.button_container}>
                        <FontAwesomeIcon icon={faDesktop} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className= {styles.wallpaperPopover} width="100vh" display="flex" flexDirection="row">
                    <LightWallpapers />
                    </PopoverContent>
            </Popover>
                  <SettingsButton
                    toChangeActiveState={onChangeCurrentButton} 
                    icon={faCampground}
                    active={false}
                    width="2rem"
                    height="2rem"
                  />
                  <SettingsButton
                    toChangeActiveState={onChangeCurrentButton} 
                    icon={faCog}
                    active={true}
                    width="2rem"
                    height="2rem"
                  />
                  {/* <SettingsButton
                    toChangeActiveState={onChangeCurrentButton} 
                    icon={faDesktop}
                    active={false}
                    width="2rem"
                    height="2rem"
                  /> */}
                  
                  
        </Box>
      </Box>

    </React.Fragment>
  );
};

export default SettingsBar;
