import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import styled from 'styled-components'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
`

const Title = styled.h1`
    color: #333;
    margin-bottom: 1rem;
`

const Subtitle = styled.p`
    color: #666;
    font-size: 1.1rem;
`

function App() {
    return (
        <ApolloProvider client={client}>
            <Container>
                <Title>Survey Engine</Title>
                <Subtitle>Welcome to Survey Engine - Web App</Subtitle>
            </Container>
        </ApolloProvider>
    )
}

export default App
