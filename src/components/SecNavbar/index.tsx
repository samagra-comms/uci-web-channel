import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import styles from "/src/components/SecNavbar/index.module.css";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "react-bootstrap";
import { forwardRef, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Submenu from './Submenu';

const wallpaper_1 = "https://cdn.wallpapersafari.com/98/39/9My6KE.jpg";
const wallpaper_2 = "https://cdn.pixabay.com/photo/2021/03/12/11/17/light-bulb-6089387_960_720.jpg";





const SecNavbar = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem("theme") || "");
    }
  },[]); 

  useEffect(() => {
    if (theme === "green") {
      wallpaper1();
    } else if (theme === "red") {
      wallpaper2();
    }
  },[theme]);

  const wallpaper1 = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "url("+wallpaper_1+")";
    //wallpaper[0].style.backgroundSize = "cover";
    setTheme("green");
    localStorage.setItem("theme", "green");
  }
  
  const wallpaper2 = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "url("+wallpaper_2+")";
    setTheme("red");
    localStorage.setItem("theme", "red");
  }
  
  const original = () => {
    var wallpaper = document.getElementsByClassName("chat-body") as HTMLCollectionOf<HTMLElement>;
    wallpaper[0].style.backgroundImage = "none";
    wallpaper[0].style.backgroundColor = "white";
    setTheme("");
    localStorage.setItem("theme","");
  }
  
const router = useRouter();
return (

  <Flex p="2" borderBottom="1px">
    <Box>
    <Menu>
        <MenuButton className={styles.menuBox}
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          style={{width: "60px", height: "20px"}}
        />
        <MenuList className={styles.navbar}>
          <Submenu wall1={wallpaper1} wall2={wallpaper2} orig={original} />
        </MenuList>
    </Menu>
    </Box>
  </Flex>
)};

export default SecNavbar;
