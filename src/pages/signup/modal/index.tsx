import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
  }

const TermModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {

  const data = [
    {
      no: 1,
      title: "Acceptance of Terms",
      note: "By accessing or using SymptomSense, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
    },
    {
      no: 2,
      title: "Use of the Service",
      note: "You may use SymptomSense for your personal use and in accordance with these terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      no: 3,
      title: "Privacy",
      note: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.",
    },
    {
      no: 4,
      title: "User Conduct",
      note: "You agree not to use SymptomSense for any unlawful purpose or in any way that may disrupt the service, impair its functionality, or infringe on the rights of others.",
    },
    {
      no: 5,
      title: "Feedback",
      note: "We welcome your feedback to improve our services. By providing feedback, you grant us the right to use and implement your suggestions without any obligation to you.",
    },
    {
      no: 6,
      title: "Changes to Terms",
      note: "We reserve the right to modify or replace these terms at any time. Your continued use of SymptomSense after any changes constitutes acceptance of the modified terms.",
    },
    {
      no: 7,
      title: "Termination",
      note: "We reserve the right to terminate or suspend your account at our sole discretion, without notice, for any reason, including a breach of these terms.",
    },
    {
      no: 8,
      title: " Disclaimer of Warranty",
      note: `SymptomSense is provided "as is" without any warranty. We do not guarantee the accuracy, completeness, or suitability of the information and materials found or offered in the app.`,
    },
    {
      no: 9,
      title: "Limitation of Liability",
      note: "In no event shall [Your App Name] or its owners be liable for any damages arising out of the use or inability to use the app, even if we have been notified of the possibility of such damages.",
    },
    {
      no: 10,
      title: " Governing Law",
      note: `These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any dispute arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].`,
    },
  ];

  // Effective Date: November27th, 2023

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent p="2rem" borderRadius={4}>
          <ModalCloseButton  fontSize="1rem"mr="2rem" mt="2.5rem" />
          <ModalHeader fontWeight={800} ml="-1.7rem" fontSize="1.25rem">
            Terms of Use
          </ModalHeader>
          <ModalBody p={0}>
            <Box width="24rem" height="100%">
              {data.map((dat) => (
                <Box>
                  <Box display="flex" flexWrap="wrap">
                    <Text width="100%" fontWeight="800" fontSize="0.8125rem" mr="0.rem" >{dat.no}. {dat.title}</Text>
                  </Box>
                  <Text mb="1rem"width="100%" fontWeight="400" fontSize="0.8125rem">
                    {dat.note}
                  </Text>
                </Box>
              ))}


              <Text>Effective Date: November27th, 2023</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermModal;
