import styled from 'styled-components'
import { theme } from '../styles/theme'

type TextTransform = 'uppercase' | 'lowercase' | 'none'

export type LabelProps = {
    text?: string

    /**
     * Text color override.
     * Default: rgb(0, 0, 0)
     */
    color?: string

    /**
     * Text transform shortcut.
     * Default: 'uppercase'
     */
    transform?: TextTransform

    /**
     * Optional `htmlFor` to associate with inputs.
     */
    htmlFor?: string
}

const StyledLabel = styled.label<{
    $color: string
    $transform: TextTransform
}>`
    box-sizing: border-box;
    display: inline-block;
    cursor: default;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.bold};

    margin-bottom: 8px;

    color: ${({ $color }) => $color};
    text-transform: ${({ $transform }) => $transform};
    letter-spacing: 1px;
    line-height: 1.8;
`

export function Label({
    text,
    color = theme.color.text.primary,
    transform = 'uppercase',
    htmlFor,
}: LabelProps) {
    return <StyledLabel
        htmlFor={htmlFor}
        $color={color}
        $transform={transform}
    >
        {text}
    </StyledLabel>
}
