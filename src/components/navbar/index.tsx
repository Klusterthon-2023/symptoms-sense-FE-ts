import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, useTheme, Spacer, useColorMode } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [mobileState, setMobileState] = useState(false)

  return (
    <Box position="fixed"
      width="100%"
      bgColor={colorMode==="light" ? "#fff" : "#1A202C"}
      borderBottom={colorMode==="light" ? "1px solid #E1E3EA" : "1px solid #e1e3ea29"}
      zIndex="1000"
      top={0}
      left={0}
      right={0}
    >
      <Box
        position={"relative"}
      >
        <Box
          width="90%"
          maxWidth="90rem"
          mx="auto"
          paddingY={"1.5rem"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="6px" cursor={"pointer"} onClick={()=>navigate('/')}>
            <Box width="2rem" aspectRatio="1/1">
              <Image
                src={"https://baticali.sirv.com/Klusterthon2023/logo.svg"}
                alt="Systems sense logo"
                width="100%"
                height="auto"
                loading="lazy"
              />
            </Box>
            <Text fontWeight={600} fontSize="1.25rem">
              Symptom
            </Text>
            <Text fontFamily={`'GT-Eesti-Light', sans-serif`} fontWeight={300} fontSize="1.25rem">
              Sense
            </Text>
          </Box>
          <Box display={{ base: "flex", md: "none" }}>
            <Box onClick={() => setMobileState(!mobileState)} >
              {mobileState ? <CloseIcon /> : <HamburgerIcon />}
            </Box>

          </Box>

          <Box display={{ base: "none", md: "flex" }} gap={3}>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant={"secondary"}
            >
              Log in
            </Button>

            <Button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Try Now
            </Button>
          </Box>
        </Box>
      </Box>
      {
        mobileState ?
          <Box mt="1rem"  width="12.3rem" padding={"0.15rem"} display="flex" flexDirection={"column"} float={"right"}  >
            <Button
              onClick={() => {
                navigate("/login");
              }}
              color={"brand.main"}
              variant={"secondary"}
              padding={0}
              textAlign={"right"}
              _hover={{
                color:"brand.active"
              }}
              fontSize={"1.5rem"}
            >
              Log in
            </Button>

            <Spacer />

            <Button
              onClick={() => {
                navigate("/signup");
              }}
              color={"brand.main"}
              variant={"secondary"}
              padding={0}
              textAlign={"right"}
              _hover={{
                color:"brand.active"
              }}
              fontSize={"1.5rem"}
            >
              Try Now
            </Button>
          </Box>
          : ""
      }
    </Box>
  );
};

export default Navbar;
