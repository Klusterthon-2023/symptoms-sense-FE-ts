// eslint-disable-next-line react-hooks/exhaustive-deps
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
interface ChildComponentProps {
  childId: string;
  reload: string;
}

const ChatHistory: React.FC<ChildComponentProps> = ({ childId, reload }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (reload === ident){}
    handleGetChatHistory();
  }, [ident, reload]);

  const handleGetChatHistory = async () => {
    const response = await axios.get(
      `https://adewole.pythonanywhere.com/api/${id}/History/${childId}/ListChatIdentifierHistory/`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  
    setMessages([])
    response.data.chat_history.map((oldmap: any) => {
     
      setMessages((old) => [...old, { from: "me", text: oldmap.request }]);

      setInputMessage("");

      setMessages((old) => [
        ...old,
        { from: "computer", text: oldmap.response },
      ]);
    });

    console.log(response.data.chat_history);
  };

  const [messageText, setMessageText] = useState("");

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  const [inputMessage, setInputMessage] = useState<string>("");

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
        <Messages messages={messages} />

        <Box>
          <SubmitePage
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatHistory;
