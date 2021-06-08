import React from 'react'
// local libs
import { Title } from './styles'
import { TemplatesList } from './TemplatesList'

export const TemplatePage: React.FC = () => {
  return (
    <>
      <Title>List of available templates</Title>
      <TemplatesList />
    </>
  )
}
