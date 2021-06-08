import React from 'react'
// local libs
import { CheckboxContainer } from './styles'
import { ReactComponent as CheckMark } from './assets/check-icon.svg'
// types
import { CheckboxProps } from './types'

export const Checkbox: React.FC<CheckboxProps> = ({ checked, margin }) => {
  return (
    <CheckboxContainer margin={margin}>
      {!checked ? null : <CheckMark />}
    </CheckboxContainer>
  )
}
