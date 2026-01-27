import { ProjectSideBar } from '@/features/project-nav'
import {
    LeftRail,
    PageRoot,
    RightRail,
} from './components/primitive'
import { AccountBar } from './components/account-bar'
import { MainContent } from './components/content'

export function DashboardPage() {
    return <PageRoot>
        <LeftRail>
            <ProjectSideBar />
        </LeftRail>

        <RightRail>
            <AccountBar />
            <MainContent />
        </RightRail>
    </PageRoot>
}
