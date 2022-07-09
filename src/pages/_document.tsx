import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from "next/document";
import theme from '../components/ColorModeSwitcher/theme';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <div id="modal_portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
