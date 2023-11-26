import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Spacer,
  Input,
  InputRightElement,
  InputGroup,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/icons/abstract-44.svg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TermModal from "./modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

interface FormValues {
  email: string;
  password: string;
  re_password: string;
  first_name: string;
  last_name: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    toggleButtonDisabled();
  };
  const toggleButtonDisabled = () => {
    setButtonDisabled(!isButtonDisabled);
  };
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClick = () => {};
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
    password: Yup.string().required("Please add your password"),
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
    console.log("Form values:", values);

    try {
      const response = await axios.post(
        `https://adewole.pythonanywhere.com/api/UsersAuths/`,
        values
      );
      console.log(response);
      console.log(response.request);
      if (response) {
        alert("success");
        toast.success("you have successfully signed up");
        dispatch(
          setUser({ id: response.data.id, username: response.data.username })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("error please try again");
    }
  };
  return (
    <Box
      height="100vh"
      w="100%"
      backgroundImage="url(https://baticali.sirv.com/Klusterthon2023/bg2.png)"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
            <TermModal isOpen={isOpen} onClose={onClose} />
      <Flex
        mx="auto"
        width={{ base: "100%", md: "70%" }}
        maxWidth={{ base: "100%", md: "63.8rem" }}
        py={{ base: "1rem", md: "5rem" }}
        height="48rem"
        direction={{ base: "column", md: "row" }}
      >
        <Box mt={{ base: "1rem", md: "15rem" }}>
          <Box
            width={{ base: "60%", md: "100%" }}
            mx={{ base: "auto", md: "" }}
            height="2.5rem"
            display="flex"
            flexWrap="wrap"
          >
            <Image src={logo} />
            <Heading
              mt="0.25rem"
              textColor="#ffffff"
              fontSize="1.5rem"
              fontFamily="Inter"
              fontWeight="500"
              lineHeight="1.4rem"
            >
              Symptom Sense
            </Heading>
          </Box>
          <Box
            width={{ base: "90%", md: "22rem" }}
            mx={{ base: "auto", md: "" }}
            height="4.5rem"
          >
            <Text
              display={{ base: "block", md: "none" }}
              mt="1.25rem"
              textColor="#ffffff"
              fontSize="1.5rem"
              fontFamily="Inter"
              fontWeight="400"
              textAlign="center"
            >
              AI-powered symptom and diagnosis guidance
            </Text>
            <Text
              display={{ base: "none", md: "block" }}
              mt="1.25rem"
              textColor="#ffffff"
              fontSize="1.5rem"
              fontFamily="Inter"
              fontWeight="400"
            >
              AI-powered symptom and diagnosis guidance
            </Text>
          </Box>
        </Box>
        <Spacer maxWidth="10.49rem" />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Box
              display= "flex"
              alignItems="center"
              width={{ base: "90%", md: "33.78rem" }}
              mx={{ base: "auto", md: "" }}
              bg="#ffffff"
              height={{ base: "100%", md: "44rem" }}
              py={{ base: "3rem", md: "0" }}
              borderRadius="1.5rem"
            >
              <Box
                mt={{ base: "", md: "-12.25rem" }}
                mx="auto"
                width={{ base: "90%", md: "100%" }}
                maxWidth={{ base: "90%", md: "24.4rem" }}
              >
                <Box
                  mx={{ base: "auto", md: "" }}
                  height={{ base: "100%", md: "25.4rem" }}
                  width={{ base: "90%", md: "24.4rem" }}
                >
                  <Text
                    textColor="#181C32"
                    fontSize="1.5rem"
                    fontWeight="500"
                    textAlign="center"
                  >
                    Sign up for an account
                  </Text>
                  <Box
                    mt="2.19rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="2.375rem"
                    border="1px solid #F5F5F5"
                    width="100%"
                  >
                    <Box display="flex" flexWrap="wrap">
                      <Image src="https://baticali.sirv.com/Klusterthon2023/google.svg" />
                      <Text
                        ml="0.75rem"
                        textAlign="center"
                        textColor="#7E8299"
                        fontSize=".75rem"
                        fontWeight="500"
                      >
                        Sign in with Google
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    textAlign="center"
                    textColor="#A1A5B7"
                    fontSize="0.75rem"
                    fontWeight="500"
                    mt="2.19rem"
                  >
                    Or with email
                  </Box>
                  <Box display="flex" flexWrap="wrap" mt="1.25rem">
                    <Box width="47%">
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
                    <Spacer />
                    <Box width="47%">
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
                  </Box>
                  <Box mt="1.25rem">
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
                  <Box mt="1.25rem">
                    <InputGroup width="100%" size="md">
                      <Field
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        name="password"
                        as={Input}
                        placeholder="Enter password"
                      />
                      <InputRightElement
                        onClick={handlePassword}
                        width="4.5rem"
                      >
                        {show ? (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility-off.svg" />
                        ) : (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility.svg" />
                        )}
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
                  <Box mt="1.25rem">
                    <InputGroup width="100%" size="md">
                      <Field
                        pr="4.5rem"
                        type={showConfirm ? "text" : "password"}
                        name="re_password"
                        as={Input}
                        placeholder="Enter password"
                      />
                      <InputRightElement
                        onClick={handleConfirmPassword}
                        width="4.5rem"
                      >
                        {showConfirm ? (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility-off.svg" />
                        ) : (
                          <Image src="https://baticali.sirv.com/Klusterthon2023/visibility.svg" />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    <ErrorMessage name="re_password">
                      {(msg) => (
                        <Box style={{ marginTop: "1rem", color: "red" }}>
                          {msg}
                        </Box>
                      )}
                    </ErrorMessage>

                    <Box mt="1.25rem" display="flex" flexWrap="wrap">
                      <Checkbox
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <Text
                        ml="0.44rem"
                        textColor="#5E6278"
                        fontSize="0.8125rem"
                        fontWeight="500"
                      >
                        I Accept the
                      </Text>
                      <Text
                        ml="0.44rem"
                        textColor="#3E97FF"
                        fontSize="0.8125rem"
                        fontWeight="500"
                        onClick={onOpen}
                      >
                        Terms
                      </Text>
                      <Spacer />
                      <Text
                        float="right"
                        textColor="#A1A5B7"
                        fontSize="0.75rem"
                        fontWeight="500"
                      >
                        Forgot Password
                      </Text>
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
                      >
                        Sign in
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

                  <Text mt="1.25rem" textAlign="center">
                    Dont't have an Account?{" "}
                    <strong
                      color="#3E97FF"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Sign in
                    </strong>
                  </Text>
                </Box>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Flex>
    </Box>
  );
};

export default Signup;
