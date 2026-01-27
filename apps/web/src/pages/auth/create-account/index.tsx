import styled from 'styled-components'

import { ColumnCenter, PageContainer, RowCenter } from '@shared/layouts'
import { ToastProvider } from '@shared/ui'
import { LeftPaneWrapper, RightPaneWrapper } from '@pages/auth/shared'
import { LeftPane } from './components/left-pane'
import { RightPane } from './components/right-pane'

export function CreateAccountPage() {
    return <ToastProvider placement='top-center'>
        <PageContainer>
            <ColumnCenter>
                <RowCenter>
                    <AccountContainer>
                        <LeftPaneWrapper>
                            <LeftPane />
                        </LeftPaneWrapper>
                        <RightPaneWrapper>
                            <RightPane />
                        </RightPaneWrapper>
                    </AccountContainer>
                </RowCenter>
            </ColumnCenter>
        </PageContainer>
    </ToastProvider>
}

export const AccountContainer = styled.div`
    display: flex;
    width: 770px;

    border-radius: 10px;
    overflow: hidden;

    background: ${({ theme }) => theme.color.surface.card};
    box-shadow: ${({ theme }) => theme.shadow.card};

    /* Desktop: Left on left, Right on right (handled via wrapper order below) */
    flex-direction: row;

    @media (max-width: 990px) {
        width: 690px;
    }

    @media (max-width: 765px) {
        width: 540px;
        flex-direction: column;
    }

    @media (max-width: 575px) {
        width: 100%;
    }
`
