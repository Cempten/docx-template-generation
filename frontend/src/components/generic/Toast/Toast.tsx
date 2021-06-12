import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'
//local libs
import {
  CloseButtonContainer,
  IconContainer,
  StyledToastContainer,
  TextContainer,
  Title,
  Description,
} from './styles'
//types
import { VariantsEnum } from '@store/notification'
import { ToastProps } from './types'

export const Toast: React.FC<ToastProps> = ({ onClose, variant, message }) => {
  return (
    <StyledToastContainer variant={variant}>
      <IconContainer variant={variant}>
        {variant === VariantsEnum.notification ? <CheckIcon /> : <b>!</b>}
      </IconContainer>
      <TextContainer>
        {variant === VariantsEnum.notification ? (
          <Title>Success.</Title>
        ) : (
          <Title>Some shit happened.</Title>
        )}
        <Description>{message}</Description>
      </TextContainer>
      <CloseButtonContainer>
        <CloseIcon onClick={onClose} />
      </CloseButtonContainer>
    </StyledToastContainer>
  )
}
