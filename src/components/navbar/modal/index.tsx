import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  ModalHeader,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomModal from "../../../pages/Dashboard/components/customModal";
import { CloseIcon } from "@chakra-ui/icons";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [feedbackState, setFeedbackState] = useState("");
  const [loading, setLoading] = React.useState(false);

  const HandleFeedBack = async () => {
    if (!feedbackState || feedbackState==="") {
      return
    }
    setLoading(true);

    const payload = {
      feedback: feedbackState,
    };
    try {
      const response = await axios.post(
        `https://adewole.pythonanywhere.com/api/feedbacks/`,
        payload
      )
      toast.success("Feedback sent successfully")
      onClose();
      setFeedbackState("")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.data && error.response?.data.hasOwnProperty('detail') && toast.error(error.response?.data['detail'])
        error.response?.data && error.response?.data.hasOwnProperty('feedback') && toast.error(`Feedback: ${error.response?.data['feedback']}`)
        !error.response?.status && toast.error("Network unavailable, please try again.")
      } else {
        toast.error("Error, please try again.")
      }
      
    }
    setLoading(false)
  }

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} size="4xl">
        <Box maxWidth={"100%"}>
          <ModalHeader mt={"3rem"} mb="2rem" padding={"1rem 3rem"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Heading fontSize="1.75rem" fontFamily={`'GT-Eesti', sans-serif`}>
              Your Feedback Matters!
            </Heading>
            <CloseIcon cursor={"pointer"} onClick={onClose} />
          </ModalHeader>
          <Divider />
          <Box
            borderRadius="1rem"
            display="flex"
            gap={"2rem"}
            margin={"3rem"}
          >
            <Textarea height={{base:"6rem"}} maxHeight={"12rem"} resize={"none"}
              onChange={(event) => {
                setFeedbackState(event.target.value);
              }}
              placeholder="Describe your experience or give your comments..."
            />
          </Box>
          <Divider my={"2rem"} />
          <Box m={"3rem"} display={"flex"} justifyContent={"flex-end"} gap="2rem">
            <Button onClick={onClose} color={"#7E8299"} bg="#F9F9F9" isDisabled={loading}
            _hover={{boxShadow:'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'}}
            _active={{boxShadow:'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'}}
            _focus={{boxShadow:'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'}} >
              Close
            </Button>
            <Button
              onClick={HandleFeedBack}
              isLoading={loading}
            >
              Continue
            </Button>
          </Box>

        </Box>
      </CustomModal>
    </>
  );
};

export default FeedbackModal;
