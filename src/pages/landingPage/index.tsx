import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Spacer,
} from "@chakra-ui/react";
import Header from "../../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import part1 from "../../assets/icons/part1.svg";
import part2 from "../../assets/icons/part2.svg";
import part3 from "../../assets/icons/part3.svg";
import { useMediaQuery } from '@chakra-ui/react'

const WelcomePage = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [isSmallScreen] = useMediaQuery('(max-width: 992px)')
  const worksData = [
    {
      no: 1,
      header: "Tell us Your Symptoms",
      note: "Sign up and speak naturally about your symptoms using the text or voice chat feature. Our AI listens and understands your health concerns.",
    },
    {
      no: 2,
      header: "AI Analysis in seconds",
      note: "Our advanced AI quickly analyzes your spoken symptoms, considering various factors to provide instant preliminary insights.",
    },
    {
      no: 3,
      header: "Personalized Recommendations",
      note: `Receive personalized recommendations on the AI's analysis. These suggestions are meant for informational purposes.`,
    },
  ];

  return (
    <>
      <Header />
      <Box
        overflowX="hidden"
        height="100%"
        w="100%"
        backgroundImage="url(https://baticali.sirv.com/Klusterthon2023/new-bg.png)"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box>
          <Flex
            mx="auto"
            width="100%"
            maxWidth={{ base: "90%", md: "93.8rem" }}
            py={{ base: "1rem", md: "8rem" }}
            // height={{ base: "36rem", md: "48rem" }}
            direction={{ base: "column", lg: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box
              mt={{ base: 0, lg: "3rem" }}
              // ml={{ base: 0, lg: "5rem" }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={{ base: "center", lg: "flex-start" }}
              justifyContent={"center"}
              ml={{ base: 0, lg: "4rem" }}
            >
              <Heading
                textColor="#ffff"
                fontSize={{ base: "2rem", md: "3rem", "2xl": "5rem" }}
                fontWeight="500"
                fontFamily={`'GT-Eesti', sans-serif`}
                textAlign={{ base: "center", lg: "left" }}
                width={{ base: "90%", md: "80%" }}
              >
                Empowering Health Decisions with AI
              </Heading>

              <Text
                mt={{ base: "1rem", lg: "2.19rem" }}
                textColor="#ffff"
                fontSize={{ base: "1rem", md: "1.25rem", xl: "1rem", "2xl": "1.5rem" }}
                width={{ base: "90%", md: "70%" }}
                fontWeight={{ base: "500", md: "600" }}
                fontFamily={`'GT-Eesti-Light', sans-serif`}
                textAlign={{ base: "center", lg: "left" }}
              >
                Describe your symptoms and receive quick preliminary medical
                advice from an AI-powered chatbot.
              </Text>

              <Button
                mt={{ base: "1rem", md: "2.19rem" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Check Your Symptom
              </Button>
            </Box>
            <Spacer />

            <Box
              mt={{ base: "1rem", lg: "0" }}
              mx={{ base: "auto", lg: "" }}
              width={{ base: "95%", lg: "50.199rem" }}
            >
              {isSmallScreen ? <Image
                borderRadius="1rem" src="https://baticali.sirv.com/Klusterthon2023/sample-full.png" /> : <Image src="https://baticali.sirv.com/Klusterthon2023/sample.png" />}
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box
        width="100%"
        mx={{ base: "auto", md: "0" }}
        // height={{ base: "56rem", md: "34rem" }}
        py={{ base: "3rem", md: "5rem" }}
        bg="#EEF6FF"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box maxW={"90rem"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={"90%"}
        >
          <Box height="100%" maxWidth={{ base: "80%", md: "70%", xl: "52%" }}>
            <Heading
              textColor="#181C32"
              fontSize={{ base: "2rem", md: "3.125rem", lg: "4rem" }}
              fontWeight="500"
              textAlign="center"
              fontFamily={`'GT-Eesti', sans-serif`}
            >
              How SymptomSense Works
            </Heading>
          </Box>

          <Flex
            // width={{ base: "90%", md: "76rem" }}
            direction={{ base: "column", md: "row" }}
            mt={{ base: "2rem", md: "4.5rem" }}
            gap={"1.5rem"}
          >
            {worksData.map((work) => (
              <Box width="100%" maxW="25rem" maxH="12.6rem">
                <Box
                  mx="auto"
                  textAlign="center"
                  mb="0.81rem"
                  bg="white"
                  borderRadius="50%"
                  width="2.0625rem"
                  height="2.0625rem"
                  color={"#006CEA"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  {work.no}
                </Box>

                <Heading
                  textAlign="center"
                  textColor="#181C32"
                  fontSize="1.25rem"
                  fontWeight="500"
                  mb="0.81rem"
                  fontFamily={`'GT-Eesti', sans-serif`}
                >
                  {work.header}
                </Heading>

                <Text
                  textAlign="center"
                  textColor="#0A0E24"
                  fontSize="1.125rem"
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                  fontWeight="500"
                >
                  {work.note}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      <Box width="100%" height={{ base: "25rem", md: "34rem" }}>
        <Box
          maxWidth={{ base: "90%", md: "90rem" }}
          mx="auto"
          py={{ base: "1rem", md: "6.25rem" }}
          width="90%"
        >
          <Box
            mx="auto"
            maxWidth="76rem"
            maxHeight="22.1rem"
            py="6.25rem"
            borderRadius="1.5rem"
            border="1px solid rgba(64, 184, 118, 0.30)"
            bg="#006CEA"
            display="flex"
            justifyContent="center"
            position={"relative"}
          >
            <Image src={part2} position={"absolute"} top={"2.5rem"} left={"18rem"} />
            <Box mx={{ base: "auto", md: "0" }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <Heading
                textColor="#ffff"
                fontSize={{ base: "1.25rem", md: "2.25rem", lg: "2.75rem" }}
                maxWidth={{ base: "90%" }}
                height={{ base: "4rem", md: "7rem" }}
                fontWeight="500"
                textAlign="center"
                fontFamily={`'GT-Eesti', sans-serif`}
              >
                Share your Symptoms your with us, and then we take it from there
              </Heading>

              <Box display="flex" justifyContent="center" width="100%">
                <Button
                  mx="auto"
                  mt="1.88rem"
                  _hover={{
                    bg: "brand.active",
                    boxShadow: "none",
                  }}
                >
                  Check Your Symptom
                </Button>
                <Image src={part1} position={"absolute"} bottom={"2.5rem"} left={"13rem"} />
                <Image src={part3} position={"absolute"} bottom={0} right={"13rem"} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height="100%" mb="6.25rem">
        <Box maxWidth="90rem" mx="auto" width="90%">
          <Flex
            direction={{ base: "column", md: "row" }}
            mx="auto"
            maxWidth={{ base: "90%", md: "76rem" }}
            maxHeight="22.1rem"
          >
            <Flex direction={{ base: "column", md: "row" }} alignItems={"center"} width="100%">
              <Box display="flex" alignItems="center" gap="6px">
                <Box width="2rem" aspectRatio="1/1">
                  <Image
                    src={"https://baticali.sirv.com/Klusterthon2023/logo.svg"}
                    alt="Systems sense logo"
                    width="100%"
                    height="auto"
                    loading="lazy"
                  />
                </Box>
                <Text fontWeight={600} fontSize="1.25rem">
                  Symptom
                </Text>
                <Text fontFamily={`'GT-Eesti-Light', sans-serif`} fontWeight={300} fontSize="1.25rem">
                  Sense
                </Text>
              </Box>

              <Text color={"#7E8299"} ml={"1rem"} fontFamily={`'GT-Eesti-Light', sans-serif`} >© {year} SymptomSense AI rights reserved</Text>
              <Spacer />
              <Box display={"flex"}>
                <Link to="/">
                  <Text color={"#7E8299"} mr={{base:"1rem", md:"1.5rem", xl:"2.5rem"}}>How it Works</Text>
                </Link>

                <Link to="/">
                  <Text color={"#7E8299"}>Terms</Text>
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
