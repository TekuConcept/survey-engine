import React from 'react'
import styled, { css } from 'styled-components'
import { CSSPropertiesWithVars } from 'styled-components/dist/types'
import { theme } from '../styles/theme'

export type LinkVariant = 'body' | 'muted' | 'caption' | 'error' | 'mono'
export type LinkTransform = 'none' | 'uppercase' | 'lowercase'
export type LinkAlign = 'left' | 'center' | 'right'
export type LinkUnderline = 'always' | 'hover' | 'none'

type ElementType = React.ElementType
type PropsOf<E extends ElementType> = React.ComponentPropsWithoutRef<E>
type PolymorphicProps<E extends ElementType, P> =
    P & { as?: E } & Omit<PropsOf<E>, keyof P | 'as'>

/** Your design-system props (keep as-is, minus anchor-only inheritance). */
export type TextLinkOwnProps = {
    /** Visual style preset. */
    variant?: LinkVariant

    /** Underline behavior. */
    underline?: LinkUnderline

    /** Optional overrides (kept minimal). */
    color?: string
    weight?: number | string
    transform?: LinkTransform
    align?: LinkAlign

    /** Force block-level rendering (useful in forms or cards). */
    block?: boolean

    /** Controlled spacing (kept explicit). */
    marginBottom?: number | string

    children: React.ReactNode

    className?: string
    style?: CSSPropertiesWithVars
}

/**
 * Polymorphic props:
 * - Default element is 'a'
 * - If you do as={Link}, it will accept `to`, etc.
 * - If you do plain <TextLink href="..."> it accepts anchor props.
 */
export type LinkProps<E extends ElementType = 'a'> =
    PolymorphicProps<E, TextLinkOwnProps>

export function TextLink<E extends React.ElementType = 'a'>({
    variant = 'body',
    underline = 'none',
    color,
    weight,
    transform = 'none',
    align = 'left',
    block = false,
    marginBottom = 0,
    children,
    className,
    style,
    as,
    ...rest
}: LinkProps<E>) {
    return <StyledLink
        as={as as any}
        {...rest}
        $variant={variant}
        $color={color}
        $weight={weight}
        $transform={transform}
        $underline={underline}
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
    </StyledLink>
}

/* ---------- styles ---------- */

const StyledLink = styled.a<{
    $variant: LinkVariant
    $color?: string
    $weight?: number | string
    $transform: LinkTransform
    $underline: LinkUnderline
    $align: LinkAlign
    $block: boolean
    $mb: number | string
}>`
    box-sizing: border-box;
    background: transparent;

    margin: 0;
    ${({ $mb }) => ($mb ? `margin-bottom: ${$mb};` : 'margin-bottom: 0;')}
    ${({ $block }) => ($block ? 'display: block;' : 'display: inline;')}

    text-align: ${({ $align }) => $align};
    text-transform: ${({ $transform }) => $transform};
    text-decoration: none;
    cursor: pointer;

    font-family: ${({ theme }) => theme.font.family.base};
    line-height: 1.4;

    ${({ $variant }) => variantStyles[$variant]}
    ${({ $color }) => ($color ? `color: ${$color};` : '')}
    ${({ $weight }) => ($weight ? `font-weight: ${$weight};` : '')}
    ${({ $underline }) => underlineStyles[$underline]}

    transition: color 0.2s ease, text-decoration-color 0.2s ease;

    &:hover {
        text-decoration-thickness: 1px;
    }

    &:focus-visible {
        outline: 2px solid rgba(62, 132, 242, 0.35);
        outline-offset: 2px;
        border-radius: 4px;
    }
`

const variantStyles: Record<LinkVariant, ReturnType<typeof css>> = {
    body: css`
        color: ${theme.color.action.primary};
        font-weight: ${theme.font.weight.normal};
        font-size: ${theme.font.size.nm};
        line-height: 1.55;

        &:hover { color: ${theme.color.action.primaryHover}; }
    `,
    muted: css`
        color: ${theme.color.text.muted};
        font-weight: ${theme.font.weight.normal};
        font-size: ${theme.font.size.nm};
        line-height: 1.55;

        &:hover { color: ${theme.color.text.mutedHover}; }
    `,
    caption: css`
        color: ${theme.color.action.primary};
        font-weight: ${theme.font.weight.medium};
        font-size: ${theme.font.size.xs};
        line-height: 1.45;

        &:hover { color: ${theme.color.action.primaryHover}; }
    `,
    error: css`
        color: ${theme.color.text.error};
        font-weight: ${theme.font.weight.semibold};
        font-size: ${theme.font.size.xs};
        line-height: 1.45;

        &:hover { color: ${theme.color.text.errorHover}; }
    `,
    mono: css`
        font-family: ${({ theme }) => theme.font.family.mono};
        color: ${theme.color.action.primary};
        font-weight: ${theme.font.weight.medium};
        font-size: ${theme.font.size.sm};
        line-height: 1.45;

        &:hover { color: ${theme.color.action.primaryHover}; }
    `,
}

const underlineStyles: Record<LinkUnderline, ReturnType<typeof css>> = {
    always: css`
        text-decoration: underline;
    `,
    hover: css`
        text-decoration: none;

        &:hover { text-decoration: underline; }
    `,
    none: css`
        text-decoration: none;
    `,
}
