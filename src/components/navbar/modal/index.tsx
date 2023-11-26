import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Text,
  Image,
  Heading,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import privacy from "../../../../assets/icons/security.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAccessToken,
    selectIsAuthenticated,
  } from "../../../redux/authSlice";
  import { selectId } from "../../../redux/userSlice";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
    let [value, setValue] = useState('')
  const [feedbackState, setFeedbackState] = useState("");
  const accessToken = useSelector(selectAccessToken);
  const [ident, setIdent] = useState("");
  const id = useSelector(selectId);

  const HandleFeedBack = async () => { 

    const payload = {
        request: feedbackState,
      };
  
  const response = await axios.post(
    `https://adewole.pythonanywhere.com/api/feedback/`,
    payload,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  )
}

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="x1">
        <ModalOverlay />
        <ModalContent p="2rem" width="35rem" borderRadius={4}>
          <ModalCloseButton mt="3rem" mr="1rem" />

          <ModalBody p={0}>
            <Box width="33.8rem" maxWidth="100%" height="18.125rem">
              <Heading fontSize="0.875rem" my="1.88rem">
                Your Feedback Matters
              </Heading>

              <hr />
              <Box
              mt="2rem"
                border-radius="0.4375rem"
                width="100%"
                height="8.25rem"
                display="flex"
                flexWrap="wrap"
              >
                <Box width="100%">
                  <Input borderRadius="0.38rem" height="5rem"
                  type="text"
                    onChange={(event) => {
                      console.log(event.target.value);
                      setFeedbackState(event.target.value);
                    }}
                    placeholder="Describe your experience or give your comments..."
                  />
                </Box>
              </Box>

              <hr />
            </Box>
            <Box>
              {" "}
            
              <Button
                mx="auto"
                ml="0.62rem"
                width="5.186rem"
                px="1.5rem"
                float="right"
                onClick={HandleFeedBack}
                bg="#3E97FF"
                textColor="#ffffff"
                borderRadius="0.38rem"
              >
                Continue
              </Button>  <Button
                mx="auto"
                width="2.375rem"
                px="2rem"
                
                float="right"
                bg="#F9F9F9"
                borderRadius="0.38rem"
              >
                Close
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackModal;
