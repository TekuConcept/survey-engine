import React from 'react'
import styled, { css } from 'styled-components'
import { CSSPropertiesWithVars } from 'styled-components/dist/types'
import { theme } from '../styles/theme'

export type TextVariant = 'body' | 'muted' | 'caption' | 'error' | 'mono'
export type TextTransform = 'none' | 'uppercase' | 'lowercase'
export type TextAlign = 'left' | 'center' | 'right'

export type TextProps = {
    /**
     * Semantic tag. Defaults to 'span' for UI-first usage.
     * Use 'p' when you truly want a paragraph element.
     */
    as?: keyof JSX.IntrinsicElements

    /** Visual style preset. */
    variant?: TextVariant

    /** Optional overrides (keep minimal). */
    color?: string
    weight?: number | string
    transform?: TextTransform
    align?: TextAlign

    /**
     * Optional behavior for blocks of text without relying on browser defaults.
     * - When true, forces display:block
     * - If you also render as='p', it behaves like a paragraph but with controlled margins
     */
    block?: boolean

    /**
     * Controlled spacing (UI-friendly).
     * Defaults to 0 so layout components (Stack) own spacing.
     */
    marginBottom?: number | string

    children?: React.ReactNode

    className?: string
    style?: CSSPropertiesWithVars
}

export function Text({
    as = 'span',
    variant = 'body',
    color,
    weight,
    transform = 'none',
    align = 'left',
    block = false,
    marginBottom = 0,
    children,
    className,
    style,
}: TextProps) {
    return <StyledText
        as={as}
        $variant={variant}
        $color={color}
        $weight={weight}
        $transform={transform}
        $align={align}
        $block={block}
        $mb={typeof marginBottom === 'number'
            ? `${marginBottom}px`
            : marginBottom
        }
        className={className}
        style={style}
    >
        {children}
    </StyledText>
}

/* ---------- styles ---------- */

const StyledText = styled.span<{
    $variant: TextVariant
    $color?: string
    $weight?: number | string
    $transform: TextTransform
    $align: TextAlign
    $block: boolean
    $mb: string
}>`
    box-sizing: border-box;
    background: transparent;

    margin: 0;
    ${({ $mb }) => ($mb ? `margin-bottom: ${$mb};` : '')};
    ${({ $block }) => ($block ? 'display: block;' : 'display: inline;')}

    text-align: ${({ $align }) => $align};
    text-transform: ${({ $transform }) => $transform};

    font-family: ${({ $variant, theme }) =>
        $variant === 'mono'
        ? theme.font.family.mono
        : theme.font.family.base};

    ${({ $variant }) => variantStyles[$variant]}
    ${({ $color }) => ($color ? `color: ${$color};` : '')}
    ${({ $weight }) => ($weight ? `font-weight: ${$weight};` : '')}
`

const variantStyles: Record<TextVariant, ReturnType<typeof css>> = {
    body: css`
        font-size: ${theme.font.size.nm};
        line-height: 1.55;
        font-weight: ${theme.font.weight.normal};
        color: ${theme.color.text.primary};
    `,
    muted: css`
        font-size: ${theme.font.size.sm};
        line-height: 1.55;
        font-weight: ${theme.font.weight.normal};
        color: ${theme.color.text.muted};
    `,
    caption: css`
        font-size: ${theme.font.size.xs};
        line-height: 1.45;
        font-weight: ${theme.font.weight.medium};
        color: ${theme.color.text.caption};
    `,
    error: css`
        font-size: ${theme.font.size.xs};
        line-height: 1.45;
        font-weight: ${theme.font.weight.semibold};
        color: ${theme.color.text.error};
    `,
    mono: css`
        font-size: ${theme.font.size.sm};
        line-height: 1.45;
        font-weight: ${theme.font.weight.medium};
        color: ${theme.color.text.mono};
    `,
}
