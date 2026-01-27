import styled from 'styled-components'
import { Vector } from '@shared/vectors'
import { Logo } from './components/logo'
import { NavBar } from './components/nav-bar'
import { Separator } from './components/separator'
import { Metrics } from './components/metrics'

export function ProjectSideBar() {
    return <SideBarContainer>
        <Logo />
        <NavBar
            options={[
                { label: 'Home',     icon: Vector.Home    },
                { label: 'Settings', icon: Vector.Nut     },
                { label: 'Archived', icon: Vector.Archive },
            ]}
            currentIndex={1}
        />
        <Separator />
        <Metrics
            items={[
                { label: 'Total Projects', value: '24' },
                { label: 'Active Projects', value: '8' },
                { label: 'Responses', value: '2436' },
            ]}
        />
    </SideBarContainer>
}

export const SideBarContainer = styled.aside`
    height: 100%;
    width: fit-content;
    max-width: 350px;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    padding: ${({ theme }) => theme.space[6]};
    box-sizing: border-box;
`
