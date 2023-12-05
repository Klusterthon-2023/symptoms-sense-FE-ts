import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  Image,
  Input,
  InputRightElement,
  InputGroup,
  Checkbox,
  useDisclosure,
  SimpleGrid,
  Link,
  useColorMode,
  AbsoluteCenter,
  Divider
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TermModal from "./modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { login } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import mode from "../../../src/assets/icons/night-day.svg";

interface FormValues {
  email: string;
  password: string;
  re_password: string;
  first_name: string;
  last_name: string;
}

const Signup: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    toggleButtonDisabled();
  };
  const toggleButtonDisabled = () => {
    setButtonDisabled(!isButtonDisabled);
  };
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const initialValues: FormValues = {
    email: "",
    password: "",
    re_password: "",
    first_name: "",
    last_name: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required Required"),
    password: Yup.string().required("Please add your password").min(8, 'Password must be at least 7 characters'),
    re_password: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
    first_name: Yup.string().required("First name is required Required"),
    last_name: Yup.string().required("Last name is required Required"),
  });

  const handlePassword = () => {
    setShow(!show);
  };

  const handleConfirmPassword = () => {
    setShowConfirm(!showConfirm);
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `https://adewole.pythonanywhere.com/api/UsersAuths/`,
        values
      );

      toast.success("Signup successful. You can login now");
      navigate('/login')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.data && error.response?.data.hasOwnProperty('detail') && toast.error(error.response?.data['detail'])
        error.response?.data && error.response?.data.hasOwnProperty('first_name') && toast.error(`First name: ${error.response?.data['first_name']}`)
        error.response?.data && error.response?.data.hasOwnProperty('last_name') && toast.error(`Last name: ${error.response?.data['last_name']}`)
        error.response?.data && error.response?.data.hasOwnProperty('email') && toast.error(`Email: ${error.response?.data['email']}`)
        error.response?.data && error.response?.data.hasOwnProperty('password') && toast.error(`Password: ${error.response?.data['password']}`)
        error.response?.data && error.response?.data.hasOwnProperty('re_password') && toast.error(`Password again: ${error.response?.data['re_password']}`)
        !error.response?.status && toast.error("Network unavailable, please try again.")
      } else {
        toast.error("Error, please try again.")
      }
    }

    setLoading(false);
  };

  async function localAuth(user: any) {
    try {
      const response = await axios.post(
        `https://adewole.pythonanywhere.com/api/UsersAuths/GoogleAuth/`,
        {
          first_name: user.displayName.split(' ')[0],
          last_name: (user.displayName.split(' ')).pop(),
          email: user.email
        }
      );
      if (response) {
        const payload = {
          id: response.data.id,
          firstname: response.data.first_name,
          lastname: response.data.last_name,

        };
        dispatch(setUser(payload));
        dispatch(login(response.data.access_token));
        dispatch(
          setUser({
            id: response.data.user_id,
            firstname: response.data.first_name,
            lastname: response.data.last_name,
          })
        );
        localStorage.setItem('id', response.data.user_id)
        localStorage.setItem('firstname', response.data.first_name)
        localStorage.setItem('lastname', response.data.last_name)

        navigate('/dashboard')
        toast.success("Login successful");
      } else {
        toast.error("Invalid response data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.data && error.response?.data.hasOwnProperty('detail') && toast.error(error.response?.data['detail'])
        error.response?.data && error.response?.data.hasOwnProperty('email') && toast.error(`Email: ${error.response?.data['email']}`)
        error.response?.data && error.response?.data.hasOwnProperty('first_name') && toast.error(`First name: ${error.response?.data['first_name']}`)
        error.response?.data && error.response?.data.hasOwnProperty('last_name') && toast.error(`Last name: ${error.response?.data['last_name']}`)
        !error.response?.status && toast.error("Network unavailable, please try again.")
      } else {
        toast.error("Error, please try again.")
      }
    }
    setLoading(false)
  }

  const authWithGoogle = () => {
    setLoading(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: any) => {
        const user = result.user;
        if (user.accessToken) {
          localAuth(user)
        } else {
          toast.error("Could not authenticate user with Google. Try again.")
        }

      }).catch((error) => {
        toast.error(`${error.message}`)
      });
    setLoading(false)
  }
  return (
    <Box
      height="100%"
      minHeight={"100vh"}
      w="100%"
      backgroundImage="url(https://baticali.sirv.com/Klusterthon2023/bg2.png)"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={{ base: "0.25rem" }}
    >
      <TermModal isOpen={isOpen} onClose={onClose} />
      <Box bgColor={colorMode === "light" ? "#F1F1F2" : "#0E1117"}
        onClick={toggleColorMode} cursor={"pointer"} width={{base:"2rem", md:"3rem", "2xl":"4rem"}} aspectRatio={"1/1"} 
        position={"fixed"} zIndex={1000} right={{base:"1rem", md:"4rem", "2xl":"10rem"}} bottom={{base:"8%", md:"5rem", lg:"3rem", "2xl":"15rem"}} borderRadius={"50%"}
        display={"flex"} alignItems={"center"} justifyContent={"center"}
        boxShadow={"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}
        >
          <Image width={"50%"} filter={colorMode==="light" ? "none" : "brightness(2.5)"} src={mode} alt="mode" />

      </Box>
      <SimpleGrid
        mx="auto"
        width={{ base: "100%", md: "70%" }}
        py={{ base: "1rem", lg: 0 }}
        columns={{ base: 1, lg: 2 }}
        justifyItems={{ base: "center" }}
        maxWidth={"65em"}
      >
        <Box mt={{ base: 0, lg: "15rem" }} display={"flex"} flexDirection={"column"} alignItems={{ base: "center", lg: "flex-start" }}>
          <Box color={"#fff"} display={"flex"} alignItems={"center"} gap={{ base: 1, md: 2 }} cursor={"pointer"} onClick={() => navigate('/')}>
            <Box width="2rem" aspectRatio="1/1">
              <Image
                src={"https://baticali.sirv.com/Klusterthon2023/logo-grey.svg"}
                alt="Systems sense logo"
                width="100%"
                height="auto"
                loading="lazy"
              />
            </Box>
            <Text fontWeight={600} fontSize={{ base: "1.25rem", "2xl": "1.75rem" }}>
              Symptom
            </Text>
            <Text fontFamily={`'GT-Eesti-Light', sans-serif`} fontWeight={300} fontSize={{ base: "1.25rem", "2xl": "1.75rem" }}>
              Sense
            </Text>
          </Box>
          <Box
            width={{ base: "80%", lg: "80%" }}
            mx={{ base: "auto", lg: 0 }}
          >
            <Text
              mt="1"
              textColor="#ffffff"
              fontSize={{ base: "1.5rem", "2xl": "2rem" }}
              fontWeight="400"
              textAlign={{ base: "center", lg: "left" }}
              fontFamily={`'GT-Eesti-Light', sans-serif`}
            >
              Empowering Health Decisions with AI
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          bg={colorMode === "light" ? "#ffffff" : "#1A202C"}
          mt={{ base: "1rem", lg: 0 }}
          py={{ base: "2rem", md: "5rem", lg: "3rem", "2xl": "5rem" }}
          px={{ base: "1rem", sm: "2rem", lg: "3rem" }}
          borderRadius="1.5rem"
          width={{ base: "90%", sm: "80%", lg: "90%" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form style={{ width: "100%" }}>
              <Box
              >
                <Text
                  textColor={colorMode === "light" ? "#181C32" : "#eee"}
                  fontSize={{ base: "1.5rem", "2xl": "2rem" }}
                  fontWeight="500"
                  textAlign="center"
                >
                  Sign up for an account
                </Text>
                <Box
                  mt="1.5rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border={loading ? "1px solid #E1E3EA" : "1px solid #7E8299"}
                  width="100%"
                  py={{ base: "0.5rem", "2xl": "0.75rem" }}
                  borderRadius={{ base: "0.25rem", lg: "0.5rem" }}
                  as="button" type="button"
                  onClick={authWithGoogle}
                  disabled={loading}
                  pointerEvents={loading ? "none" : "all"}
                  bg={loading ? "#7E8299" : "transparent"}
                  _hover={{
                    bg: "#7e829908",
                    border: "1px solid #E1E3EA",
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <Box display="flex" flexWrap="wrap">
                      <Image src="https://baticali.sirv.com/Klusterthon2023/google.svg" />
                      <Text
                        ml="0.75rem"
                        textAlign="center"
                        textColor="#7E8299"
                        fontSize={{ base: ".75rem", lg: "1rem" }}
                        fontWeight="500"
                      >
                        Sign up with Google
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box position='relative' paddingY='10' width={"100%"}>
                  <Divider />
                  <AbsoluteCenter bg={colorMode === "light" ? "#ffffff" : "#1A202C"} px='4'>
                    <Box
                      textAlign="center"
                      textColor="#A1A5B7"
                      fontSize={{ base: ".75rem", lg: "1rem" }}
                      fontWeight="500"
                      fontFamily={`'GT-Eesti-Light', sans-serif`}
                    >
                      Or with email
                    </Box>
                  </AbsoluteCenter>
                </Box>


                <SimpleGrid columns={2} gap={2} fontFamily={`'GT-Eesti-Light', sans-serif`}>
                  <Box>
                    <Field
                      type="text"
                      name="first_name"
                      as={Input}
                      placeholder="First Name"
                    />

                    <ErrorMessage name="first_name">
                      {(msg) => (
                        <Box style={{ marginTop: "1rem", color: "red" }}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>
                  </Box>
                  <Box>
                    <Field
                      type="text"
                      name="last_name"
                      as={Input}
                      placeholder="Last Name"
                    />

                    <ErrorMessage name="last_name">
                      {(msg) => (
                        <Box style={{ marginTop: "1rem", color: "red" }}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>
                  </Box>
                </SimpleGrid>
                <Box mt="1.25rem" fontFamily={`'GT-Eesti-Light', sans-serif`}>
                  <Field
                    type="email"
                    name="email"
                    as={Input}
                    placeholder="Email"
                  />

                  <ErrorMessage name="email">
                    {(msg) => (
                      <Box style={{ marginTop: "1rem", color: "red" }}>
                        {msg}
                      </Box>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mt="1.25rem" fontFamily={`'GT-Eesti-Light', sans-serif`}>
                  <InputGroup width="100%" size="md">
                    <Field
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      name="password"
                      as={Input}
                      placeholder="Enter password"
                    />
                    <InputRightElement>
                      <Button onClick={handlePassword} variant={"secondary"} padding={0}>
                        {show ? (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility-off.svg" />
                        ) : (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility.svg" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="password">
                    {(msg) => (
                      <Box style={{ marginTop: "1rem", color: "red" }}>
                        {msg}
                      </Box>
                    )}
                  </ErrorMessage>
                </Box>
                <Box mt="1.25rem" fontFamily={`'GT-Eesti-Light', sans-serif`}>
                  <InputGroup width="100%" size="md">
                    <Field
                      pr="4.5rem"
                      type={showConfirm ? "text" : "password"}
                      name="re_password"
                      as={Input}
                      placeholder="Enter password again"
                    />
                    <InputRightElement>
                      <Button onClick={handleConfirmPassword} variant={"secondary"} padding={0}>
                        {showConfirm ? (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility-off.svg" />
                        ) : (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility.svg" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="re_password">
                    {(msg) => (
                      <Box style={{ marginTop: "1rem", color: "red" }}>
                        {msg}
                      </Box>
                    )}
                  </ErrorMessage>

                  <Box mt="1.25rem" display="flex" justifyContent="space-between" flexWrap={"wrap"}
                    fontFamily={`'GT-Eesti-Light', sans-serif`} alignItems={"center"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <Checkbox
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <Text
                        ml="0.44rem"
                        textColor={colorMode === "light" ? "#5E6278" : "#babed2"}
                        fontSize="0.85rem"
                      >
                        I Accept the
                      </Text>
                      <Button
                        variant={"secondary"}
                        ml="0.44rem"
                        padding={0}
                        textColor="brand.main"
                        fontSize="0.95rem"
                        alignItems={"center"}
                        onClick={onOpen}
                        _hover={{
                          color: "brand.active"
                        }}
                        _active={{
                          color: "brand.active"
                        }}
                        _focus={{
                          color: "brand.active"
                        }}
                      >
                        Terms
                      </Button>
                    </Box>
                    <Link
                      textAlign={"right"}
                      color="brand.main"
                      fontSize="0.85rem"
                      _visited={{
                        textDecoration: "none"
                      }}
                      _hover={{
                        textDecoration: "none",
                        color: "brand.active"
                      }}
                    >
                      <strong>
                        Forgot Password?</strong>
                    </Link>
                  </Box>
                </Box>

                <Box mt="1.25rem">
                  {isButtonDisabled ? (
                    <Button
                      textColor="#fff"
                      bg="#3E97FF"
                      height="2.375rem"
                      width="100%"
                      type="submit"
                      isLoading={loading}
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <Button
                      textColor="#fff"
                      bg="#3E97FF"
                      height="2.375rem"
                      width="100%"
                      type="submit"
                      isDisabled
                    >
                      Sign Up
                    </Button>
                  )}
                </Box>

                <Text mt="1.25rem" textAlign="center" fontFamily={`'GT-Eesti-Light', sans-serif`}
                  textColor={colorMode === "light" ? "#5E6278" : "#babed2"}>
                  Already have an Account?{" "}
                  <Link
                    color="brand.main"
                    _visited={{
                      textDecoration: "none"
                    }}
                    _hover={{
                      textDecoration: "none",
                      color: "brand.active"
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <strong>
                      Sign In</strong>
                  </Link>
                </Text>
              </Box>
            </Form>
          </Formik>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Signup;
