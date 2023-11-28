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
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { login } from "../../redux/authSlice";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => { setShow(!show) };
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required Required"),
    password: Yup.string().required("Please add your password"),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `https://adewole.pythonanywhere.com/api/UsersAuths/Login/`,
        values
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
        error.response?.data && error.response?.data.hasOwnProperty('password') && toast.error(`Password: ${error.response?.data['password']}`)
        !error.response?.status && toast.error("Network unavailable, please try again.")
      } else {
        toast.error("Error, please try again.")
      }
    }
    setLoading(false);

  };
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
          bg="#ffffff"
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
                  textColor="#181C32"
                  fontSize={{ base: "1.5rem", "2xl": "2rem" }}
                  fontWeight="500"
                  textAlign="center"
                >
                  Sign In
                </Text>
                <Box
                  mt="1.5rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #E1E3EA"
                  width="100%"
                  py={{ base: "0.5rem", "2xl": "0.75rem" }}
                  borderRadius={{ base: "0.25rem", lg: "0.5rem" }}
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
                        Sign in with Google
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  textAlign="center"
                  textColor="#A1A5B7"
                  fontSize={{ base: ".75rem", lg: "1rem" }}
                  fontWeight="500"
                  mt="2rem"
                  mb="1.5rem"
                  fontFamily={`'GT-Eesti-Light', sans-serif`}
                >
                  Or with email
                </Box>
                <Box fontFamily={`'GT-Eesti-Light', sans-serif`}>
                  <Field
                    type="email"
                    name="email"
                    as={Input}
                    placeholder="Email"
                    focusBorderColor={"brand.active"}
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
                      type={show ? 'text' : 'password'}
                      name="password"
                      as={Input}
                      placeholder="Enter password"
                      focusBorderColor={"brand.active"}
                    />
                    <InputRightElement>
                      <Button onClick={handleClick} variant={"secondary"} padding={0}>
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
                  <Link
                    my="1.25rem"
                    textAlign={"right"}
                    color="brand.main"
                    display={"flex"}
                    width={"100%"}
                    justifyContent={"flex-end"}
                    fontFamily={`'GT-Eesti-Light', sans-serif`}
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
                <Box mt="1.25rem">
                  <Button
                    textColor="#fff"
                    bg="#3E97FF"
                    height="2.375rem"
                    width="100%"
                    type="submit"
                    isLoading={loading}
                  >
                    Sign in
                  </Button>
                </Box>

                <Text mt="1.25rem" textAlign="center" fontFamily={`'GT-Eesti-Light', sans-serif`} color={"#A1A5B7"}>
                  Dont't have an Account?{" "}
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
                      navigate("/signup");
                    }}
                  >
                    <strong>
                      Sign Up</strong>
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

export default Signin;
