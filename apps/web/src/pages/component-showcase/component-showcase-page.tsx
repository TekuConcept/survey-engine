import React from 'react'
import styled from 'styled-components'

type ComponentShowcasePageProps = {
    title?: string
    subtitle?: string
    children?: React.ReactNode
}

export function ComponentShowcasePage({
    title,
    subtitle,
    // children,
}: ComponentShowcasePageProps) {
    return <Page>
        <CenterCard>
            {title && <Title>{title}</Title>}
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <Content>
                {/* children */}
            </Content>
        </CenterCard>
    </Page>
}

/* ---------- styles ---------- */

const Page = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f8fb;
`

const CenterCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    padding: 40px 48px;
    background: white;
    border-radius: 12px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.05);
`

const Title = styled.h1`
    margin: 0;
    font-family: Lato, Roboto, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
`

const Subtitle = styled.p`
    margin: 0;
    font-family: Lato, Roboto, Arial, sans-serif;
    font-size: 14px;
    color: #6b7280;
`

const Content = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: center;
`
