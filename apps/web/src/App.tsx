import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { router } from './routes/routes'
import { store } from './app/store'
import { theme } from './shared/styles/theme'
import { Gql } from './client'

const GlobalStyleContainer = styled.div`
    *, *::before, *::after { box-sizing: border-box; }
`

function App() {
    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <ApolloProvider client={Gql.client}>
                <GlobalStyleContainer>
                    <RouterProvider router={router} />
                </GlobalStyleContainer>
            </ApolloProvider>
        </Provider>
    </ThemeProvider>
}

export default App
