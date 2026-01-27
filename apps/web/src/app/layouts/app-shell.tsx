import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import {
    bootstrapAuth,
    useAppDispatch,
    useAppSelector,
} from '../store'

const Container = styled.main`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`

export function AppShell() {
    const dispatch = useAppDispatch()
    const checked = useAppSelector((s) => s.auth.checked)

    React.useEffect(() => {
        // Runs a session check on app start
        // That way we can navigate the user accordingly
        if (!checked) dispatch(bootstrapAuth())
    }, [checked, dispatch])

    return <Container>
        <Outlet />
    </Container>
}
