import React, { useState } from 'react'
// local libs
import { Button, Modal } from '@components/generic'
import { selectTemplates } from '@store/templates'
import { setPickedTemplatesData } from '@store/CheckedTemplatesData'
import { useAppSelector, useAppDispatch } from '@store'
import { AddTemplates } from './AddTemplates'
import { Title, ButtonContainer } from './styles'
import { TemplatesList } from './TemplatesList'
import { useApi } from '@hooks'
import { PlaceholdersList } from './PlaceholdersList'

export const TemplatePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { getPickedTemplatesData } = useApi()
  const dispatch = useAppDispatch()
  const templates = useAppSelector(selectTemplates)

  const handleGetPlaceholders = async () => {
    const pickedTemplatesData = await getPickedTemplatesData(templates)
    dispatch(setPickedTemplatesData(pickedTemplatesData))
  }

  const isButtonDisabled = templates.length === 0

  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <>
      <Title>List of available templates</Title>

      <TemplatesList />

      <ButtonContainer>
        <Button
          margin="0 15px 0 0"
          disabled={isButtonDisabled}
          onClick={handleGetPlaceholders}
        >
          Get placeholders
        </Button>
        <Button onClick={openModal}>Add templates</Button>
      </ButtonContainer>

      <PlaceholdersList />

      <Modal
        isOpen={isModalOpen}
        content={<AddTemplates closeModal={closeModal} />}
        onClose={closeModal}
      />
    </>
  )
}
