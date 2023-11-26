import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, useTheme, Spacer } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import mode from "../../../src/assets/icons/night-day.svg";
import communication from "../../../src/assets/icons/message-text-2.svg";
import logo from "../../assets/icons/logo.svg";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileState, setMobileState] = useState(false)

  return (
    <>
      <Box
        position="fixed"
        width="100%"
        bgColor={theme.colors.white}
        borderBottom="1px solid #E1E3EA"
        zIndex="1000"
      >
        <Box
          width="90%"
          maxWidth="90rem"
          mx="auto"
          height="4rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        
        >
          <Box display="flex" alignItems="center" gap="6px">
            <Box width="2rem" aspectRatio="1/1">
              <Image
                src={logo}
                alt="Systems sense logo"
                width="100%"
                height="auto"
                loading="lazy"
              />
            </Box>
            <Text fontWeight={600} fontSize="1.25rem">
              Symptom
            </Text>
            <Text fontWeight={300} fontSize="1.25rem">
              Sense
            </Text>
          </Box>
          <Box float="right"  display={{base:"block", md:"none"}}>
            <Box onClick={() => setMobileState(!mobileState)} >
             {mobileState ? <CloseIcon/> : <HamburgerIcon /> } 
              </Box>
           
          </Box>

          <Box mt="0.5rem" display={{base:"none", md:"block"}}>
            <Box width="12.3rem" height="3rem" display="flex" flexWrap="wrap">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>

              <Spacer />

              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                width="7.06rem"
                px="1.5rem"
                bg="#3E97FF"
                borderRadius="0.38rem"
              >
                Try Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="90%" mx="auto" height="4rem"></Box>
      {
        mobileState ?
        <Box mt="1rem" mr="1rem" float="right" width="12.3rem" height="3rem" display="flex" flexWrap="wrap">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>

              <Spacer />

              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                width="7.06rem"
                px="1.5rem"
                bg="#3E97FF"
                borderRadius="0.38rem"
              >
                Try Now
              </Button>
            </Box>
        :""
      }
    </>
  );
};

export default Navbar;
