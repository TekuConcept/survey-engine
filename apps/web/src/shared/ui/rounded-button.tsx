import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { IconComponent } from '../vectors'

type ColorPair = {
    background?: string
    foreground?: string
    border?: string
}

type ButtonColorStates = {
    idle?: ColorPair
    hover?: ColorPair
    active?: ColorPair // 'click' state (mouse down / key down)
    disabled?: ColorPair
}

export type RoundedButtonProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'children'
> & {
    colors?: ButtonColorStates
    icon?: IconComponent
    iconSize?: number | string
    /** Children = Butten content */
    children?: React.ReactNode
}

const DEFAULT_COLORS: Required<ButtonColorStates> = {
    idle: {
        background: theme.color.action.primary,
        foreground: theme.color.action.primaryText,
        border: theme.color.control.fieldBorder,
    },
    hover: {
        background: theme.color.action.primaryHover,
        foreground: theme.color.action.primaryText,
        border: theme.color.control.fieldBorder,
    },
    active: {
        background: theme.color.action.primaryActive,
        foreground: theme.color.action.primaryText,
        border: theme.color.control.fieldBorder,
    },
    disabled: {
        background: theme.color.action.primaryDisabled,
        foreground: theme.color.action.primaryText,
        border: theme.color.control.fieldBorder,
    },
}

function resolveColors(custom?: ButtonColorStates): Required<ButtonColorStates> {
    return {
        idle: { ...DEFAULT_COLORS.idle, ...(custom?.idle ?? {}) },
        hover: { ...DEFAULT_COLORS.hover, ...(custom?.hover ?? {}) },
        active: { ...DEFAULT_COLORS.active, ...(custom?.active ?? {}) },
        disabled: { ...DEFAULT_COLORS.disabled, ...(custom?.disabled ?? {}) },
    }
}

type StyledProps = { $c: Required<ButtonColorStates> }

const StyledButton = styled.button<StyledProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    cursor: pointer;
    height: ${({ theme }) => theme.space[8]};
    margin: 0px;
    padding: 10px 16px;

    color: ${({ $c }) => $c.idle.foreground};
    background-color: ${({ $c }) => $c.idle.background};

    border: 1px solid ${({ $c }) => $c.idle.border};
    border-radius: 50px;
    box-sizing: border-box;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.nm};
    line-height: 22.5px;
    text-align: center;

    transition: background-color 0.2s, color 0.2s, transform 0.05s;

    &:hover:not(:disabled) {
        background-color: ${({ $c }) => $c.hover.background};
        color: ${({ $c }) => $c.hover.foreground};
        border-color: ${({ $c }) => $c.hover.border};
    }

    &:active:not(:disabled) {
        background-color: ${({ $c }) => $c.active.background};
        color: ${({ $c }) => $c.active.foreground};
        border-color: ${({ $c }) => $c.active.border};
    }

    &:disabled {
        background-color: ${({ $c }) => $c.disabled.background};
        color: ${({ $c }) => $c.disabled.foreground};
        border-color: ${({ $c }) => $c.disabled.border};
        cursor: not-allowed;
        opacity: 0.9;
    }

    /* Optional: nicer keyboard focus without changing layout */
    &:focus-visible {
        outline: 2px solid rgba(62, 132, 242, 0.35);
        outline-offset: 2px;
    }
`

const IconWrap = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
`

export function RoundedButton({
    children,
    colors,
    icon: Icon,
    iconSize = theme.font.size.nm,
    onClick,
    type = 'button',
    ...rest
}: RoundedButtonProps) {
    const merged = React.useMemo(() => resolveColors(colors), [colors])

    return <StyledButton
        type={type}
        $c={merged}
        onClick={onClick}
        {...rest}
    >
        {Icon ? (
            <IconWrap aria-hidden="true">
                <Icon
                    width={iconSize}
                    height={iconSize}
                    color={merged.idle.foreground}
                />
            </IconWrap>
        ) : null}

        {children}
    </StyledButton>
}
