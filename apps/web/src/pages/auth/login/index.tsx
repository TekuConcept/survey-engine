import styled from 'styled-components'

import { ToastProvider } from '@shared/ui'
import { ColumnCenter, PageContainer, RowCenter } from '@shared/layouts'
import { LeftPaneWrapper, RightPaneWrapper } from '@pages/auth/shared'
import { LeftPane } from './components/left-pane'
import { RightPane } from './components/right-pane'

export function LoginPage() {
    return <ToastProvider placement='top-center'>
        <PageContainer>
            <ColumnCenter>
                <RowCenter>
                    <LoginContainer>
                        <LeftPaneWrapper>
                            <LeftPane />
                        </LeftPaneWrapper>
                        <RightPaneWrapper>
                            <RightPane />
                        </RightPaneWrapper>
                    </LoginContainer>
                </RowCenter>
            </ColumnCenter>
        </PageContainer>
    </ToastProvider>
}

export const LoginContainer = styled.div`
    display: flex;
    width: 770px;
    min-height: 468px;

    border-radius: 10px;
    overflow: hidden;

    background: ${({ theme }) => theme.color.surface.card};
    box-shadow: ${({ theme }) => theme.shadow.card};

    /* Desktop: Left on left, Right on right (handled via wrapper order below) */
    flex-direction: row;

    @media (max-width: 990px) {
        width: 690px;
        min-height: 420px;
    }

    @media (max-width: 765px) {
        width: 540px;
        min-height: 612px;
        flex-direction: column;
    }

    @media (max-width: 575px) {
        width: 100%;
        min-height: 612px;
    }
`
