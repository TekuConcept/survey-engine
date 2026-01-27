import styled from 'styled-components'

export const RightPaneWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    box-sizing: border-box;

    min-width: 0;
    min-height: 0;
    padding: 48px;

    /* Desktop: Right should appear second (right side) */
    order: 2;

    @media (max-width: 990px) {
        padding: 24px;
    }

    @media (max-width: 765px) {
        flex: none;
        /* Mobile/tablet: Right should be top */
        order: 1;
        padding: 24px;
    }
`
