import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
// local libs
import { DeleteIconWrapper, Template, TemplatesContainer } from './styles'

const templates = [
  'handover_protocol_NAKUKOP_template',
  'handover_protocol_NAKUKOP_template',
  'handover_protocol_NAKUKOP_template',
]

export const TemplatesList: React.FC = () => {
  return (
    <TemplatesContainer>
      {templates.map((x) => (
        <Template key={x}>
          {x}
          <DeleteIconWrapper>
            <DeleteIcon cursor="pointer" boxSize={6} />
          </DeleteIconWrapper>
        </Template>
      ))}
    </TemplatesContainer>
  )
}
