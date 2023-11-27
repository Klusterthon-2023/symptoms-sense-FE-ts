import { Flex, Box } from "@chakra-ui/react";
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
    setIdent(childId);
    handleGetChatHistory();
  }, [ident, reload]);

  console.log(ident);
  const handleGetChatHistory = async () => {
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

    console.log(response.data.chat_history);
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

    console.log(payload)

    const response = await axios.post(
      `https://adewole.pythonanywhere.com/api/${id}/PostRequest/Create/`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    console.log(response.data.identifier);

    setMessages((old) => [...old, { from: "me", text: data }]);

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
