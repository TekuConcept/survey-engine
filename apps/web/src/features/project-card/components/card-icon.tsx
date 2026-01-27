import styled from 'styled-components'

export function CardIcon() {
    return <IconContainer>
        <img src='/img/ico-project.svg' alt="Project Icon" />
    </IconContainer>
}

const IconContainer = styled.div`
    width: ${({ theme }) => theme.space[4]};
    height: ${({ theme }) => theme.space[4]};
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
