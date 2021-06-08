import React, { useEffect, useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
// local libs
import {
  DeleteIconWrapper,
  StyledTemplate,
  TemplatesContainer,
  TemplatesListPlug,
} from './styles'
import { Checkbox } from '@components/generic'
// types
import { Template } from './types'
import { useApi } from '@components/hooks'

const newTemplate = (title: string): Template => ({
  title,
  checked: false,
})

export const TemplatesList: React.FC = () => {
  const { getTemplates, deleteTemplate } = useApi()
  const [templates, setTemplates] = useState<Array<Template>>([])

  useEffect(() => {
    const requestTemplates = async () => {
      const templiteTitles = await getTemplates()

      if (templiteTitles) {
        const newTemplates = templiteTitles.map((x) => newTemplate(x))
        setTemplates(newTemplates)
      }
    }
    requestTemplates()
  }, [])

  const handleTemplateClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const clickedTemplate = e.currentTarget.dataset.name
    const updatedTemplates = templates.map((x) =>
      x.title !== clickedTemplate
        ? x
        : {
            ...x,
            checked: !x.checked,
          },
    )
    setTemplates(updatedTemplates)
  }

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    const clickedTemplate = e.currentTarget.dataset.name

    if (clickedTemplate) {
      const deletedTemplate = await deleteTemplate(clickedTemplate)
      setTemplates(
        templates.filter((template) => template.title !== deletedTemplate),
      )
    }
  }

  return (
    <TemplatesContainer>
      {templates.length === 0 ? (
        <TemplatesListPlug>
          There are no templates available yet. To upload click on the &quot;Аdd
          templates&quot; button
        </TemplatesListPlug>
      ) : (
        templates.map(({ title, checked }) => (
          <StyledTemplate
            key={title}
            data-name={title}
            onClick={handleTemplateClick}
          >
            <Checkbox checked={checked} margin="0 15px 0 0" />

            {title}

            <DeleteIconWrapper data-name={title} onClick={handleDeleteClick}>
              <DeleteIcon cursor="pointer" boxSize={6} />
            </DeleteIconWrapper>
          </StyledTemplate>
        ))
      )}
    </TemplatesContainer>
  )
}
