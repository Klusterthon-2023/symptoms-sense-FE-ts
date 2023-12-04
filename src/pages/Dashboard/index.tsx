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
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar/dashboardNavbar";
import logoutIcon from "../../assets/icons/logout.svg";
import ChatBox from "./components/chat";
import { RootState } from "../../redux/store";
import RoleBox from "./components/role";
import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../../redux/userSlice";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../../redux/authSlice";
import { logout } from "../../redux/authSlice";

interface MapHistoryItem {
  id: string;
  date_time_created: Date;
  date_time_modified: Date;
  title: string;
  identifier: string;
}

interface Message {
  from: string;
  text: string;
}

const Dashboard = () => {
  const [mapHistory, setMapHistory] = useState<MapHistoryItem[]>([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = useSelector((state: RootState) => state.user);
  const [childId, setChildId] = useState("");
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const id = useSelector(selectId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newChatState, setNewChatState] = useState(true);

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
    handleHistory()
  }, []);

  const handleClick = async (role: string) => {
    setChildId(role);
    onClose();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    return () => { };
  }, [isAuthenticated]);

  if (!accessToken || !isAuthenticated) {
    return (
      <Box
        width={"100vw"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner
          thickness="8px"
          speed="0.5s"
          emptyColor="gray.200"
          color="brand.main"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <Navbar isDrawerOpen={isOpen} onDrawerOpen={onOpen} />

      <Box width="100%" mt={{ base: "1.5rem", md: "4rem" }} mx="auto" display="flex" px={{ base: "1rem", md: "2rem", "xl": "3rem" }}>
        <Box borderRight="1px solid #E1E3EA" bg={"#fff"} display={{ base: "none", md: "block" }} position={{ base: "absolute", md: "relative" }}
          bottom={0} maxH="94vh" >
          <Box>
            <Box width="14rem" pr="2rem" mt="2rem">
              <Box
                width="12.375rem"
                py={"0.5rem"}
                bg="#3E97FF"
                borderRadius="0.375rem"
                display="flex"
                alignItems={"center"}
                flexWrap="wrap"
                cursor="pointer"
                onClick={() => {
                  messages.length > 0 && setMessages([]);
                  setLoading(false);
                  setNewChatState(true)
                }}
              >
                <Box
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml="0.75rem"
                  width="1.25rem"
                  height="1.25rem"
                  borderRadius="0.21rem"
                >
                  <Image src={"https://baticali.sirv.com/Klusterthon2023/notepad-edit.svg"} />
                </Box>
                <Text
                  my="0.56rem"
                  ml="0.31rem"
                  color="#fff"
                  lineHeight="0.875rem"
                  fontSize={"1rem"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  <strong>New Chat</strong>
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
                height={{ base: "30rem", sm: "30rem", md: "50rem", lg: "25rem", "2xl": "80rem" }}
                overflow="hidden"
                flexDirection="column"
              >
                <Flex
                  // height="100%"
                  maxHeight={"80%"}
                  marginRight="-50px"
                  paddingRight="50px"
                  overflowX="hidden"
                  overflowY="auto"
                >
                  <Box>
                    {mapHistory.map((map, index) => (
                      <RoleBox
                        hist={map}
                        changeBg={childId}
                        handleClick={handleClick}
                      />
                    ))}
                  </Box>
                </Flex>
              </Flex>

              <Box
                position="absolute"
                bottom={0}
                width="12.375rem"
                display="flex"
                alignItems="center"
                mb={{ base: "2rem", lg: "3rem", "2xl":"1rem" }}
              >
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Avatar
                    name={`${userName.firstname} ${userName.lastname}`}
                    textColor="#fff"
                    mr="0.5rem"
                    bg="#50CD89"
                    size={"sm"}
                    p={"0.35rem"}
                    float={"left"}
                  ></Avatar>
                  <Text ml="0.63rem" fontSize={{base: "0.75rem", "md":"1rem", xl:"1.25rem"}} fontFamily={`'GT-Eesti', sans-serif`} fontWeight="500">
                    {userName.firstname}{" "}
                    {userName.lastname}
                  </Text>
                </Box>
                <Spacer />
                <Box
                  float="right"
                  onClick={() => {
                    dispatch(logout());
                  }}
                  cursor={"pointer"}
                >
                  <Image src={logoutIcon} alt="" />
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
        <Spacer />
        {isOpen &&
          <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xs"}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth='1px'>
                <Box
                  width="12.375rem"
                  py={"0.5rem"}
                  bg="#3E97FF"
                  borderRadius="0.375rem"
                  display="flex"
                  alignItems={"center"}
                  flexWrap="wrap"
                  cursor="pointer"
                  onClick={() => {
                    messages.length > 0 && setMessages([]);
                    setLoading(false);
                    setNewChatState(true)
                  }}
                >
                  <Box
                    cursor="pointer"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    ml="0.75rem"
                    width="1.25rem"
                    height="1.25rem"
                    borderRadius="0.21rem"
                  >
                    <Image src={"https://baticali.sirv.com/Klusterthon2023/notepad-edit.svg"} />
                  </Box>
                  <Text
                    my="0.56rem"
                    ml="0.31rem"
                    color="#fff"
                    lineHeight="0.875rem"
                    fontSize={"1rem"}
                    fontFamily={`'GT-Eesti-Light', sans-serif`}
                  >
                    <strong>New Chat</strong>
                  </Text>
                </Box>
              </DrawerHeader>
              <DrawerBody>
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
                  overflow="hidden"
                  flexDirection="column"
                >
                  <Flex
                    marginRight="-50px"
                    paddingRight="50px"
                    overflowX="hidden"
                    overflowY="auto"
                  >
                    <Box>
                      {mapHistory.map((map, index) => (
                        <RoleBox
                          hist={map}
                          changeBg={childId}
                          handleClick={handleClick}
                        />
                      ))}
                    </Box>
                  </Flex>
                </Flex>

              </DrawerBody>

              <DrawerFooter borderTopWidth='0.25px'>
                <Box
                  display="flex"
                  alignItems="center"
                  width={"100%"}
                >
                  <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Avatar
                      name={userName.firstname?.slice(0, 10)}
                      textColor="#fff"
                      mr="0.5rem"
                      bg="#50CD89"
                      size={"sm"}
                      p={"0.35rem"}
                      float={"left"}
                    ></Avatar>
                    <Text ml="0.63rem" fontSize="0.75rem" fontWeight="500">
                      {userName.firstname}{" "}
                      {userName.lastname}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box
                    float="right"
                    onClick={() => {
                      dispatch(logout());
                    }}
                    cursor={"pointer"}
                  >
                    <Image src={logoutIcon} alt="" />
                  </Box>
                </Box>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
        <Box width="100%" id="chatArea">
          <ChatBox messages={messages} setMessages={setMessages}
            newChatState={newChatState} setNewChatState={setNewChatState}
            childId={childId} setChildId={setChildId} loading={loading}
            setLoading={setLoading} handleHistory={handleHistory} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
