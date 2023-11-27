import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Messages from "../Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectId } from "../../../../redux/userSlice";
import {
  selectAccessToken,
} from "../../../../redux/authSlice";
import SubmitePage from "../Footer";

interface Message {
  from: string;
  text: string;
}
interface ChildComponentProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  childId: string;
  setChildId: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  newChatState: boolean
  setNewChatState: React.Dispatch<React.SetStateAction<boolean>>;
  handleHistory: Function
}

const Chat: React.FC<ChildComponentProps> = ({
 messages, setMessages, childId, setChildId, loading, setLoading, newChatState, setNewChatState, handleHistory
}) => {
  const accessToken = useSelector(selectAccessToken);
  const [ident, setIdent] = useState("");
  const id = useSelector(selectId);
  const data: string[] = [
    "Experiencing persistent or severe headaches",
    "I have been running a fever",
    "Feeling unusually tired or fatigued",
    "I have a persistent cough",
  ]; 

  const [inputMessage, setInputMessage] = useState<string>("");

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleGetChatHistory = async () => {
    setLoading(true)
    const response = await axios.get(
      `https://adewole.pythonanywhere.com/api/${id}/History/${childId}/ListChatIdentifierHistory/`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setMessages([]);
    response.data.chat_history.map((oldmap: any) => {
      setMessages((old) => [...old, { from: "me", text: oldmap.request }]);

      setInputMessage("");

      setMessages((old) => [
        ...old,
        { from: "computer", text: oldmap.response },
      ]);
    });
    setChildId("");
    setLoading(false);
  };

  useEffect(() => {

    if (childId!=="") {  
      setIdent(childId);    
      handleGetChatHistory();
    }
  }, [childId, ident, messages]);

  const handleSendMessage = async () => {
    let uniqueId;
    if (newChatState) {
      uniqueId = generateUUID();
      setIdent(uniqueId);
    }
    if (!inputMessage.trim().length) {
      return;
    }
    setLoading(true)
    const data: string = inputMessage;
    const payload = {
      request: data,
      identifier: newChatState ? uniqueId : ident ,
    };

    const response = await axios.post(
      `https://adewole.pythonanywhere.com/api/${id}/PostRequest/Create/`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    setMessages((old) => [...old, { from: "me", text: data }]);

    setInputMessage("");
    setMessages((old) => [
      ...old,
      { from: "computer", text: response.data.detail },
    ]);

    setLoading(false);
    setNewChatState(false);
    handleHistory();
  };

  const sampleFxn = async (text: string) => {
    var uniqueId = generateUUID();
    setIdent(uniqueId);
    setLoading(true);

    setInputMessage(text);

    const newdata: string = text;

    const payload = {
      request: newdata,
      identifier: uniqueId,
    };

    const response = await axios.post(
      `https://adewole.pythonanywhere.com/api/${id}/PostRequest/Create/`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    setMessages((old) => [...old, { from: "me", text: newdata }]);

    setInputMessage("");
    setMessages((old) => [
      ...old,
      { from: "computer", text: response.data.detail },
    ]);
    console.log(ident)
  
    setLoading(false);    
    setNewChatState(false);
  };

  return (
    <Flex ml={{base:0, lg:"2.5rem"}} w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "90%"]} h="90%" flexDir="column">
        {messages.length === 0 ? (
          <Box position="relative" width="100%" h="100%" overflow={"hidden"}>
            <Box position="absolute" bottom="0" width={"100%"} maxH={"100%"} overflowY={"auto"} pt={{base:"2rem", sm:0}}>
              <Heading
                textColor="#101828"
                fontSize="1.5rem"
                fontWeight="700"
                lineHeight="2rem"
                fontFamily={`'GT-Eesti', sans-serif`}
              >
                How can I help you today?
              </Heading>
              <Text textColor="#667085" mt="0.25rem" fontSize="1rem" fontWeight="400">
                Describe your symptoms and receive preliminary medical advice
                from our AI-powered chatbot
              </Text>
              <Text
                textColor="#101828"
                mt="1.88rem"
                fontSize="1rem"
                fontWeight="500"
                fontFamily={`'GT-Eesti', sans-serif`}
              >
                Try an example
              </Text>

              <Flex mt="1.5rem" direction={{ base: "column", md: "row" }} gap={{base:"1rem", md:"1.5rem"}}>
                <Box
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  py="0.5rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[0]);
                  }}
                  cursor={"pointer"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  <Text>Experiencing persistent or severe headaches</Text>
                </Box>

                <Box
                  px="1rem"
                  py="0.5rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[1]);
                  }}
                  cursor={"pointer"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  <Text>I have been running a fever</Text>
                </Box>
              </Flex>
              <Flex my="2rem" direction={{ base: "column", md: "row" }}  gap={{base:"1rem", md:"1.5rem"}}>
                <Box
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  py="0.5rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[2]);
                  }}
                  cursor={"pointer"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  <Text>Feeling unusually tired or fatigued</Text>
                </Box>

                <Box
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  py="0.5rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[3]);
                  }}
                  cursor={"pointer"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  <Text>I have a persistent cough</Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        ) : (
          <Messages messages={messages} />
        )}
        <Box>
          <SubmitePage
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            loading={loading}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Chat;
