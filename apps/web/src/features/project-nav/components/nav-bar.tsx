import * as React from 'react'
import styled from 'styled-components'
import { IconComponent } from '@shared/vectors'
import { NavButton } from './nav-button'

export type NavOption = {
    icon?: IconComponent
    label: string
    onClick?: () => void
    key?: React.Key
}

type NavBarOptionsProps = {
    options: NavOption[]
    currentIndex: number
    onSelect?: (option: NavOption, index: number) => void

    className?: string
    style?: React.CSSProperties
}

type NavBarCompositionProps = {
    children: React.ReactNode

    className?: string
    style?: React.CSSProperties
}

export type NavBarProps =
    | NavBarOptionsProps
    | NavBarCompositionProps

export function NavBar(props: NavBarProps) {
    // Variant A: composition
    if ('children' in props) {
        return <NavBarRoot className={props.className} style={props.style}>
            {props.children}
        </NavBarRoot>
    }

    // Variant B: options array
    const { options, currentIndex, onSelect, className, style } = props

    return <NavBarRoot className={className} style={style}>
        {options.map((opt, i) => (
            <NavButton
                key={opt.key ?? `${opt.label}-${i}`}
                icon={opt.icon}
                current={i === currentIndex}
                onClick={() => {
                    opt.onClick?.()
                    onSelect?.(opt, i)
                }}
            >
                {opt.label}
            </NavButton>
        ))}
    </NavBarRoot>
}

const NavBarRoot = styled.nav`
    display: flex;
    flex-direction: column;
    width: 100%;
`
