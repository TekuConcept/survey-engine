import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@app/store/hooks'
import { Paths } from '@routes/paths'

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { checked, isAuthenticated } = useAppSelector((s) => s.auth)
    const location = useLocation()

    // You can return a spinner/skeleton page if you want.
    if (!checked) return null

    if (!isAuthenticated) return <Navigate
        to={Paths.login}
        replace
        state={{ from: location }}
    />

    return <>{children}</>
}

export function RequireGuest({ children }: { children: React.ReactNode }) {
    const { checked, isAuthenticated } = useAppSelector((s) => s.auth)

    if (!checked) return null

    if (isAuthenticated) return <Navigate to={Paths.dashboard} replace />

    return <>{children}</>
}

export function IndexRedirect() {
    const { checked, isAuthenticated } = useAppSelector((s) => s.auth)

    if (!checked) return null

    return <Navigate
        to={isAuthenticated ? Paths.dashboard : Paths.login}
        replace
    />
}
