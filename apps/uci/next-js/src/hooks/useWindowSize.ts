import { useEffect, useState } from "react";

export const useWindowSize=()=> {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
  
        // Set window width/height to state
  
        // Add event listener
        window.addEventListener("resize", () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
  
        // Call handler right away so state gets updated with initial window size
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
  
        // Remove event listener on cleanup
        return () =>
          window.removeEventListener("resize", () => {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          });
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  

  