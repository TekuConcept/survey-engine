import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    IconButton,
    LoggedInText,
    TopBar,
    TopBarRight,
} from './primitive'
import { Vector } from '@shared/vectors'
import { theme } from '@shared/styles/theme'
import { AnchoredMenu, ContextMenu, MenuItemDef } from '@shared/ui'
import { Paths } from '@routes/paths'
import { ReduxPie, useAppDispatch, useAppSelector } from '@app/store'

function useOpenState(initial = false) {
    const [open, setOpen] = React.useState(initial)
    const openMenu = React.useCallback(() => setOpen(true), [])
    const closeMenu = React.useCallback(() => setOpen(false), [])
    const toggleMenu = React.useCallback(() => setOpen(v => !v), [])
    return { open, openMenu, closeMenu, toggleMenu }
}

const accountMenuItems: MenuItemDef[] = [
    { key: 'account', label: 'Account Settings', icon: Vector.Nut },
    { kind: 'separator', key: 'sep-1' },
    { key: 'logout', label: 'Logout', icon: Vector.Logout },
]

type AccountMenuKey = 'account' | 'logout'

function makeAccountMenuSelectHandler(args: {
    closeAccountMenu: () => void
    onLogout: () => void
    onAccountSettings?: () => void
}) {
    const { closeAccountMenu, onLogout, onAccountSettings } = args

    return (key: string) => {
        closeAccountMenu()

        switch (key as AccountMenuKey) {
            case 'logout': onLogout(); return
            case 'account': onAccountSettings?.(); return
            default: return
        }
    }
}

export function AccountBar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user = useAppSelector((s) => s.auth.user)
    const handle = user?.username?.toLowerCase() ?? '—'
    const {
        open: accountOpen,
        closeMenu: closeAccountMenu,
        toggleMenu: toggleAccountMenu,
    } = useOpenState(false)
    const accountBtnRef = React.useRef<HTMLButtonElement | null>(null)

    const onLogout = React.useCallback(async () => {
        await dispatch(ReduxPie.auth.logoutUser())
        navigate(Paths.login)
    }, [dispatch, navigate])

    const onSelect = React.useMemo(() =>
        makeAccountMenuSelectHandler({
            closeAccountMenu,
            onLogout,
            onAccountSettings: () => {
                // navigate(Paths.accountSettings) // if/when you add it
            },
        }),
        [closeAccountMenu, onLogout]
    )

    return <TopBar>
        <TopBarRight>
            <LoggedInText>
                Logged in as <span>@{handle}</span>
            </LoggedInText>

            <div>
                <IconButton
                    ref={accountBtnRef}
                    aria-label='Account menu'
                    onClick={toggleAccountMenu}
                >
                    <Vector.User color={theme.color.text.muted} />
                </IconButton>

                <AnchoredMenu
                    open={accountOpen}
                    onClose={closeAccountMenu}
                    anchorRef={accountBtnRef}
                >
                    <ContextMenu
                        items={accountMenuItems}
                        onSelect={onSelect}
                    />
                </AnchoredMenu>
            </div>
        </TopBarRight>
    </TopBar>
}
