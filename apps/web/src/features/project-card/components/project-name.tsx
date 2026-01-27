import React from 'react'
import styled from 'styled-components'

export type ProjectNameProps = {
    children?: React.ReactNode
    titleOnHover?: boolean
    className?: string
    style?: React.CSSProperties
}

export function ProjectName({
    children,
    titleOnHover = true,
    className,
    style,
}: ProjectNameProps) {
    const title =
        titleOnHover && typeof children === 'string'
        ? children : undefined

    return <Name className={className} style={style} title={title}>
        {children}
    </Name>
}

const Name = styled.span`
    min-width: 0; /* critical for flex ellipsis */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.sm};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.color.text.primary};
`
