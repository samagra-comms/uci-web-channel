import React from "react";
import { Box } from "@chakra-ui/react";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <Box flex="0.6" height="100vh"><Box className={styles.container}></Box></Box>
  );
};

export default SideBar;
