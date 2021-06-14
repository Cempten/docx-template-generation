import React from 'react'
import {
  Modal as OrigModal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'

// types
import { ModalProps } from './types'

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => (
  <OrigModal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent width="auto" maxWidth="none">
      {content}
    </ModalContent>
  </OrigModal>
)
