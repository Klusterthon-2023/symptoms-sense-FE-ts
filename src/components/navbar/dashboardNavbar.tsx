import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, useTheme, useDisclosure, useColorMode } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import mode from "../../../src/assets/icons/night-day.svg";
import communication from "../../../src/assets/icons/message-text-2.svg";
import FeedbackModal from "./modal";


const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        position="fixed"
        zIndex="1000"
        width="100%"
        // bgColor={theme.colors.white}
        
      >
         <FeedbackModal isOpen={isOpen} onClose={onClose} />
        <Box
        borderBottom="1px solid #E1E3EA"
          width="90%"
          mx="auto"
          height="4rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingX={{ xs: "1rem", sm: "2rem", lg: "5rem", xl: "10rem" }}
        >
          <Box display="flex" alignItems="center" gap="6px">
            <Box width="2rem" aspectRatio="1/1">
              <Image
                src={"https://baticali.sirv.com/Klusterthon2023/logo.png"}
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
          <Box display="flex" flexWrap="wrap" gap="0.8rem">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.375rem"
              bgColor="#F1F1F2"
              width="2.375rem"
              height="2.375rem"
              onClick={toggleColorMode}
            >
               {/* Toggle {colorMode === 'light' ? 'Dark' : 'Light'} */}
              <Image src={mode} alt="mode" />
            </Box>

            <Box
              ml="0.62rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="0.375rem"
              bgColor="#EEF6FF"
              width="2.375rem"
              height="2.375rem"
              onClick={onOpen}
            >
              <Image src={communication} alt="communication" />
            </Box>
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <HamburgerIcon boxSize={8} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
