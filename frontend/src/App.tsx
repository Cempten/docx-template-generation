import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@emotion/react'
// local libs
import { theme } from './theme'
import { BaseLayout } from './components/BaseLayout'
import { TemplatePage } from './components/pages'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <BaseLayout>
          <TemplatePage />
        </BaseLayout>
      </ChakraProvider>
    </ThemeProvider>
  )
}
