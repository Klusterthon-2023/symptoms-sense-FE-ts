import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import Messages from "../Messages";
import SampleText from "../data/info";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectId } from "../../../../redux/userSlice";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../../../../redux/authSlice";
import SubmitePage from "../Footer";
import { addChat, addMessage, selectChats } from "../../../../redux/chatSlice";

interface Message {
  from: string;
  text: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const [newChatState, setNewChatState] = useState(true);
  const [sampleState, setSampleState] = useState("");
  const accessToken = useSelector(selectAccessToken);
  const [ident, setIdent] = useState("");
  const id = useSelector(selectId);
  const [messages, setMessages] = useState<Message[]>([]);
  const data: string[] = [
    "I have a headache that refuses to go",
    "Have you been running a fever",
    "Another piece of information",
    "Another piece of information",
    // Add more items as needed
  ];

  const chats = useSelector(selectChats);
  const [messageText, setMessageText] = useState("");

  const handleSentMessage = (chatId: string) => {
    const timestamp = new Date().toISOString();
    const message = { text: messageText, timestamp };
    dispatch(addMessage({ id: chatId, message }));
    setMessageText("");
  };

  const handleCreateChat = () => {
    const id = generateUniqueId(); // You'll need to implement this function
    dispatch(addChat({ id, messages: [] }));
  };

  const generateUniqueId = () => {
    // You can implement your own unique ID generation logic here
    // For simplicity, using a basic random string for illustration
    return Math.random().toString(36).substring(7);
  };

  const [inputMessage, setInputMessage] = useState<string>("");
  // const handleOldSendMessage = () => {
  //   // Your handleSendMessage logic here
  //   alert(sampleState);
  // };

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

  // Example usage

  // useEffect(() => {
  //   var uniqueId = generateUUID();
  //   console.log(uniqueId);
  // }, [])
  useEffect(() => {
    if (newChatState === true) {
      var uniqueId = generateUUID();
      setIdent(uniqueId);
    } else {
      setIdent(ident);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data: string = inputMessage;

    const payload = {
      request: data,
      identifier: ident,
    };

    const response = await axios.post(
      `https://adewole.pythonanywhere.com/api/${id}/PostRequest/Create/`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          // You can add other headers as needed
        },
      }
    );

    console.log(response);

    setMessages((old) => [...old, { from: "me", text: data }]);

    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [
        ...old,
        { from: "computer", text: response.data.detail },
      ]);
    }, 1000);
  };

  const sampleFxn = (text: string) => {
    setInputMessage(text);

    const newdata: string = text;

    setMessages((old) => [...old, { from: "me", text: newdata }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: newdata }]);
    }, 1000);
  };

  return (
    <Flex ml="2.5rem" w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "90%"]} h="90%" flexDir="column">
        {/* <Divider /> */}

        {messages.length === 0 ? (
          <Box position="relative" width="100%" h="80%">
            <Box></Box>
            <Box position="absolute" bottom="0">
              <Heading
                textColor="#101828"
                fontSize="1.5rem"
                fontWeight="700"
                lineHeight="2rem"
              >
                How can I help you today?
              </Heading>
              <Text textColor="#667085" fontSize="1rem" fontWeight="400">
                Describe your symptoms and receive preliminary medical advice
                from our AI-powered chatbot
              </Text>
              <Text
                textColor="#101828"
                mt="1.88rem"
                fontSize="1rem"
                fontWeight="400"
              >
                Try an example
              </Text>

              <Flex direction={{ base: "column", md: "row" }}>
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
                  onClick={() => {
                    sampleFxn(data[0]);
                  }}
                >
                  <Text>I have a headache that refuses to go</Text>
                </Box>

                <Box
                  ml="1.5rem"
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="19.3rem"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="1.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[1]);
                  }}
                >
                  <Text>My head hurt so much</Text>
                </Box>
              </Flex>
              <Flex mt="2rem" direction={{ base: "column", md: "row" }}>
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
                >
                  <Text>I have a headache that refuses to go</Text>
                </Box>

                <Box
                  ml="1.5rem"
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="19.3rem"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="1.5rem"
                  display="flex"
                  alignItems="center"
                >
                  <Text>I dont what to take this fever</Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        ) : (
          <Messages messages={messages} />
        )}
        <Divider />
        <SubmitePage
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
