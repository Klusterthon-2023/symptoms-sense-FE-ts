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

const WelcomePage = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const worksData = [
    {
      no: 1,
      header: "Tell us Tour Symptoms",
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
            py={{ base: "1rem", md: "5rem" }}
            height={{ base: "36rem", md: "48rem" }}
            direction={{ base: "column", md: "row" }}
          >
            <Box
            mx="auto"
              width={{ base: "90%", md: "33.4rem" }}
              height={{ base: "10rem", md: "19.8rem" }}
              mt={{ base: "0rem", md: "10rem" }}
              ml={{base:"",md:"5rem"}}
            >
              <Heading
                textColor="#ffff"
                fontSize={{ base: "2rem", md: "3.125rem" }}
                maxWidth={{ base: "90%", md: "33.375rem" }}
                fontFamily="Inter"
                fontWeight="600"
              >
                Empowering Health Decisions with AI
              </Heading>

              <Text
                mt="2.19rem"
                textColor="#ffff"
                fontSize={{ base: "1rem", md: "1.25rem" }}
                maxWidth={{ base: "90%", md: "30.375rem" }}
                fontFamily="Inter"
                fontWeight={{ base: "400", md: "500" }}
              >
                Describe your symptoms and receive quick preliminary medical
                advice from an AI-powered chatbot
              </Text>

              <Button
                mt={{base:"1rem",md:"2.19rem"}}
                width="fit-content"
                px="1.5rem"
                bg="#3E97FF"
                borderRadius="0.38rem"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Check Your Symptom
              </Button>
            </Box>
            <Spacer />

            <Box
            mb={{base:"1rem", md:"0"}}
              mx={{ base: "auto", md: "" }}
              width={{ base: "19rem", md: "50.199rem" }}
              height={{ base: "15rem", md: "35rem" }}
              borderRadius="1.5rem"
            >
              <Image src="https://baticali.sirv.com/Klusterthon2023/sample.png" />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box
        width="100%"
        mx={{ base: "auto", md: "0" }}
        height={{ base: "56rem", md: "34rem" }}
        bg="#EEF6FF"
      >
        <Box maxWidth={{ base: "90%", md: "90rem" }} mx="auto" width="100%">
          <Box mx="auto" maxWidth="76rem" maxHeight="22.1rem" py="6.25rem">
            <Box mb="3.75rem" mx="auto" maxWidth="29.9375rem" height="100%">
              <Heading
                textColor="#181C32"
                fontSize={{ base: "1.5rem", md: "3.125rem" }}
                maxWidth="33.375rem"
                fontFamily="Inter"
                fontWeight="600"
                textAlign="center"
              >
                How SymptomSense Works
              </Heading>
            </Box>

            <Flex
              width={{ base: "90%", md: "76rem" }}
              direction={{ base: "column", md: "row" }}
              gap="1.5rem"
            >
              {worksData.map((work) => (
                <Box width="100%" maxW="24.4rem" maxH="12.6rem">
                  <Box
                    mx="auto"
                    textAlign="center"
                    mb="0.81rem"
                    bg="white"
                    borderRadius="50%"
                    width="2.0625rem"
                    height="2.0625rem"
                  >
                    {work.no}
                  </Box>

                  <Heading
                    textAlign="center"
                    textColor="#181C32"
                    fontSize="1.25rem"
                    fontWeight="600"
                    mb="0.81rem"
                  >
                    {work.header}
                  </Heading>

                  <Text
                    textAlign="center"
                    textColor="#0A0E24"
                    fontSize="1.125rem"
                    fontWeight="400"
                  >
                    {work.note}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height={{ base: "25rem", md: "34rem" }}>
        <Box
          maxWidth={{ base: "90%", md: "90rem" }}
          mx="auto"
          py={{ base: "1rem", md: "6.25rem" }}
          width="100%"
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
          >
            <Box mx={{ base: "auto", md: "0" }}>
              <Heading
                textColor="#ffff"
                fontSize={{ base: "1.25rem", md: "2.75rem" }}
                maxWidth={{ base: "90%", md: "52.5rem" }}
                height={{ base: "4rem", md: "7rem" }}
                fontFamily="Inter"
                fontWeight="700"
                textAlign="center"
              >
                Share your Symptoms your with us, and then we take it from there
              </Heading>

              <Box display="flex" justifyContent="center" width="100%">
                <Button
                  mx="auto"
                  mt="1.88rem"
                  width="7.06rem"
                  px="1.5rem"
                  bg="#3E97FF"
                  borderRadius="0.38rem"
                >
                  Try Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box width="100%" height="100%" mb="6.25rem">
        <Box maxWidth="90rem" mx="auto" width="100%">
          <Flex
            direction={{ base: "column", md: "row" }}
            mx="auto"
            maxWidth={{ base: "90%", md: "76rem" }}
            maxHeight="22.1rem"
          >
            <Flex direction={{ base: "column", md: "row" }} width="100%">
              <Box display="flex" alignItems="center" gap="6px">
                <Box width="2rem" aspectRatio="1/1">
                  <Image
                    src={"https://baticali.sirv.com/Klusterthon2023/logo.png"}
                    alt="Systems sense logo"
                    width="100%"
                    height="auto"
                    loading="lazy"
                  />
                </Box>
                <Text fontWeight={600} fontSize="1.25rem">
                  Symptom
                </Text>
                <Text fontWeight={300} fontSize="1.25rem">
                  Sense
                </Text>
              </Box>

              <Text>© {year} SymptomSense AI rights reserved</Text>
              <Spacer />

              <Link to="/">
                <Text mr="2.6rem">How to Works</Text>
              </Link>

              <Link to="/">
                <Text>Terms</Text>
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
