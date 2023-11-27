import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  useTheme,
  Image,
  Spacer,
  useDisclosure,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar/dashboardNavbar";
import pen from "../../assets/icons/pen.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import ChatBox from "./components/chat";
import ChatHistory from "./components/chat/demo";
import { RootState } from "../../redux/store";
import RoleBox from "./components/role";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../../redux/userSlice";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../../redux/authSlice";
import { logout } from "../../redux/authSlice";

interface role {
  text: string;
  id: number;
}

interface MapHistoryItem {
  id: string;
  date_time_created: Date;
  date_time_modified: Date;
  title: string;
  identifier: string;
}
const getDate = new Date().getDay();

const todayData = [
  {
    id: 1,
    text: "Experience persistence thinking after an abused of vitamin C",
  },
  { id: 2, text: "Feeling persistence thinking after an abused of vitamin C" },
  { id: 3, text: "I have a persistence thinking after an abused of vitamin C" },
  { id: 4, text: "I have a persistence thinking after an abused of vitamin C" },
];
const yesterdayData = [
  {
    id: 1,
    text: "Experience persistence thinking after an abused of vitamin C",
  },
  { id: 2, text: "Feeling persistence thinking after an abused of vitamin C" },
  { id: 3, text: "I have a persistence thinking after an abused of vitamin C" },
  { id: 4, text: "I have a persistence thinking after an abused of vitamin C" },
];

const datas = [
  {
    name: "Today",
    id: "1",
    date: getDate,
    data: todayData,
  },
  {
    name: "Yesterday",
    id: "2",
    date: getDate - 1,
    data: yesterdayData,
  },
];

const Dashboard = () => {
  const [mapHistory, setMapHistory] = useState<MapHistoryItem[]>([]);
  // const [childState, setChildState] = useState(true)
  // const [chatHistoryState, setChatHistoryState] = useState(false);

  const [seletectChatTYpe, setSelectectChatType] = useState('chat')
  const [parentState, setParentState] = useState(true);
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const id = useSelector(selectId);

  const handleSingleChatHistory = async (childId: string) => {
    const response = await axios.get(
      `https://adewole.pythonanywhere.com/api/${id}/History/${childId}/ListChatIdentifiers//`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(response.data);
    console.log(response);
  };

  const handleHistory = async () => {
    const response = await axios.get(
      `https://adewole.pythonanywhere.com/api/${id}/History/ListChatIdentifiers/`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    // console.log(response.data);
    setMapHistory(response.data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleHistory();
    }, 10000); // Update every 10 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    onOpen();
  }, []);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = useSelector((state: RootState) => state.user);
  const [changeBg, setChangeBg] = useState("");


  const handleClick = async (role: string) => {
    setChangeBg(role);
    const history = "chatHistory"

   setSelectectChatType(history)
    console.log(role)
    // const response = await axios.get(
    //   `https://adewole.pythonanywhere.com/api/${id}/History/${role}/ListChatIdentifierHistory/`,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + accessToken,
    //     },
    //   }
    // );
    // console.log(response.data);

  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    return () => {};
  }, [isAuthenticated]);

  if (!accessToken || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <Navbar />
     
      <Box width="90%" mt="4rem" mx="auto" display="flex">
        <Box  borderRight="1px solid #f5f5f5" >
          <Box   display={{ base: "none", md: "block" }}>
        
              <Box width="14rem" pr="2rem" mt="2rem" >
                <Box
                  width="12.375rem"
                  height="2.375rem"
                  bg="#3E97FF"
                  borderRadius="0.375rem"
                  display="flex"
                  flexWrap="wrap"
                  cursor="pointer"
                  onClick={() => {
                    setParentState(!setParentState)
                  }}
                >
                  <Box
                    cursor="pointer"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    ml="0.75rem"
                    my="0.56rem"
                    width="1.04rem"
                    height="1.04rem"
                    bgColor="#78B6FF"
                    borderRadius="0.21rem"
                  >
                    <Image src={pen} />
                  </Box>
                  <Text
                    my="0.56rem"
                    ml="0.31rem"
                    color="#fff"
                    lineHeight="0.875rem"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                    }}
                  >
                    <strong>New</strong> Chat
                  </Text>
                </Box>

                <Flex mt="1.5rem" direction="column" width="100%" height="">
                  <Box>
                    <Heading
                      ml="0.94rem"
                      textColor="#A1A5B7"
                      fontSize="0.75rem"
                      fontWeight="500"
                    >
                      TODAY
                    </Heading>
                  </Box>
                  <Box mt="1.03rem">
                    {mapHistory.map((map, index) => (
                      <RoleBox
                        hist={map}
                        changeBg={changeBg}
                        handleClick={handleClick}
                      />
                    ))}
                  </Box>
                </Flex>

                
                <Box
                  maxWidth="100%"
                  position="absolute"
                  bottom="0"
                  width="12.374rem"
                  height="3.375rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      bg="#50CD89"
                      width="2.5rem"
                      height="2.5rem"
                      borderRadius="6.25rem"
                    >
                      <Text></Text>
                    </Box>
                  </Box>
                  <Box ml="0.63rem">
                    <Text>{userName.username?.slice(0, 10)}</Text>
                  </Box>
                  <Spacer />
                  <Box
                    float="right"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <Image src={logoutIcon} alt="" />
                  </Box>
                </Box>
              </Box>
          
          </Box>
        </Box>
        <Spacer />
        <Box width="100%">
          
          
          {seletectChatTYpe === "chat" && (
              <ChatBox  parentState={parentState} setChildState={setParentState} />
          )}
          
          {seletectChatTYpe === "chatHistory" && (
             <Box>
              <ChatHistory childId={changeBg} reload={changeBg} />
             </Box>
          )}

          {}

          
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
