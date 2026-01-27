import styled from 'styled-components'

export const LeftPaneWrapper = styled.div`
    display: flex;
    flex: 1;
    box-sizing: border-box;
    flex-direction: column;

    min-width: 0;
    min-height: 0;
    padding: 48px;

    background: ${({ theme }) => theme.color.surface.inverse};
    background: ${({ theme }) => theme.color.surface.inverseGradient};

    /* Desktop: Left should appear first (left side) */
    order: 1;

    @media (max-width: 990px) {
        padding: 24px;
    }

    @media (max-width: 765px) {
        display: block;
        flex: none;
        /* Stacked: Left should be bottom */
        order: 2;
        padding: 24px;
    }
`
