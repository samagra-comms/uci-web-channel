import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel,background, Box, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
const LightWallpapers = () => {

    const [wallpaper,setWallpaper] = useState("wallpaper1");

    const onDefaultWallpaper = () => {
      setWallpaper("notwallpaper");
      localStorage.setItem("wallpaper", "notwallpaper");
    }

    const onWallpaper1 = () => {
      setWallpaper("wallpaper1");
      localStorage.setItem("wallpaper","wallpaper1");
    }

    const onWallpaper2 = () => {
      setWallpaper("wallpaper2");
      localStorage.setItem("wallpaper","wallpaper2");
    }

    useEffect(() => {

      if(localStorage.getItem("wallpaper") === "notwallpaper") {
        setWallpaper(localStorage.getItem("wallpaper") || '');
        var a = document.getElementById("wall") as HTMLImageElement;
        a.style.backgroundImage = "none";
      }

      if(localStorage.getItem("wallpaper") === "wallpaper1") {
        setWallpaper(localStorage.getItem("wallpaper") || '');
        var a = document.getElementById("wall") as HTMLImageElement;
        a.style.backgroundImage = "url(https://wallpaperaccess.com/full/1567846.jpg)";
      }

      if(localStorage.getItem("wallpaper") === "wallpaper2") {
        setWallpaper(localStorage.getItem("wallpaper") || '');
        var a = document.getElementById("wall") as HTMLImageElement;
        a.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2015/04/15/01/30/background-723058__340.jpg)";
      }
    })


    return (
        <React.Fragment>
            <Tabs isFitted variant='enclosed' colorScheme="yellow" size="lg" id="tab" width="100%" height="100%">
                      <TabList>
                        <Tab>Best for Light</Tab>
                        <Tab>Best for Dark</Tab>
                        <Tab>Solid Colours</Tab>
                      </TabList>
                      <TabPanels height="80%">
                        <TabPanel margin="auto" height="100%" overflow="auto">
                        <button  className={styles.wallpaperButton} onClick={onDefaultWallpaper}>
                        Default wallpaper
                        </button>
                        <button style={{backgroundImage: "url(https://wallpaperaccess.com/full/1567846.jpg)", backgroundSize:"auto", color: "black"}} className={styles.wallpaperButton} onClick={onWallpaper1}>
                          wallpper 1
                        </button>
                        <button style={{backgroundImage: "url(https://cdn.pixabay.com/photo/2015/04/15/01/30/background-723058__340.jpg)",backgroundRepeat:"no-repeat", color: "white"}} className={styles.wallpaperButton} onClick={onWallpaper2}>
                          wallpper 2
                        </button>
                        <button  className={styles.wallpaperButton} onClick={onDefaultWallpaper}>
                        Default wallpaper
                        </button>
                        <button style={{backgroundImage: "url(https://wallpaperaccess.com/full/1567846.jpg)", backgroundSize:"auto", color: "black"}} className={styles.wallpaperButton} onClick={onWallpaper1}>
                          wallpper 1
                        </button>
                        <button style={{backgroundImage: "url(https://cdn.pixabay.com/photo/2015/04/15/01/30/background-723058__340.jpg)",backgroundRepeat:"no-repeat", color: "white"}} className={styles.wallpaperButton} onClick={onWallpaper2}>
                          wallpper 2
                        </button>
                        <button  className={styles.wallpaperButton} onClick={onDefaultWallpaper}>
                        Default wallpaper
                        </button>
                        <button style={{backgroundImage: "url(https://wallpaperaccess.com/full/1567846.jpg)", backgroundSize:"auto", color: "black"}} className={styles.wallpaperButton} onClick={onWallpaper1}>
                          wallpper 1
                        </button>
                        <button style={{backgroundImage: "url(https://cdn.pixabay.com/photo/2015/04/15/01/30/background-723058__340.jpg)",backgroundRepeat:"no-repeat", color: "white"}} className={styles.wallpaperButton} onClick={onWallpaper2}>
                          wallpper 2
                        </button>
                        </TabPanel>
                        <TabPanel>
                          <p>Coming soon...</p>
                        </TabPanel>
                        <TabPanel>
                          <p>Solid Colors Coming soon...</p>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
        </React.Fragment>
    )

}

export default LightWallpapers;