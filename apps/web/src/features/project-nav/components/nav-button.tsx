import * as React from 'react'
import styled from 'styled-components'
import { IconComponent } from '@shared/vectors'
import { theme } from '@/shared/styles/theme'

export type NavButtonProps = {
    icon?: IconComponent
    current?: boolean
    onClick?: () => void

    children: React.ReactNode

    className?: string
    style?: React.CSSProperties
}

export function NavButton({
    icon: Icon,
    current = false,
    onClick,
    children,
    className,
    style,
}: NavButtonProps) {
    const fg = current
        ? theme.color.control.button.navSelected.text
        : theme.color.control.button.nav.text
    const clickable = !!onClick && !current

    return <NavButtonRoot
        type='button'
        className={className}
        style={style}
        $current={current}
        disabled={!clickable}
        onClick={clickable ? onClick : undefined}
        aria-current={current ? 'page' : undefined}
    >
        {Icon ? (
            <IconWrap aria-hidden='true'>
                <Icon height={'auto'} color={fg} />
            </IconWrap>
        ) : null}

        <Label title={typeof children === 'string' ? children : undefined}>
            {children}
        </Label>
    </NavButtonRoot>
}

const NavButtonRoot = styled.button<{ $current: boolean }>`
    width: 100%;
    min-width: 0;
    height: ${({ theme }) => theme.space[6]};

    display: flex;
    align-items: center;
    gap: 10px;

    border: 0;
    border-radius: ${({ theme }) => theme.component.button.radius};
    padding: 0 12px;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.sm};
    font-weight: ${({ $current, theme }) => $current
        ? theme.font.weight.medium
        : theme.font.weight.normal
    };
    text-align: left;

    cursor: ${({ $current }) => ($current ? 'default' : 'pointer')};

    background: ${({ $current, theme }) => $current
        ? theme.color.control.button.navSelected.idle
        : theme.color.control.button.nav.idle
    };
    color: ${({ $current }) => $current
        ? theme.color.control.button.navSelected.text
        : theme.color.control.button.nav.text
    };

    &:hover {
        background: ${({ $current, theme }) => $current
            ? theme.color.control.button.navSelected.idle
            : theme.color.control.button.nav.hover
        };
        color: ${({ $current, theme }) => $current
            ? theme.color.control.button.navSelected.text
            : theme.color.control.button.nav.text
        };
    }

    &:active {
        background: ${({ $current, theme }) => $current
            ? theme.color.control.button.navSelected.idle
            : theme.color.control.button.nav.active
        };
        color: ${({ $current, theme }) => $current
            ? theme.color.control.button.navSelected.text
            : theme.color.control.button.nav.text
        };
    }

    &:disabled {
        /* disabled is used only for 'current' / non-clickable items here */
        opacity: 1;
    }

    &:focus-visible {
        outline: 2px solid rgba(51, 76, 102, 0.55);
        outline-offset: 2px;
    }
`

const IconWrap = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    height: ${({ theme }) => theme.font.size.sm};
`

const Label = styled.span`
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    letter-spacing: 0.1px;
`
