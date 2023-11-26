import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text, Box } from "@chakra-ui/react";
import chatIcon from "../../../assets/icons/chatIcon.svg";

interface Message {
  from: string;
  text: string;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const AlwaysScrollToBottom: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return <div ref={elementRef} />;
  };

  return (
    <Flex
    mt="2rem"
      width="100%"
      height="400px"
      overflow="hidden"
      flexDirection="column"
      p="3"
    >
      {/* <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3"></Flex> */}
      <Box height="100%"
      marginRight="-50px"
      paddingRight="50px"
      overflowY="scroll"
 >
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
              borderRadius="0.38rem"
                bg="#F5F6FA"
                color="white"
                minW="50%"
                maxW="35.5rem"
                my="1"
                p="1rem"
              >
                <Box
                  bg="#50CD89"
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="6.25rem"
                  mr="0.5rem"
                >
                  <Text></Text>
                </Box>
                <Box>
                  <Text
                    fontSize="0.875rem"
                    textColor="#3F4254"
                    lineHeight="145%"
                    fontFamily="GT BEesti"
                    fontWeight="400"
                  >
                    You
                  </Text>
                  <Text
                    fontSize="0.875rem"
                    textColor="#3F4254"
                    lineHeight="145%"
                    fontWeight="400"
                  >
                    {item.text}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Flex
                borderRadius="0.38rem"
                bg="gray.100"
                color="black"
                minW="50%"
                maxW="35.5rem"
                my="1"
                p="3"
              >
                <Avatar
                  name="Computer"
                  src={chatIcon}
                  mr="0.5rem"
                  objectFit="cover"
                  bg="blue.300"
                ></Avatar>
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      </Box>
      {/* <AlwaysScrollToBottom /> */}
    </Flex>
  );
};

export default Messages;
