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

const template1 = {
  title: 'handover_protocol_NAKUKOP_template',
  checked: false,
}

const template2 = {
  title: 'handover_protocol_NAKUKOP_templatex',
  checked: false,
}

const template3 = {
  title: 'handover_protocol_NAKUKOP_templatexx',
  checked: false,
}

export const TemplatesList: React.FC = () => {
  const [templates, setTemplates] = useState<Array<Template>>([])

  useEffect(() => {
    setTemplates([template1, template2, template3])
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

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    const clickedTemplate = e.currentTarget.dataset.name
    console.log(clickedTemplate)
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
