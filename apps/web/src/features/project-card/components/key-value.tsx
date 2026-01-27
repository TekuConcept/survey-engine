import styled from 'styled-components'

export function KeyValue({
    label = '',
    value = '',
}: {
    label?: string
    value?: string
}) {
    return <Container>
        <Label>{label}:</Label>
        <Value>{value}</Value>
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.xs};
`

const Label = styled.span`
    color: ${({ theme }) => theme.color.text.muted};
    font-weight: ${({ theme }) => theme.font.weight.normal};
`

const Value = styled.span`
    color: ${({ theme }) => theme.color.text.muted};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    margin-left: 0.5em;
`
