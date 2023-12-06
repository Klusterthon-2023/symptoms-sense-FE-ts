import React, { useState } from "react";
import { Avatar, Flex, Text, Box, Image, useDisclosure, Spacer, useColorMode } from "@chakra-ui/react";
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
import axios from "axios";
import { selectId } from "../../../redux/userSlice";
import {
  selectAccessToken,
} from "../../../redux/authSlice";

interface Message {
  from: string;
  text: string;
  id: any;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const userName = useSelector((state: RootState) => state.user);
  const accessToken = useSelector(selectAccessToken);
  const user_id = useSelector(selectId);
  const { colorMode } = useColorMode();
  const [upState, setUpState] = useState(false)
  const [downState, setDownState] = useState(false)
  const [copyState, setCopyState] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function setHelpful(id:any, helpful:any) {
    try {
      const response = await axios.put(
        `https://adewole.pythonanywhere.com/api/${user_id}/PostRequest/${id}/SetHelpful/`,
        {
          helpful: helpful
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      if (response) {
        response.data.helpful===true && toast.success("Response set as helpful")
        response.data.helpful===false && toast.success("Response set as unhelpful")
        response.data.helpful===null && toast.success("Response helpful not set")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.data && error.response?.data.hasOwnProperty('detail') && toast.error(error.response?.data['detail'])
        !error.response?.status && toast.error("Network unavailable, please try again.")
      } else {
        toast.error("Error, please try again.")
      }
    }  
  }

  return (
    <Flex
      mt={{base:0, md:"2rem"}}
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
        overflowY="auto"
      >
        {messages.length > 0 && messages.map((item, index) => {
          if (item.from === "me") {
            return (
              <Flex key={index} w="100%" justify="flex-end">
                <Flex
                  borderRadius="0.75rem"
                  bg={colorMode==="light" ? "#F5F6FA" : "#2D3748"}
                  color={colorMode==="light" ? "#3F4254" : "#eee"}
                  maxW={{base:"90%", lg:"50%"}}
                  my="1"
                  p="1rem 2rem"
                >
                  <Avatar
                    name={userName.firstname?.slice(0, 10)}
                    textColor="#fff"
                    mr="0.5rem"
                    bg="#50CD89"
                    size={"sm"}
                    p={"0.35rem"}
                  ></Avatar>
                  <Box>
                    <Text
                      fontSize="1.25rem"
                      lineHeight="145%"
                      fontWeight="400"
                    >
                      You
                    </Text>
                    <Text
                      fontSize="1rem"
                      lineHeight="145%"
                      fontWeight="400"
                      fontFamily={`'GT-Eesti-Light', sans-serif`}
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
                  borderRadius="0.75rem"
                  bg={colorMode==="light" ? "#F5F6FA" : "#2D3748"}
                  color={colorMode==="light" ? "black" : "#eee"}
                  maxW={{base:"100%", lg:"70%"}}
                  minW={"15%"}
                  mt="1rem"
                  mb={"2rem"}
                  p="3"
                >
                  <Avatar
                    name="Computer"
                    src={"https://baticali.sirv.com/Klusterthon2023/logo.svg"}
                    mr="0.5rem"
                    bg={colorMode==="light" ? "white" : "#1A202C"}
                    size={"sm"}
                    p={"0.35rem"}
                  ></Avatar>
                  <Flex direction="column" width={"100%"}>
                    <Box display="flex" alignItems="center" gap="6px">
                      <Text fontWeight={600} fontSize="1.25rem">
                        AI
                      </Text>
                    </Box>
                    <Text fontFamily={`'GT-Eesti-Light', sans-serif`}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(item.text)
                        }}
                      />
                    </Text>
                    <Box display="flex" flexWrap="wrap" width={"100%"}>
                      <Flex my="0.75rem" direction="row" width="100%">
                        <Text
                          textColor={colorMode==="light" ? "#101928" : "#A1A5B7"}
                          fontSize="0.875rem"
                          fontWeight="400"
                        >
                          Helpful?
                        </Text>
                        <Box
                          cursor="pointer"
                          onMouseEnter={() => setUpState(true)}
                          onMouseLeave={() => setUpState(false)}
                          onClick={()=>setHelpful(item.id, true)}>
                          <Image ml="0.5rem" src={upState ? upFill : like} />
                        </Box>
                        <Box
                          cursor="pointer"
                          onMouseEnter={() => setDownState(true)}
                          onMouseLeave={() => setDownState(false)}
                          onClick={()=>setHelpful(item.id, false)}>
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
                            toast.success("Copied to clipboard");
                          }}
                          cursor="pointer"
                          onMouseEnter={() => setCopyState(true)}
                          onMouseLeave={() => setCopyState(false)}
                        >
                          <Image src={copyState ? copyFill : copy} />
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
