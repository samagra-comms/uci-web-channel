import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import App from "../components/App";
import React from "react";

// import SideBar from "../components/SideBar/Index";
// import * as serviceWorker from "../utils/serviceWorker";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript } from "@chakra-ui/react";

const Home: NextPage = () => {
  useEffect(() => {
    window && window?.androidInteract?.onBotListingScreenFocused(true);
    window &&
      window?.androidInteract?.log(
        `On Home Page onBotListingScreenFocused:true triggered`
      );
  }, []);
  return (
    <>
      {/*  <React.StrictMode> */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="black" />
        <meta name="UCI Web Channel" content="A project under C4GT" />
        <title>NL Bot</title>
      </Head>
      <CookiesProvider>
        <App />

        <ColorModeScript />
      </CookiesProvider>
      {/* </React.StrictMode> */}
    </>
  );
};
export default Home;
