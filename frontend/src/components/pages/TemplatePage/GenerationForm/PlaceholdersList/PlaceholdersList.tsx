import React from 'react'
// loacl libs
import { useAppSelector } from '@store'
import { selectPickedTemplatesData } from '@store/CheckedTemplatesData'
import { Input } from '@components/generic'
import { InputContainer } from './styles'
// types
import { PlaceholderProps } from './types'

export const PlaceholdersList: React.FC<PlaceholderProps> = ({ register }) => {
  const { placeholders } = useAppSelector(selectPickedTemplatesData)

  return (
    <InputContainer>
      {placeholders.map((x) => (
        <Input key={x} name={x} placeholder={x} register={register} />
      ))}
    </InputContainer>
  )
}
