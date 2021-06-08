import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
// local libs
import { DeleteIconWrapper, Template, TemplatesContainer } from './styles'
import { Checkbox } from '@components/generic'

const templates = [
  'handover_protocol_NAKUKOP_template',
  'handover_protocol_NAKUKOP_templatex',
  'handover_protocol_NAKUKOP_templatexx',
]

export const TemplatesList: React.FC = () => {
  return (
    <TemplatesContainer>
      {templates.map((x) => (
        <Template key={x}>
          <Checkbox checked={true} />
          {x}
          <DeleteIconWrapper>
            <DeleteIcon cursor="pointer" boxSize={6} />
          </DeleteIconWrapper>
        </Template>
      ))}
    </TemplatesContainer>
  )
}
