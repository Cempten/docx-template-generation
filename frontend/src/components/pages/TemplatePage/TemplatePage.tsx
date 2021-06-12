import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
// local libs
import { Button, Modal, Toast } from '@components/generic'
import { selectTemplates } from '@store/templates'
import {
  setPickedTemplatesData,
  selectPickedTemplatesData,
} from '@store/CheckedTemplatesData'
import { useAppSelector, useAppDispatch } from '@store'
import { AddTemplates } from './AddTemplates'
import { Title, ButtonContainer } from './styles'
import { TemplatesList } from './TemplatesList'
import { useApi } from '@hooks'
import { GenerationForm } from './GenerationForm'
import { selectNotification } from '@components/store/notification'
import { useEffect } from 'react'

export const TemplatePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { getPickedTemplatesData } = useApi()
  const dispatch = useAppDispatch()
  const { placeholders } = useAppSelector(selectPickedTemplatesData)
  const templates = useAppSelector(selectTemplates)
  const notification = useAppSelector(selectNotification)
  const toast = useToast()

  useEffect(() => {
    if (notification.message)
      toast({
        render: ({ onClose }) => (
          <Toast
            onClose={onClose}
            variant={notification.variant}
            message={notification.message}
          />
        ),
      })
  }, [notification])

  const handleGetPlaceholders = async () => {
    const pickedTemplatesData = await getPickedTemplatesData(templates)
    dispatch(setPickedTemplatesData(pickedTemplatesData))
  }

  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <>
      <Title>List of available templates</Title>

      <TemplatesList />

      <ButtonContainer>
        <Button
          margin="0 15px 0 0"
          disabled={templates.length === 0}
          onClick={handleGetPlaceholders}
        >
          Get placeholders
        </Button>
        <Button onClick={openModal}>Add templates</Button>
      </ButtonContainer>

      {placeholders.length === 0 ? null : <GenerationForm />}

      <Modal
        isOpen={isModalOpen}
        content={<AddTemplates closeModal={closeModal} />}
        onClose={closeModal}
      />
    </>
  )
}
