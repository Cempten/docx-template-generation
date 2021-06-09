import React, { useState } from 'react'
// local libs
import { Button, Input, Modal } from '@components/generic'
import { selectTemplates } from '@store/templates'
import { useAppSelector } from '@store'
import { AddTemplates } from './AddTemplates'
import { Title, ButtonContainer, InputContainer } from './styles'
import { TemplatesList } from './TemplatesList'

export const TemplatePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const templates = useAppSelector(selectTemplates)

  const isButtonDisabled = templates.length === 0

  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <>
      <Title>List of available templates</Title>

      <TemplatesList />

      <ButtonContainer>
        <Button margin="0 15px 0 0" disabled={isButtonDisabled}>
          Get placeholders
        </Button>
        <Button onClick={openModal}>Add templates</Button>
      </ButtonContainer>

      <InputContainer>
        <Input name="input" placeholder="input" />
        <Input name="input" placeholder="input" />
      </InputContainer>

      <Modal
        isOpen={isModalOpen}
        content={<AddTemplates closeModal={closeModal} />}
        onClose={closeModal}
      />
    </>
  )
}
