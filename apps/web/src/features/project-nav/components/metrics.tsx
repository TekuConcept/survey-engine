import * as React from 'react'
import styled from 'styled-components'

export type MetricsItem = {
    label: React.ReactNode
    value: React.ReactNode
    key?: React.Key
}

export type MetricsProps = {
    items: MetricsItem[]
    className?: string
    style?: React.CSSProperties
    /** space between value and label columns */
    gap?: number
    /** min width reserved for the value column (helps alignment across rows) */
    valueColMinWidth?: number
}

export function Metrics({
    items,
    className,
    style,
    gap = 12,
    valueColMinWidth = 64,
}: MetricsProps) {
    return <MetricsRoot
        className={className}
        style={{
            ...style,
            // allow caller to override if desired
            ['--metrics-gap' as any]: `${gap}px`,
            ['--metrics-value-width' as any]: `${valueColMinWidth}px`,
        }}
    >
        {items.map((item, i) => (
            <Row key={item.key ?? i}>
                <Value title={typeof item.value === 'string' ? item.value : undefined}>
                    {item.value}
                </Value>
                <Label title={typeof item.label === 'string' ? item.label : undefined}>
                    {item.label}
                </Label>
            </Row>
        ))}
    </MetricsRoot>
}

const MetricsRoot = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-family: ${({ theme }) => theme.font.family.base};
    color: ${({ theme }) => theme.color.text.muted};
    font-size: ${({ theme }) => theme.font.size.sm};
`

const Row = styled.div`
    width: 100%;
    min-width: 0;

    display: grid;
    // grid-template-columns: minmax(var(--metrics-value-min, 44px), auto) 1fr;
    grid-template-columns: var(--metrics-value-width, 64px) 1fr;
    column-gap: var(--metrics-gap, 12px);
    align-items: baseline;
`

const Value = styled.span`
    min-width: 0;
    text-align: right;
    font-weight: ${({ theme }) => theme.font.weight.bold};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Label = styled.span`
    min-width: 0;
    text-align: left;
    font-weight: ${({ theme }) => theme.font.weight.normal};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
