import React from 'react'
// local libs
import { StyledInput } from './styles'
// types
import { InputProps } from './types'

export const Input: React.FC<InputProps> = ({
  register,
  name,
  ...inputProps
}) => {
  return <StyledInput {...register(name)} {...inputProps} />
}
