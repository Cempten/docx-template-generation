import React, { useState } from 'react'
// local libs
import { useAppDispatch, useAppSelector } from '@store'
import { selectTemplates, setTemplates, Template } from '@store/templates'
import { Dropzone } from './Dropzone'
import {
  AddTemplatesContained,
  Title,
  CloseIconWrapper,
  ButtonContainer,
} from './styles'
import { ReactComponent as CloseIcon } from './assets/cross-icon.svg'
import { Button } from '@components/generic'
import { useApi } from '@hooks'
// types
import { AddTemplatesProps } from './types'

export const AddTemplates: React.FC<AddTemplatesProps> = ({ closeModal }) => {
  const templates = useAppSelector(selectTemplates)
  const dispatch = useAppDispatch()
  const { postFiles } = useApi()
  const [files, setFiles] = useState<Array<File>>([])

  const onDrop = (acceptedFiles: Array<File>) =>
    setFiles([...files, ...acceptedFiles])

  const onDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    const deletedFileName = event.currentTarget.dataset.name
    setFiles(files.filter((file) => file.name !== deletedFileName))
  }

  const sendTemplates = async () => {
    const fileNames = await postFiles(files)
    if (fileNames && fileNames.length > 0) {
      const newTemplates: Array<Template> = fileNames.map((x) => ({
        title: x,
        checked: false,
      }))

      dispatch(setTemplates([...templates, ...newTemplates]))
    }
  }

  const isFiles = files.length > 0

  return (
    <AddTemplatesContained>
      <CloseIconWrapper onClick={closeModal}>
        <CloseIcon />
      </CloseIconWrapper>

      <Title>Upload templates</Title>

      <Dropzone
        files={files}
        onDrop={onDrop}
        onDelete={onDelete}
        margin="0 0 30px 0"
      />

      <ButtonContainer>
        <Button margin="0 15px 0 0" disabled={!isFiles} onClick={sendTemplates}>
          Add templates
        </Button>
        <Button width="87px" onClick={closeModal}>
          Cancel
        </Button>
      </ButtonContainer>
    </AddTemplatesContained>
  )
}
