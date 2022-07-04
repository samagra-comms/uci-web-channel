import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Box,
  } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import styles from "/src/components/SecNavbar/index.module.css";


const Submenu = (props : any) => {
    return (
    <Menu>
      <MenuButton className={styles.item} style={{width:"100px"}}  >
        Wallpapers <ChevronDownIcon />
      </MenuButton>
      <MenuList className={styles.sublist}>
        <MenuItem className={styles.subitem}>
        <div onClick={props.orig} className={styles.wallbtn2}>Default wallpaper</div>
        </MenuItem>
        <MenuItem className={styles.subitem}>
        <div onClick={props.wall1} className={styles.wallbtn1}>wallpaper 1</div>
        </MenuItem>
        <MenuItem className={styles.subitem}>
        <div onClick={props.wall2} className={styles.wallbtn3}>wallpaper 2</div>
        </MenuItem>
      </MenuList>
    </Menu>)
  }
export default Submenu;