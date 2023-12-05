import React from 'react';
import { Box, useColorMode, Text } from '@chakra-ui/react'; // Make sure to replace this with the actual import statements for your component library

interface Hist {
  id: string;
  date_time_created: Date;
  date_time_modified: Date;
  title: string;
  identifier: string;
  
}

interface RoleBoxProps {
  hist: Hist;
  changeBg: string;
  handleClick: (name: string) => void;
}

const RoleBox: React.FC<RoleBoxProps> = ({ hist, changeBg, handleClick }) => {
  const { colorMode } = useColorMode();
  return (
    <Box 
    borderRadius="0.25rem"
    cursor="pointer"
    color={colorMode==="light" ? "#3F4254" : "#A1A5B7"}
    bg={changeBg === hist.id ? (colorMode==="light" ? "#3E97FF" : "#1A202C") : (colorMode==="light" ? "#fff" : "#1A202C")}    
    _hover={{
        bg: "#3E97FF",
        color: colorMode==="light" ? "#000" : "#3F4254"
    }}
    >
    <Box ml="0.35rem"
      onClick={() => handleClick(hist.id)}
      borderRadius="0.25rem"
      cursor="pointer"
      my="0.19rem"
      width={{ md:"12rem" }}
      height="2.25rem"
      bg={changeBg === hist.id ? (colorMode==="light" ? "#3E97FF" : "#1A202C") : (colorMode==="light" ? "#fff" : "#1A202C")}  
      py="0.5rem"
      display="flex"
      flexWrap="wrap"
      color={colorMode==="light" ? "#3F4254" : "#A1A5B7"}
      _hover={{
        bg: colorMode==="light" ? "#f5f8fa" : "#2D3748",
        color: colorMode==="light" ? "#000" : "#fff"
    }}
    >
      <Box width="9.375rem" height="1.1875rem" pl="0.25rem">
        <Text fontSize="0.875rem"
        fontWeight="500"
        fontFamily={`'GT-Eesti', sans-serif`}>
        {hist.title.length>20 ? `${hist.title.slice(0,18)}...` : hist.title}
        </Text>
      </Box>
     
    </Box>
    </Box>
  );
};

export default RoleBox;
