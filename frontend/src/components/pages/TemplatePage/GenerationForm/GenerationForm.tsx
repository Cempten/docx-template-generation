import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// local libs
import { useAppSelector } from '@store'
import { selectPickedTemplatesData } from '@store/CheckedTemplatesData'
import { GenerationFormContainer, ButtonContainer } from './styles'
import { PlaceholdersList } from './PlaceholdersList'
import { Button } from '@components/generic'
import { useApi } from '@hooks'
// types
import { FormData } from './types'

export const GenerationForm: React.FC = () => {
  const [preparedFiles, setPreparedFiles] = useState<Array<string>>([])
  const { getPreparedFileNames } = useApi()
  const { pickedTemplates } = useAppSelector(selectPickedTemplatesData)

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (formData: FormData) => {
    const fileNames = await getPreparedFileNames(pickedTemplates, formData)
    setPreparedFiles(fileNames)
  }

  return (
    <GenerationFormContainer onSubmit={handleSubmit(onSubmit)}>
      <PlaceholdersList register={register} />

      <ButtonContainer>
        <Button type="submit" margin="0 15px 0 0">
          Generate documents
        </Button>
        <Button disabled={preparedFiles.length === 0}>
          Download documents
        </Button>
      </ButtonContainer>
    </GenerationFormContainer>
  )
}
