import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
// local libs
import { theme } from './theme'
import { BaseLayout } from './components/BaseLayout'
import { TemplatePage } from './components/pages'
import { store } from '@store'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <BaseLayout>
            <TemplatePage />
          </BaseLayout>
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  )
}
