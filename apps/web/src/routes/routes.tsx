import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@app/layouts/app-shell'
import { IndexRedirect, RequireAuth, RequireGuest } from '@app/routing/session-guards'
import { NotFoundPage } from '@pages/not-found'
import { PlaygroundPage } from '@pages/playground'
import { LoginPage } from '@pages/auth/login'
import { CreateAccountPage } from '@pages/auth/create-account'
import { DashboardPage } from '@pages/dashboard'
import { ComponentShowcasePage } from '@pages/component-showcase/component-showcase-page'
import { Paths } from './paths'

export const router = createBrowserRouter([{
    element: <AppShell />,
    children: [
        { index: true, element: <IndexRedirect /> },
        {
            path: Paths.login,
            element: <RequireGuest><LoginPage/></RequireGuest>,
        },
        {
            path: Paths.createAccount,
            element: <RequireGuest><CreateAccountPage/></RequireGuest>,
        },
        {
            path: Paths.dashboard,
            element: <RequireAuth><DashboardPage/></RequireAuth>,
        },
        { path: Paths.playground, element: <PlaygroundPage /> },
        { path: Paths.mock, element: <ComponentShowcasePage /> },
        { path: '*', element: <NotFoundPage /> },
    ],
}])
