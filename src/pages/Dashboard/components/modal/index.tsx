import {
  Box,
  Text,
  Image,
  Heading,
  Button,
  ModalHeader,
  Divider,
} from "@chakra-ui/react";
import privacy from "../../../../assets/icons/security.svg";
import CustomModal from "../customModal";
import { CloseIcon } from "@chakra-ui/icons";

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
      <CustomModal isOpen={isOpen} onClose={handleClose}>
        <Box maxWidth="100%">
          <ModalHeader my={{base:"1rem", lg:"2rem"}} padding={{base:"0.75rem", lg:"1rem 3rem"}} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Heading fontSize={{base:"1rem", lg:"1.75rem"}} fontFamily={`'GT-Eesti', sans-serif`}>
              Hello! SymptomSense is here to assist you
            </Heading>
            <CloseIcon cursor={"pointer"} onClick={onClose} />
          </ModalHeader>
          <Divider />
          <Box
            borderRadius="1rem"
            border="2px solid #C2DEFF"
            padding={{base:"0.75rem", lg:"2rem"}}
            display="flex"
            gap={"2rem"}
            bg={"#EEF6FF"}
            margin={{base:"1rem", lg:"3rem"}}
            flexDirection={{base:"column", lg:"row"}}
          >
            <Box width={"2.5rem"}>
              <Image width={"100%"} height={"auto"} src={privacy} />
            </Box>
            <Box width="100%">
              <Text fontSize={{base:"1rem", lg:"1.75rem"}} lineHeight={"150%"} fontWeight={500} fontFamily={`'GT-Eesti-Light', sans-serif`}>
                It's important to note that the information provided by our AI
                is based on common symptoms and general knowledge. SymptomSense
                is not a substitute for professional medical advice, diagnosis,
                or treatment. The AI-generated responses are for informational
                purposes only.
              </Text>
            </Box>
          </Box>
        </Box>
        <Divider my={{base:"1rem", lg:"1.5rem"}} />
        <Button
          float="right"
          onClick={onClose}
          m={{base:"1rem", lg:"2rem"}}
        >
          Continue
        </Button>
      </CustomModal>
    </>
  );
};

export default PopMessage;
