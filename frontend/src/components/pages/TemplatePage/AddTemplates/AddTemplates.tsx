import React, { useState } from 'react'
// local libs
import { Dropzone } from './Dropzone'
import {
  AddTemplatesContained,
  Title,
  CloseIconWrapper,
  ButtonContainer,
} from './styles'
import { ReactComponent as CloseIcon } from './assets/cross-icon.svg'
import { Button } from '@components/generic'
// types
import { AddTemplatesProps } from './types'

export const AddTemplates: React.FC<AddTemplatesProps> = ({ closeModal }) => {
  const [files, setFiles] = useState<Array<File>>([])

  const onDrop = (acceptedFiles: Array<File>) =>
    setFiles([...files, ...acceptedFiles])

  const onDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    const deletedFileName = event.currentTarget.dataset.name
    setFiles(files.filter((file) => file.name !== deletedFileName))
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
        <Button margin="0 15px 0 0" disabled={!isFiles}>
          Add templates
        </Button>
        <Button width="87px" onClick={closeModal}>
          Cancel
        </Button>
      </ButtonContainer>
    </AddTemplatesContained>
  )
}
