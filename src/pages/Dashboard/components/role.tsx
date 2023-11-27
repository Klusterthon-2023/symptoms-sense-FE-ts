import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react'; // Make sure to replace this with the actual import statements for your component library

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
  return (
    <Box 
    borderRadius="0.25rem"
    cursor="pointer"
    bg={changeBg === hist.id ? "#3E97FF" : "#FFF"}    
    _hover={{
        bg: "#3E97FF"
    }}
    >
    <Box ml="0.35rem"
      onClick={() => handleClick(hist.id)}
      borderRadius="0.25rem"
      cursor="pointer"
      my="0.19rem"
      width={{ md:"12rem" }}
      height="2.25rem"
      bg={changeBg === hist.id ? "#f5f8fa" : "#FFF"}
      py="0.5rem"
      display="flex"
      flexWrap="wrap"
      _hover={{
        bg: "#f5f8fa"
    }}
    >
      <Box width="9.375rem" height="1.1875rem" pl="0.25rem">
        <Text fontSize="0.875rem"
        fontWeight="500"
        fontFamily={`'GT-Eesti', sans-serif`}
        textColor="#3F4254">
        {hist.title.length>20 ? `${hist.title.slice(0,18)}...` : hist.title}
        </Text>
      </Box>
     
    </Box>
    </Box>
  );
};

export default RoleBox;
