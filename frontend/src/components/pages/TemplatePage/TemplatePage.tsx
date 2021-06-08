import { Button } from '@components/generic'
import React from 'react'
// local libs
import { Title, ButtonContainer } from './styles'
import { TemplatesList } from './TemplatesList'

export const TemplatePage: React.FC = () => {
  return (
    <>
      <Title>List of available templates</Title>
      <TemplatesList />
      <ButtonContainer>
        <Button margin="0 15px 0 0">Get placeholders</Button>
        <Button>Add templates</Button>
      </ButtonContainer>
    </>
  )
}
