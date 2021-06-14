import React from 'react'
// local libs
import { BaseLayoutContainer, PageContent } from './styles'

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <BaseLayoutContainer>
      <PageContent>{children}</PageContent>
    </BaseLayoutContainer>
  )
}
