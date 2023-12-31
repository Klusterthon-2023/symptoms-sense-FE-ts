import React from "react";
import { Box, Text, useDisclosure, useColorMode } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import FeedbackModal from "./modal";
import logo from "../../assets/icons/logo.svg";
import mode from "../../../src/assets/icons/night-day.svg";
import { useNavigate } from "react-router-dom";


interface ChildComponentProps {
  isDrawerOpen: boolean
  onDrawerOpen: React.MouseEventHandler<HTMLDivElement>;
}

const Navbar: React.FC<ChildComponentProps> = ({isDrawerOpen, onDrawerOpen}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();


  return (
    <>
      <Box position="fixed" zIndex="1000" width="100%">
        <FeedbackModal isOpen={isOpen} onClose={onClose} />
        <Box
          borderBottom={colorMode==="light" ? "1px solid #E1E3EA" : "1px solid #e1e3ea29"}
          bg={colorMode==="light" ? "#fff" : "#1A202C"}
          width="100%"
          mx="auto"
          height="4rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={{ base: "1rem", md: "2rem", "xl":"3rem" }}
        >
          <Box display="flex" alignItems="center" gap="6px" cursor={"pointer"} onClick={() => navigate('/')}>
            <Box width="2rem" aspectRatio="1/1">
              <Image src={logo} width="100%" height="auto" loading="lazy" />
            </Box>
            <Text fontWeight={600} fontSize="1.25rem">
              Symptom
            </Text>
            <Text
              fontFamily={`'GT-Eesti-Light', sans-serif`}
              fontWeight={300}
              fontSize="1.25rem"
            >
              Sense
            </Text>
          </Box>
          <Box display="flex" flexWrap="wrap" gap="0.8rem">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.375rem"
              bgColor={colorMode==="light" ? "#F1F1F2" : "#0E1117"}
              width="2.375rem"
              height="2.375rem"
              onClick={toggleColorMode}
              cursor={"pointer"}
            >
              <Image 
              filter={colorMode==="light" ? "none" : "brightness(2.5)"} src={mode} alt="mode" />
            </Box>

            <Box
              ml="0.62rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.375rem"
              bgColor={colorMode==="light" ? "#F1F1F2" : "#0E1117"}
              width="2.375rem"
              height="2.375rem"
              onClick={onOpen}
              cursor={"pointer"}
            >
              <Image filter={colorMode==="light" ? "none" : "brightness(22.5)"} src={"https://baticali.sirv.com/Klusterthon2023/message-text.svg"} alt="communication" />
            </Box>
          </Box>
          <Box display={{ base: "block", md: "none" }} cursor={"pointer"} onClick={onDrawerOpen}>
            {isDrawerOpen ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
