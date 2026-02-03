import styled from 'styled-components'
import { RichTextboxMode } from '../types'
import { Editable } from 'slate-react'

interface PrimProps {
    $mode: RichTextboxMode
    $dataTarget?: boolean
}

export const P = styled.p`
    margin: 0;
`

export const LeafSpan = styled.span`
    /* Keep it simple; you’ll add marks here later */
`

export const RichTextboxContainer = styled.div<PrimProps>`
    display: grid;
    padding: 10px 12px;
    border-radius: 10px;
    background: ${({ theme, $mode }) => theme.forms.rtb.input[$mode].background};

    // &[data-focused='true'] {}
`

export const Separator = styled.div<PrimProps>`
    height: 1px;
    background-color: ${({ theme }) => theme.forms.rtb.sep.background.default};

    position: relative;
    overflow: hidden;
    transition: height 140ms ease, opacity 140ms ease;

    /* colored overlay that fills center-outward */
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        height: 100%;
        width: 0%;
        transform: translateX(-50%);
        background: ${({ theme }) => theme.forms.rtb.sep.background.focus};
        opacity: 0;

        transition: width 0.3s cubic-bezier(0.4, 0, 0.6, 1);
    }

    ${RichTextboxContainer}[data-focused='true'] & {
        height: 2px;
        background: ${({ theme }) => theme.forms.rtb.sep.background.default2};

        &::after {
            width: 100%;
            opacity: 1;
        }
    }

    ${RichTextboxContainer}[data-focused='false'] & {
        &::after {
            width: 0%;
            opacity: 0;
        }
    }
`

export const ToolbarWrap = styled.div`
    overflow: hidden;
    max-height: 0px;
    opacity: 0;
    transform: translateY(-4px);
    transition:
        max-height 0.4s ease, // 180ms
        opacity 140ms ease,
        transform 0.3s ease; // 140ms

    &[data-open='true'] {
        max-height: 52px; /* enough for one row of buttons */
        opacity: 1;
        transform: translateY(0px);
    }
`

export const ToolbarRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 0 0;
`

export const ToolButton = styled.button<{
    $active?: boolean
    $mode: RichTextboxMode
}>`
    height: 34px;
    width: 36px;
    border-radius: 4px;

    background: ${({ theme }) => theme.forms.rtb.button.background.default};
    color: rgba(0, 0, 0, .54);
    transition: background 0.3s ease, color 0.3s ease;
    border: none;

    display: grid;
    place-items: center;
    cursor: pointer;

    ${({ $active, theme }) => $active
        ? `background: ${theme.forms.rtb.button.background.active};`
        : ''}

    &:hover {
        background: ${({ theme }) => theme.forms.rtb.button.background.hover};
    }

    &:active {
        background: ${({ theme }) => theme.forms.rtb.button.background.active};
    }

    &:focus-visible {
        outline-offset: 2px;
    }

    svg {
        width: 18px;
        height: 18px;
    }

    svg path {
        fill: ${({ theme }) => theme.forms.rtb.button.color.default};
    }

    &:hover svg path {
        fill: ${({ theme }) => theme.forms.rtb.button.color.hover};
    }

    &:active svg path {
        fill: ${({ theme }) => theme.forms.rtb.button.color.active};
    }
`

export const InputField = styled.div<PrimProps>`
    position: relative;
    box-sizing: border-box;
    min-height: ${({ theme, $mode }) => theme.forms.rtb.input[$mode].minHeight};

    cursor: text;

    /* Slate Editable inherits these */
    color: ${({ theme }) => theme.color.text.primary};
    font-family: ${({ theme }) => theme.font.family.forms};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    font-size: ${({ theme, $mode }) => theme.forms.rtb.input[$mode].fontSize};
    line-height: ${({ theme, $mode }) => theme.forms.rtb.input[$mode].lineHeight};
    letter-spacing: 0;

    /* Make sure empty editor still has height */
    > [contenteditable='true'] {
        min-height: inherit;
        outline: none;
    }

    /* Placeholder styling (Slate-specific) */
    [data-slate-placeholder='true'] {
        color: ${({ theme }) => theme.color.text.muted};
        pointer-events: none;
    }
`

interface EditableProps extends React.ComponentProps<typeof Editable> {
    $mode: RichTextboxMode
    $dataTarget?: boolean
}

export const StyledEditable = styled(Editable)<EditableProps>`
    ${({ $mode, $dataTarget }) =>
        ($mode === RichTextboxMode.Question && $dataTarget)
        ? `
        padding: 16px;
        background: #f9f9f9;
        ` : ''}
`

export const ToolbarInner = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    height: 45px; /* fixed so collapse animation is stable */
    padding-top: 4px;

    /* Prevent accidental text selection while clicking buttons */
    user-select: none;
`
