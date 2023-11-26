import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useTheme,
  Image,
  Spacer,
  useDisclosure,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import Navbar from "../../../components/navbar/dashboardNavbar";
import pen from "../../assets/icons/pen.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import user from "../../assets/icons/user.svg";
import ChatBox from "./chat";
import PopMessage from "./modal";
import { RootState } from "../../../redux/store";
import RoleBox from "./role";
import { useLocation, useNavigate } from "react-router-dom";
import { navigationData } from "./data/data";
import ChatVoice from "./voice";
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectIsAuthenticated } from '../../../redux/authSlice';
import { logout } from "../../../redux/authSlice";

interface role {
  text: string;
  id: number;
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
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [activeIndex, setActiveIndex] = useState<number>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [changeBg, setChangeBg] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (role: string) => {
    setChangeBg(role);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }

 
    return () => {
    };
  }, [isAuthenticated]);

  if (!accessToken || !isAuthenticated) {
   
    return <div>Loading...</div>;
  }

  return (
    <Box width="100%" height="100vh">
      <PopMessage isOpen={isOpen} onClose={onClose} />
      <Navbar />
      <Box width="90%" height="100%" mx="auto" display="flex">
        <Box
          display={{ base: "none", md: "block" }}
          borderRight="1px solid #f5f5f5"
        >
          <Box>
            <Box pr="2rem" mt="2rem">
              <Box
                width="12.375rem"
                height="2.375rem"
                bg="#3E97FF"
                borderRadius="0.375rem"
                display="flex"
                flexWrap="wrap"
                onClick={() => {
                  navigate('/dashboard')
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

              <Accordion index={activeIndex} allowMultiple mt="2rem">
                {navigationData.map((nav, key) => {
                  return (
                    <AccordionItem borderWidth={0}>
                      <h2 className="w-full">
                        <AccordionButton
                          h="3.2rem"
                          padding="1.2rem 1.875rem"
                          fontSize="0.875rem"
                          fontWeight={800}
                          color="#8D8C8C"
                          _expanded={{ color: "#1E1E1E" }}
                          onClick={() => setActiveIndex(key)}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            <Text
                              fontSize=".75rwm"
                              fontWeight="500"
                              textColor="#A1A5B7"
                            >
                              {nav.title}
                            </Text>
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel p={0}>
                        {nav?.subLinks.map((sub) => {
                          const active = pathname.includes(sub.link);
                          return (
                            <Box
                              w="100%"
                              display="flex"
                              alignItems="center"
                              fontWeight={800}
                              fontSize="0.875rem"
                              gap="0.625rem"
                              _hover={{
                                backgroundColor: "#F5F5F5",
                              }}
                              cursor="pointer"
                              h="3.2rem"
                              padding="1rem 1.5rem"
                              className={`${active ? "bg-[#F5F5F5]" : ""}`}
                              onClick={() => {
                                navigate(sub.link);
                                onClose();
                              }}
                            >
                              {sub?.title}
                            </Box>
                          );
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>

        

              <Box
                bg="#fff"
                position="absolute"
                bottom="0"
                width="12.374rem"
                height="2.375rem"
                display="flex"
              >
                <Box>
                  <img src={user} alt="" />
                </Box>
                <Box ml="0.63rem">
                  <Text>{userName.username?.slice(0, 10)}</Text>
                </Box>
                <Spacer />
                <Box
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "6.25rem",
                    float: "right",
                  }}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <img src={logoutIcon} alt="" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Spacer />
        <Box
          width="100%"
          sx={{
            paddingX: { xs: "1rem", sm: "2rem", lg: "5rem", xl: "10rem" },
          }}
        >
          <ChatBox />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
