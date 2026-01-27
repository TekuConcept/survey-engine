import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    background: #ffffff;
`

const Content = styled.div`
    max-width: 520px;
    text-align: center;
`

const Code = styled.div`
    font-size: 4rem;
    font-weight: 600;
    color: #e5e7eb;
    margin-bottom: 1rem;
`

const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.75rem;
`

const Message = styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 2rem;
`

const BackButton = styled.button`
    padding: 10px 18px;
    font-size: 0.9rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: white;
    color: #111827;
    cursor: pointer;

    &:hover {
        background: #f9fafb;
    }
`

export function NotFoundPage() {
    const navigate = useNavigate()

    return <Container>
        <Content>
            <Code>404</Code>
            <Title>Page not found</Title>
            <Message>
                The page you’re looking for doesn’t
                exist or may have been moved.
            </Message>
            <BackButton onClick={() => navigate('/')}>
                Return to home
            </BackButton>
        </Content>
    </Container>
}
