import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

interface InfoBoxProps {
  text: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ text }) => (
  <Box
    px="1rem"
    fontSize="1rem"
    fontWeight="500"
    width="19.3rem"
    height="2.75rem"
    bg="#F5F6FA"
    borderRadius="1.5rem"
    display="flex"
    alignItems="center"
    mb={{ base: "1rem", md: "0" }}
    ml={{ base: "0", md: "1.5rem" }}
  >
    <Text>{text}</Text>
  </Box>
);

const SampleText: React.FC = () => {
  const data: string[] = [
    "I have a headache that refuses to go",
    "Have you been running a fever",
    "Another piece of information",
    "Another piece of information",
    // Add more items as needed
  ];

  return (
    <>
      {data.map((item, index) => (
        <Flex width="100%" key={index} direction={{ base: "column", md: "row" }}>
          <InfoBox text={item} />
         
        </Flex>
      ))}
    </>
  );
};

export default SampleText;
