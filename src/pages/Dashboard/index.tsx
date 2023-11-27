import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Image,
  Spacer,
  useDisclosure,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar/dashboardNavbar";
import pen from "../../assets/icons/pen.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import ChatBox from "./components/chat";
import ChatHistory from "./components/chat/demo";
import { RootState } from "../../redux/store";
import RoleBox from "./components/role";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../../redux/userSlice";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../../redux/authSlice";
import { logout } from "../../redux/authSlice";
import NewChat from "./components/chat/newChat";

interface MapHistoryItem {
  id: string;
  date_time_created: Date;
  date_time_modified: Date;
  title: string;
  identifier: string;
}

const Dashboard = () => {
  const [mapHistory, setMapHistory] = useState<MapHistoryItem[]>([]);
  const [seletectChatTYpe, setSelectectChatType] = useState("chat");
  const [parentState, setParentState] = useState(true);
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const id = useSelector(selectId);

  const handleHistory = async () => {
    const response = await axios.get(
      `https://adewole.pythonanywhere.com/api/${id}/History/ListChatIdentifiers/`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    setMapHistory(response.data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleHistory();
    }, 10000);
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
    const history = "chatHistory";

    setSelectectChatType(history);
    console.log(role);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    return () => { };
  }, [isAuthenticated]);

  if (!accessToken || !isAuthenticated) {
    return <Box width={"100vw"} height={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        thickness='8px'
        speed='0.5s'
        emptyColor='gray.200'
        color='brand.main'
        size='xl'
      />
    </Box>;
  }

  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <Navbar />

      <Box width="90%" mt="4rem" mx="auto" display="flex">
        <Box borderRight="1px solid #f5f5f5">
          <Box display={{ base: "none", md: "block" }}>
            <Box width="14rem" pr="2rem" mt="2rem">
              <Box
                width="12.375rem"
                height="2.375rem"
                bg="#3E97FF"
                borderRadius="0.375rem"
                display="flex"
                flexWrap="wrap"
                cursor="pointer"
                onClick={() => {
                  setSelectectChatType("newChat");
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
              <Heading
                mt="1.03rem"
                ml="0.rem"
                textColor="#A1A5B7"
                fontSize="0.75rem"
                fontWeight="500"
              >
                TODAY
              </Heading>
              <Flex
                mt="1.5rem"
                direction="column"
                width="12.375rem"
                height="400px"
                overflow="hidden"
                flexDirection="column"
              >
                <Flex
                  height="100%"
                  marginRight="-50px"
                  paddingRight="50px"
                  overflowX="hidden"
                  overflowY="scroll"
                >
                  <Box></Box>
                  <Box>
                    {mapHistory.map((map, index) => (
                      <RoleBox
                        hist={map}
                        changeBg={changeBg}
                        handleClick={handleClick}
                      />
                    ))}
                  </Box>
                </Flex>
              </Flex>

              <Box
                position="absolute"
                bottom="0"
                width="14rem"
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
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontSize="0.75rem" textColor="#fff">
                      {userName.firstname?.slice(0, 1)?.toUpperCase()}
                    </Text>
                  </Box>
                </Box>
                <Box ml="0.63rem">
                  <Text fontSize="0.875rem" fontWeight="500">
                    {userName.firstname?.slice(0, 10)}{" "}
                    {userName.lastname?.slice(0, 10)}
                  </Text>
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
          {seletectChatTYpe === "chat" && <ChatBox />}

          {seletectChatTYpe === "chatHistory" && (
            <Box>
              <ChatHistory childId={changeBg} reload={changeBg} />
            </Box>
          )}

          {seletectChatTYpe === "newChat" && (
            <NewChat parentState={parentState} setChildState={setParentState} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
