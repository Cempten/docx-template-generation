import React from 'react'
import { useDropzone } from 'react-dropzone'
// local libs
import { DropzoneRoot, File, CloseIconWrapper, StyledText } from './styles'
import { ReactComponent as CloseIcon } from './assets/cross-icon.svg'
// types
import { DropzoneProps } from './types'

export const Dropzone: React.FC<DropzoneProps> = ({
  onDrop,
  files,
  onDelete,
  margin,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <DropzoneRoot active={isDragActive} margin={margin} {...getRootProps()}>
      <input {...getInputProps()} />

      {files.length ? (
        files.map(({ name }) => (
          <File key={name}>
            <CloseIconWrapper data-name={name} onClick={onDelete}>
              <CloseIcon />
            </CloseIconWrapper>
            <StyledText>{name}</StyledText>
          </File>
        ))
      ) : isDragActive ? (
        <StyledText>Release to drop the files here</StyledText>
      ) : (
        <StyledText>
          Drag and drop some files here, or click to select files
        </StyledText>
      )}
    </DropzoneRoot>
  )
}
