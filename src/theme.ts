// src/theme.js
import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set the initial color mode to 'light'
    useSystemColorMode: true, // Disable system color mode preference
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white', // Set background color based on color mode
        fontFamily: `'GT-Eesti', sans-serif`
      },
    }),
  },
  colors: {
    brand: {
      main: "#3E97FF",
      active: "#2884EF"
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: "#fff",
        fontFamily: `'GT-Eesti', sans-serif`,
        fontWeight: 400,
        bg: "brand.main",
        alignItems: "center",
        px: "2rem",
        paddingX: "2rem",
        py: "1.5rem",
        borderRadius:"0.38rem",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        _active: {
          bg: "brand.active",
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
        },
        _hover: {
          bg: "brand.active",
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
          _disabled: {
            bg: "#3E97FF",
            boxShadow: "none"
          }
        },
        _focus: {
          bg: "brand.active",
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'
        },
      },
      variants: {
        // Make a variant, we'll call it `base` here and leave it empty
        base: {},
        secondary: (props: StyleFunctionProps) => ({
          color: props.colorMode==="light" ? "#181C32" : "#EEF6FF",
          bg: "transparent",
          _active: {
            bg: "transparent",
            color: props.colorMode==="light" ? "#000" : "#fff",
            boxShadow: "none",
          },
          _hover: {
            bg: "transparent",
            color: props.colorMode==="light" ? "#000" : "#fff",
            boxShadow: "none",
          },
          _focus: {
            bg: "transparent",
            color: props.colorMode==="light" ? "#000" : "#fff",
            boxShadow: "none",
          },
        })
      },
      defaultProps: {
        // Then here we set the base variant as the default
        variant: 'base'
      },
    },
  },
});

export default theme;
