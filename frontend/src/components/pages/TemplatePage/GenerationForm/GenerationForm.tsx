import React from 'react'
import { useForm } from 'react-hook-form'
// local libs
import { GenerationFormContainer, ButtonContainer } from './styles'
import { PlaceholdersList } from './PlaceholdersList'
import { Button } from '@components/generic'
// types
import { FormData } from './types'

export const GenerationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (formData: FormData) => {
    console.log(formData)
  }

  return (
    <GenerationFormContainer onSubmit={handleSubmit(onSubmit)}>
      <PlaceholdersList register={register} />

      <ButtonContainer>
        <Button type="submit" margin="0 15px 0 0">
          Generate documents
        </Button>
        <Button>Download documents</Button>
      </ButtonContainer>
    </GenerationFormContainer>
  )
}
