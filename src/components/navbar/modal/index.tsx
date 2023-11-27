import {  useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    selectAccessToken,
  } from "../../../redux/authSlice";
  import { selectId } from "../../../redux/userSlice";
import toast from "react-hot-toast";
import CustomModal from "../../../pages/Dashboard/components/customModal";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [feedbackState, setFeedbackState] = useState("");
  const accessToken = useSelector(selectAccessToken);

  const HandleFeedBack = async () => { 

    const payload = {
        request: feedbackState,
      };
  try {
    const response = await axios.post(
      `https://adewole.pythonanywhere.com/api/feedback/`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
    console.log(response)
    toast.success("Response successful")
  } catch (error) {
    toast.error("Error")
  }
  
}

const handleClose = () => {
  onClose()
};


  return (
    <>
      <CustomModal isOpen={isOpen} onClose={handleClose} size="xl">
        <Box>
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
            </CustomModal>
    </>
  );
};

export default FeedbackModal;
