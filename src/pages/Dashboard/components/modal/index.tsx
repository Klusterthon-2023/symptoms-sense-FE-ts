import {
  Box,
  Text,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import privacy from "../../../../assets/icons/security.svg";
import CustomModal from "../customModal";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopMessage: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <CustomModal isOpen={isOpen} onClose={handleClose} size="xl">
        <Box width="33.8rem" maxWidth="100%" height="18.125rem">
          <Heading fontSize="0.875rem" my="1.88rem">
            Hello! SymptomSense is here to assist you
          </Heading>
          <Box
            border-radius="0.4375rem"
            border="1px solid #C2DEFF"
            width="30rem"
            height="8.25rem"
            display="flex"
            flexWrap="wrap"
          >
            <Box>
              <Image src={privacy} />
            </Box>
            <Box width="100%">
              <Text fontSize="0.875rem">
                It's important to note that the information provided by our AI
                is based on common symptoms and general knowledge. SymptomSense
                is not a substitute for professional medical advice, diagnosis,
                or treatment. The AI-generated responses are for informational
                purposes only.
              </Text>
            </Box>
          </Box>
        </Box>
        <Button
          mx="auto"
          width="7.06rem"
          px="1.5rem"
          float="right"
          bg="#3E97FF"
          borderRadius="0.38rem"
        >
          Continue
        </Button>
      </CustomModal>
    </>
  );
};

export default PopMessage;
