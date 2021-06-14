import React from 'react'
// loacl libs
import { StyledButton } from './styles'
// types
import { ButtonProps } from './types'

export const Button: React.FC<ButtonProps> = ({ children, ...butonProps }) => {
  return <StyledButton {...butonProps}>{children}</StyledButton>
}
