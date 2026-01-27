import styled from 'styled-components'

export function PrimaryKeyValue({
    label = '',
    value = '',
}: {
    label?: string
    value?: string
}) {
    return <Container>
        <Value>{value}</Value>
        <Label>{label}</Label>
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: ${({ theme }) => theme.font.family.base};
    font-weight: ${({ theme }) => theme.font.weight.normal};

    border: 1px solid ${({ theme }) => theme.color.surface.project};
    border-radius: ${({ theme }) => theme.component.card.radius};
    background-color: ${({ theme }) => theme.color.surface.cardExtra};

    width: 100%;
    padding: ${({ theme }) => theme.space[4]};
    box-sizing: border-box;
`

const Label = styled.span`
    color: ${({ theme }) => theme.color.text.primary};
    font-size: ${({ theme }) => theme.font.size.xs};
    text-transform: uppercase;
`

const Value = styled.span`
    color: ${({ theme }) => theme.color.text.primary};
    font-size: 3em;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`
