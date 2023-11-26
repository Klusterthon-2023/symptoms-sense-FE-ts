import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

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
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
       {/* <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3"></Flex> */}
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
                <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="black"
                color="white"
                minW="30%"
                maxW="35.5rem"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="30%"
                maxW="35.5rem"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
