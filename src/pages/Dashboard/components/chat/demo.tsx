// Chat.tsx
import React, { useState } from 'react';
import {
  Box,
  Input,
  Flex,
  VStack,
  Avatar,
  Text,
  ChakraProvider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

interface Message {
  text: string;
  sender: 'client' | 'staff';
  timestamp: string;
}

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      h="100%"
      maxW="600px"
      mx="auto"
    >
      <VStack
        spacing="4"
        p="4"
        bg="gray.200"
        borderRadius="md"
        overflowY="auto"
        flex="1"
      >
        {messages.map((message, index) => (
          <Flex
            key={index}
            justify={message.sender === 'client' ? 'flex-end' : 'flex-start'}
          >
            <Box
              p="2"
              bg={message.sender === 'client' ? 'blue.500' : 'gray.300'}
              color="white"
              borderRadius="md"
              maxWidth="70%"
            >
              <Text>{message.text}</Text>
              <Text fontSize="xs" textAlign="right">
                {message.timestamp}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
      <Flex p="2">
        <InputGroup flex="1">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Box
              as="button"
              h="1.75rem"
              w="4.5rem"
              onClick={handleSendMessage}
              bg="blue.500"
              color="white"
              borderRadius="md"
            >
              Send
            </Box>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

// Usage example
const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', sender: 'client', timestamp: '12:00 PM' },
    { text: 'Hi there!', sender: 'staff', timestamp: '12:01 PM' },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      text: message,
      sender: 'client',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);

    // Simulate staff response after a delay
    setTimeout(() => {
      const staffResponse: Message = {
        text: 'How can I assist you?',
        sender: 'staff',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, staffResponse]);
    }, 1000);
  };

  return (
    <ChakraProvider>
      <Flex h="100vh" align="center" justify="center">
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </Flex>
    </ChakraProvider>
  );
};

export default ChatBox;



// import React, { useState } from "react";
// import {
//   Box,
//   Text,
//   Textarea,
//   Button,
//   Container,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Flex,
//   Image,
// } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage, selectMessages } from "../../../redux/chatSlice";
// import Mic from "../../../assets/icons/microphone-2.svg";


// const ChatBox: React.FC = () => {
//   const [inputText, setInputText] = useState<string>(""); // Specify the type for inputText
//   const messages = useSelector((state: any) => selectMessages(state)); // Use RootState for useSelector
//   const dispatch = useDispatch();

//   const aiGenerator = [
//     {
//         name: "Dr Sahrah",
//         response: "Hello Thank you for reaching out to me, what your symtoms like",
//     },
//     {
//         name: "Dr Scheman",
//         response: "Hello Thank you for reaching out to me, what your symtoms like",
//     }
//   ]

//   const handleSendMessage = () => {
//     if (inputText.trim() === "") {
//       return;
//     }

//     const newMessage = {
//       text: inputText,
//       timestamp: new Date().toLocaleString(),
//     };

//     dispatch(addMessage(newMessage));
//     setInputText("");
//   };

//   return (
//     <Container maxW="100%" height="90vh">
//       <Box
//         p="20px"
//         minH="80vh"
//         overflowY="auto"
       
//       >



//         {messages.map((message, index) => (
//         <Flex
//         key={index}
//         justify={message.sender === 'client' ? 'flex-end' : 'flex-start'}
//       >
//         <Box
//           p="2"
//           bg={message.sender === 'client' ? 'blue.500' : 'gray.300'}
//           color="white"
//           borderRadius="md"
//           maxWidth="70%"
//         >
//           <Text>{message.text}</Text>
//           <Text fontSize="xs" textAlign="right">
//             {message.timestamp}
//           </Text>
//         </Box>
//       </Flex>

//           // <Box key={index} mb="10px">
//           //   <Text fontSize="sm" color="gray.500">
//           //     {message.timestamp}
//           //   </Text>
//           //   <Text fontSize="md">{message.text}</Text>
//           // </Box>
//         ))}
//       </Box>
//       <Flex direction="row" mt="2">
//         <InputGroup>
//           <Input
//             placeholder="Type your message"
//             resize="none"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           />
//           <InputRightElement>
//             <Image src={Mic} />
//           </InputRightElement>
//         </InputGroup>
//       </Flex>

//       <Button
//         borderRadius="0.5rem"
//         float="right"
//         mt="10px"
//         colorScheme="red"
//         onClick={handleSendMessage}
//       >
//         Get Advice
//       </Button>
//     </Container>
//   );
// };

// export default ChatBox;
