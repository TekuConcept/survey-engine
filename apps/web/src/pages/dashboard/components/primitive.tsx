import styled from 'styled-components'

/** Layout */

export const PageRoot = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;

    overflow: hidden; /* keep scroll contained to inner areas */
`

export const LeftRail = styled.aside`
    flex: 0 0 auto; /* 'takes what it needs' */
    height: 100%;
`

export const RightRail = styled.main`
    flex: 1 1 auto;
    min-width: 0; /* critical for nested overflow + grid */
    height: 100%;

    display: flex;
    flex-direction: column;
`

/** Top bar */

export const TopBar = styled.header`
    flex: 0 0 auto;

    height: 64px; /* 'takes what it needs' - adjust to match your theme */
    display: flex;
    align-items: center;

    padding: 0 20px;
`

export const TopBarRight = styled.div`
    margin-left: auto;

    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
`

export const LoggedInText = styled.div`
    white-space: nowrap;
    opacity: 0.9;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.color.text.muted};

    & > span {
        font-weight: ${({ theme }) => theme.font.weight.semibold};
    }
`

/** Content area */

export const Content = styled.section`
    flex: 1 1 auto;
    min-height: 0; /* allow inner scroll area to size correctly */

    display: flex;
`

// Adds bottom/right margin to the edge of the page (and a little left/top breathing room too)
export const ContentInner = styled.div`
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;

    display: flex;
    flex-direction: column;

    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.color.surface.project};

    /* Match the grid gap so cards never touch the container edge */
    padding: ${({ theme }) => theme.space[5]} 0;
    margin: 0 20px 24px 0;
`

/** Controls row: search left, new button right */

export const ControlsRow = styled.div`
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};

    margin: ${({ theme }) => theme.space[5]};
    margin-top: 0;
`

export const SearchWrap = styled.div`
    flex: 1 1 auto;
    min-width: 240px;
    max-width: 640px;
`

export const CardCell = styled.div`
    min-width: 0;

    /* Force cards to respect the grid track width */
    & > * {
        width: 100%;
        min-width: 0;
    }
`

/** Grid: scrollable, responsive columns */

export const GridScrollArea = styled.div`
    flex: 1 1 auto;
    min-height: 0;

    /* scroll vertically only; keep the layout horizontally fixed */
    overflow-y: auto;
    overflow-x: hidden;

    /* Optional: compensate for scrollbar without breaking symmetry */
    box-sizing: border-box;

    padding: 0 ${({ theme }) => theme.space[5]};
`

export const CardsGrid = styled.div`
    display: grid;
    width: 100%;

    /* Consistent gap; cards stretch naturally */
    gap: ${({ theme }) => theme.space[4]};

    /*
      Default: responsive scaling based on a preferred min card width.
      Cards will stretch to fill the row, and columns increase as room allows.
    */
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    /* Ensure grid children can shrink within their tracks (prevents overflow/overlap) */
    & > * {
        min-width: 0;
    }

    /*
      Small screens: force exactly 2 columns and let cards shrink to fit
      (no horizontal scroll, no overlap).
    */
    @media (max-width: 620px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    align-items: stretch;
`

export const IconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;

    border: 0;
    border-radius: 999px;

    cursor: pointer;

    background-color: ${({ theme }) => theme.color.control.button.account.idle};

    &:hover {
        background-color: ${({ theme }) => theme.color.control.button.account.hover};
    }

    &:active {
        background-color: ${({ theme }) => theme.color.control.button.account.active};
    }
`
