import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  useBreakpointValue
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  const size = useBreakpointValue(
    {
      base: "xs",
      md: "md",
      lg: "5xl",
      xl: "4xl",
      "2xl": "5xl"
    }
  )
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent borderRadius={4}>
        <ModalBody p={0}>
          <Box maxWidth="100%">
            {children}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
