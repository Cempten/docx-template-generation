import React from 'react'
// loacl libs
import { useAppSelector } from '@store'
import { selectPickedTemplatesData } from '@store/CheckedTemplatesData'
import { Input } from '@components/generic'
import { InputContainer } from './styles'
// types

export const PlaceholdersList: React.FC = () => {
  const { placeholders } = useAppSelector(selectPickedTemplatesData)
  const placeholdersArray = Array.from(placeholders)

  return (
    <InputContainer>
      {placeholdersArray.map((x) => (
        <Input key={x} name={x} placeholder={x} />
      ))}
    </InputContainer>
  )
}
