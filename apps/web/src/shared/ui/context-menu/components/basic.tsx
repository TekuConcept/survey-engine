import styled from 'styled-components'

const verticalPaddingEm = 0.6

export const MenuRoot = styled.div`
    background: ${({ theme }) => theme.color.surface.menu.fill};
    box-shadow: ${({ theme }) => theme.shadow.menuitem};
    border-radius: ${({ theme }) => theme.radius.xs};

    /* menu text defaults */
    font-family: ${({ theme }) => theme.font.family.base};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.color.text.muted};

    min-width: 250px;
`

/** Only top/bottom padding for the whole menu list */
export const MenuPadTopBottom = styled.div`
    padding: ${verticalPaddingEm}em 0;
`

/**
 * Each item fills width; no vertical gap between items.
 * We use a button to get keyboard focus semantics for free.
 */
export const ItemWrap = styled.div<{ $disabled: boolean; $hasSubmenu: boolean }>`
    position: relative;

    /* Open submenu on hover or keyboard focus within */
    ${({ $hasSubmenu }) =>
        $hasSubmenu
            ? `
        &:hover > div,
        &:focus-within > div {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
    ` : ''}
`

export const ItemButton = styled.button`
    width: 100%;
    border: 0;
    background: transparent;

    padding: 7px 12px;
    margin: 0;

    display: grid;
    /* icon col, label col, chevron col */
    grid-template-columns: 34px 1fr 18px;
    align-items: center;

    color: ${({ theme }) => theme.color.text.muted};
    font: inherit;
    text-align: left;

    cursor: pointer;

    /* no “gap between menu items” => no margins */
    border-radius: 0;

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.color.surface.menu.item};
    }
    &:active:not(:disabled) {
        background: ${({ theme }) => theme.color.surface.menu.active};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    &:focus-visible {
        outline: 2px solid rgba(62, 132, 242, 0.35);
        outline-offset: -2px;
    }
`

/** Fixed width = alignment across items regardless of icon presence */
export const IconCol = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 18px;
    color: currentColor;
`

export const LabelCol = styled.span`
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const AffordanceCol = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
`

export const Chevron = styled.span`
    opacity: 0.7;
    font-size: 30px;
    line-height: 0.2;
    font-weight: ${({ theme }) => theme.font.weight.thin};
    transform: translateY(-.1em);
`

/** Submenu: positioned to the right, same styling as menu */
export const SubmenuPane = styled.div`
    position: absolute;
    /* visually aligns submenu with parent menu padding */
    top: -${verticalPaddingEm}em;
    left: calc(100%);

    background: ${({ theme }) => theme.color.surface.menu.fill};
    box-shadow: ${({ theme }) => theme.shadow.menuitem};
    border-radius: ${({ theme }) => theme.radius.xs};

    min-width: 200px;

    opacity: 0;
    pointer-events: none;
    transform: translateY(-2px);

    transition: opacity 0.12s ease, transform 0.12s ease;

    z-index: 10;
`

/** Group separator: 1px line with ~0.8em margin above/below */
export const MenuSeparator = styled.div`
    margin: ${verticalPaddingEm}em 0;
    height: 1px;
    background: rgba(67, 83, 122, 0.18);
`
