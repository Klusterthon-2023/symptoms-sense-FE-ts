import React, { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
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
