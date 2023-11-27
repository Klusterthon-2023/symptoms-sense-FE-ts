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
  parentState: boolean;
  setChildState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChat: React.FC<ChildComponentProps> = ({
  parentState,
}) => {
  const [childState, setLocalChildState] = useState(false);
  const [newChatState, setNewChatState] = useState(true);
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
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
      // Update child state when parent state changes
    setLocalChildState(parentState);
    setNewChatState(false);
    setIdent("");
    setMessages([]);
  }, [parentState]);

  const [messageText, setMessageText] = useState("");

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

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

  useEffect(() => {
    if (newChatState === true) {
      var uniqueId = generateUUID();
      setIdent(uniqueId);
    } else {
      setIdent(ident);
    }
  }, [ident]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    setLoading(true)
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
    setLoading(false)
  };

  const sampleFxn = async (text: string) => {
    setIdent("");

    setInputMessage(text);

    const newdata: string = text;

    const payload = {
      request: newdata,
      identifier: ident,
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

    console.log(response);

    setMessages((old) => [...old, { from: "me", text: newdata }]);

    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [
        ...old,
        { from: "computer", text: response.data.detail },
      ]);
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

              <Flex mt="1.5rem" direction={{ base: "column", md: "row" }}>
                <Box
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
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
                  width="fit-content"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    sampleFxn(data[1]);
                  }}
                >
                  <Text>My head hurt so much</Text>
                </Box>
              </Flex>
              <Flex my="2rem" direction={{ base: "column", md: "row" }}>
                <Box
                  px="1rem"
                  fontSize="1rem"
                  fontWeight="500"
                  width="fit-content"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
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
                  width="fit-content"
                  height="2.75rem"
                  bg="#F5F6FA"
                  borderRadius="0.5rem"
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

export default NewChat;