import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { theme } from '@shared/styles/theme'

export function ThemeProvider(
    { children }: { children: React.ReactNode }
) {
    return <SCThemeProvider theme={theme}>
        {children}
    </SCThemeProvider>
}
