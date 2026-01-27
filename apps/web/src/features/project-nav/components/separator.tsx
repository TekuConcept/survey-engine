import styled from 'styled-components'

export type SeparatorProps = {
    className?: string
    style?: React.CSSProperties
}

export function Separator({ className, style }: SeparatorProps) {
    return <SeparatorRoot className={className} style={style} />
}

const SeparatorRoot = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.surface.separator};
    margin: ${({ theme }) => theme.space[6]} 0;
`
