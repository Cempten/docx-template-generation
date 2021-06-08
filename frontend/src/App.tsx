import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import { BaseLayout } from './components/BaseLayout'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <BaseLayout></BaseLayout>
      </ChakraProvider>
    </ThemeProvider>
  )
}
