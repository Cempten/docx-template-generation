import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
// local libs
import {
  DeleteIconWrapper,
  StyledTemplate,
  TemplatesContainer,
  TemplatesListPlug,
} from './styles'
import { Checkbox } from '@components/generic'
import { useTemplates } from './useTemplates'

export const TemplatesList: React.FC = () => {
  const { templates, handleDeleteClick, handleTemplateClick } = useTemplates()

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
