import React from 'react'
import styled from 'styled-components'
import { Label, type LabelProps } from './label'
import {
    RoundedTextbox,
    type RoundedTextboxProps
} from './rounded-textbox'

export type LabeledRoundedTextboxProps = {
    /**
     * Layout + wrapper control
     */
    widthPx?: number
    gapPx?: number // default: 8
    className?: string
    style?: React.CSSProperties

    /**
     * Child customization
     * - You can pass either full props objects
     * - Or simpler shortcuts via labelText / textboxProps
     */
    labelProps?: Omit<LabelProps, 'htmlFor'> & {
        /**
         * If true, hides the label visually but keeps it for screen readers.
         * Useful if the design needs no visible label but you still want accessibility.
         */
        srOnly?: boolean
    }

    textboxProps?: RoundedTextboxProps

    /**
     * If provided, overrides htmlFor wiring.
     * Otherwise, will auto-wire based on textboxProps.id (recommended).
     */
    htmlFor?: string
}

export function LabeledRoundedTextbox({
    widthPx,
    gapPx = 0,
    className,
    style,
    labelProps,
    textboxProps,
    htmlFor,
}: LabeledRoundedTextboxProps) {
    const computedWidthPx = widthPx ?? textboxProps?.widthPx ?? 0

    const inputId = textboxProps?.id
    const resolvedHtmlFor = htmlFor ?? inputId

    return <Wrap
        className={className}
        style={style}
        $widthPx={computedWidthPx}
        $gapPx={gapPx}
    >
        {labelProps?.srOnly ? (
            <SrOnly as='label' htmlFor={resolvedHtmlFor}>
                {labelProps.text}
            </SrOnly>
        ) : (
            <Label
                {...labelProps}
                htmlFor={resolvedHtmlFor}
            />
        )}

        <RoundedTextbox
            {...textboxProps}
            widthPx={computedWidthPx}
            aria-label={
                textboxProps?.['aria-label'] ??
                textboxProps?.placeholder ??
                labelProps?.text
            }
        />
    </Wrap>
}

/* ---------- styles ---------- */

const Wrap = styled.div<{ $widthPx: number; $gapPx: number }>`
    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.nm};

    width: ${({ $widthPx }) => $widthPx ? `${$widthPx}px` : '100%'};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ $gapPx }) => `${$gapPx}px`};
`

const SrOnly = styled.span`
    /* Classic screen-reader-only utility */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`
