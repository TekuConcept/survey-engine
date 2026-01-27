import React from 'react'
import styled, { css } from 'styled-components'
import { CSSPropertiesWithVars } from 'styled-components/dist/types'
import { theme } from '../styles/theme'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingProps = {
    /**
     * Heading level (h1–h6).
     * Determines both semantics and default styling.
     */
    level?: HeadingLevel

    /**
     * Optional color override.
     * Default: #000
     */
    color?: string

    /** Optional text alignment. */
    align?: 'left' | 'center' | 'right'

    /** Children = heading content */
    children?: React.ReactNode

    className?: string
    style?: CSSPropertiesWithVars
}

export function Heading({
    level = 1,
    color = theme.color.text.primary,
    align = 'left',
    children,
    className,
    style,
}: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return <StyledHeading
        as={Tag}
        $level={level}
        $color={color}
        $align={align}
        className={className}
        style={style}
    >
        {children}
    </StyledHeading>
}

/* ---------- styles ---------- */

const StyledHeading = styled.h1<{
    $level: HeadingLevel;
    $color: string;
    $align: 'left' | 'center' | 'right';
}>`
    margin: 0;
    color: ${({ $color }) => $color};
    text-align: ${({ $align }) => $align};

    font-family: ${({ theme }) => theme.font.family.base};

    ${({ $level }) => headingStyles[$level]}
`

const headingStyles: Record<HeadingLevel, ReturnType<typeof css>> = {
    1: css`
        font-weight: ${theme.font.weight.medium};
        font-size: ${theme.font.size.h1};
        line-height: 1.5;
        margin-bottom: 0.5rem;
    `,
    2: css`
        font-weight: ${theme.font.weight.black};
        font-size: ${theme.font.size.h2};
        line-height: 1.5;
        margin-bottom: 0.5rem;
    `,
    3: css`
        font-weight: ${theme.font.weight.light};
        font-size: ${theme.font.size.h3};
        line-height: 1.5;
        margin-bottom: 1.5rem;
    `,
    4: css`
        font-weight: ${theme.font.weight.semibold};
        font-size: ${theme.font.size.h4};
        line-height: 1.4;
        margin-bottom: 1rem;
    `,
    5: css`
        font-weight: ${theme.font.weight.semibold};
        font-size: ${theme.font.size.h5};
        line-height: 1.4;
        margin-bottom: 0.75rem;
    `,
    6: css`
        font-weight: ${theme.font.weight.semibold};
        font-size: ${theme.font.size.h6};
        line-height: 1.3;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    `,
}
