import React, { useState } from "react";
import { Avatar, Flex, Text, Box, Image, useDisclosure, Spacer } from "@chakra-ui/react";
import chatIcon from "../../../assets/icons/chatIcon.svg";
import like from "../../../assets/icons/like.svg";
import dislike from "../../../assets/icons/dislike.svg";
import { marked } from "marked";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import copy from "../../../assets/icons/copy.svg";
import toast from "react-hot-toast";
import FeedbackModal from "../../../components/navbar/modal";
import upFill from "../../../assets/icons/upfill.svg"
import downFill from "../../../assets/icons/downFill.svg"
import copyFill from "../../../assets/icons/filledCopy.svg"
interface Message {
  from: string;
  text: string;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const userName = useSelector((state: RootState) => state.user);
  const [upState, setUpState] = useState(false)
  const [downState, setDownState] = useState(false)
  const [copyState, setCopyState] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      mt="2rem"
      width="100%"
      height="100%"
      overflow="hidden"
      flexDirection="column"
      p="3"
    >
         <FeedbackModal isOpen={isOpen} onClose={onClose} />
      <Box
        height="100%"
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
                  <Avatar
                    name={userName.firstname?.slice(0, 10)}
                    textColor="#fff"
                    mr="0.5rem"
                    bg="#50CD89"
                  ></Avatar>

                  <Box>
                    <Text
                      fontSize="0.875rem"
                      textColor="#3F4254"
                      lineHeight="145%"
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
                  minW="70%"
                  maxW="35.5rem"
                  my="1"
                  p="3"
                >
                  <Avatar
                    name="Computer"
                    src={chatIcon}
                    mr="0.5rem"
                    bg="white"
                  ></Avatar>
                  <Flex direction="column">
                    <Text
                      fontSize="0.875rem"
                      textColor="#3F4254"
                      lineHeight="145%"
                      fontWeight="400"
                    >
                      AI
                    </Text>
                    <Text>
                      <div
                        style={{ textTransform: "capitalize" }}
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(item.text),
                        }}
                      />
                    </Text>
                    <Box display="flex" flexWrap="wrap">
                      <Flex my="0.75rem" direction="row" width="100%">
                        <Text
                          textColor="#101928"
                          fontSize="0.875rem"
                          fontWeight="400"
                        >
                          Helpful?
                        </Text>
                        <Box
                        cursor="pointer"
                         onMouseEnter={() => setUpState(true)}
                         onMouseLeave={() => setUpState(false)}
                          onClick={onOpen}>
                          <Image ml="0.5rem" src={ upState ? upFill : like} />
                        </Box>
                        <Box
                        cursor="pointer"
                         onMouseEnter={() => setDownState(true)}
                         onMouseLeave={() => setDownState(false)}
                          onClick={onOpen}>
                          <Image ml="0.62rem" src={downState ? downFill : dislike} />
                        </Box>



                        
                        <Spacer />
                        <Box
                          onClick={() => {
                            const tempTextArea =
                              document.createElement("textarea");
                            tempTextArea.value = item.text;
                            document.body.appendChild(tempTextArea);
                            tempTextArea.select();
                            document.execCommand("copy");
                            document.body.removeChild(tempTextArea);
                            toast.success("copied to clipboard");
                            console.log(item.text);
                          }}
                          cursor="pointer"
                          onMouseEnter={() => setCopyState(true)}
                          onMouseLeave={() => setCopyState(false)}
                        >

                          <Image
                          
                          src={copyState ? copyFill : copy} />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            );
          }
        })}
      </Box>
    </Flex>
  );
};

export default Messages;
