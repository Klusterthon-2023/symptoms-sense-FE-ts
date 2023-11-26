// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set the initial color mode to 'light'
    useSystemColorMode: false, // Disable system color mode preference
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white', // Set background color based on color mode
      },
    }),
  },
});

export default theme;
