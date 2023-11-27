import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Heading,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: string;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, size, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent p="2rem" width="35rem" borderRadius={4}>
        <ModalCloseButton mt="3rem" mr="1rem" />
        <ModalBody p={0}>
          <Box width="33.8rem" maxWidth="100%" height="18.125rem">
            {children}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
