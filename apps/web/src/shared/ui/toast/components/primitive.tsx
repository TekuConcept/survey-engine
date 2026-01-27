import styled, { keyframes, css } from 'styled-components'
import { ToastLevel } from './types'
import { levelColor } from './utils'

const slideIn = keyframes`
    from { transform: translateY(-6px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
`

export const ToastViewport = styled.div<{ $placement: string }>`
    position: fixed;
    z-index: 9999;

    display: flex;
    flex-direction: column;
    gap: 10px;

    width: min(420px, calc(100vw - 32px));
    padding: 16px;

    ${({ $placement }) => {
        switch ($placement) {
        case 'top-center':
            return css`
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                align-items: stretch;
            `
        case 'bottom-right':
            return css`
                bottom: 0;
                right: 0;
                align-items: flex-end;
            `
        case 'bottom-center':
            return css`
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                align-items: stretch;
            `
        case 'top-right':
        default:
            return css`
                top: 0;
                right: 0;
                align-items: flex-end;
            `
        }
    }}
`

export const ToastCard = styled.div<{ $level: ToastLevel }>`
    position: relative;

    display: flex;
    align-items: flex-start;
    gap: 12px;

    width: 100%;
    border-radius: ${({ theme }) => theme.radius.xs};
    background: ${({ $level }) => levelColor($level)};
    color: ${({ theme }) => theme.color.text.inverse};

    padding: 12px 12px 12px 10px;

    animation: ${slideIn} 120ms ease;
    overflow: hidden;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.nm};
`

export const LeftAccent = styled.div<{ $level: ToastLevel }>`
    flex: 0 0 6px;
    align-self: stretch;
    border-radius: 10px;
`

export const ToastBody = styled.div`
    flex: 1 1 auto;
    min-width: 0;

    display: flex;
    flex-direction: column;
    gap: 4px;

    padding-top: 1px;
`

export const ToastTitle = styled.div`
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ToastMessage = styled.div`
    opacity: 0.92;
    line-height: 1.3;

    /* Allow long tokens/URLs to wrap instead of blowing up layout */
    overflow-wrap: anywhere;
`

export const CloseButton = styled.button`
    flex: 0 0 auto;

    width: 28px;
    height: 28px;

    border: 0;
    border-radius: 999px;
    background: transparent;
    color: ${({ theme }) => theme.color.text.inverse};

    cursor: pointer;
    font-size: 20px;
    line-height: 28px;

    &:hover {
        opacity: 1;
        background: rgba(255,255,255, 0.2);
    }
`
