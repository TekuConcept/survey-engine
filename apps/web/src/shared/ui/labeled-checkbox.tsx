import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

type ColorPair = {
    primary: string
    secondary: string
}

type CheckboxColors = {
    /** Checkbox icon color (unchecked + checked can be different) */
    checked?: string | ColorPair
    unchecked?: string | ColorPair

    /** Optional hover color tweaks (purely visual) */
    hoverChecked?: string | ColorPair
    hoverUnchecked?: string | ColorPair
}

export type LabeledCheckboxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'checked' | 'onChange' | 'children'
> & {
    children?: React.ReactNode
    checked?: boolean
    onCheckChange?: (checked: boolean) => void

    /** Label text color */
    textColor?: string

    /** FontAwesome glyph colors for the checkbox icon */
    checkboxColors?: CheckboxColors

    /** Control icon size & spacing */
    iconPx?: number // default 20
    gapPx?: number // default 10

    /**
     * FontAwesome font-family name. Depends on the FA package you loaded.
     * Template used 'FontAwesome' (often FA4).
     */
    faFontFamily?: string

    /**
     * Character codes (FontAwesome WebFont)
     * Defaults match your template.
     */
    faCheckedCode?: string   // default: \f14a (check-square)
    faUncheckedCode?: string // default: \f0c8 (square outline)
}

const DEFAULTS = {
    textColor: theme.color.text.primary,
    checkboxColors: {
        checked: theme.color.action.primary,
        unchecked: theme.color.control.unchecked,
        hoverChecked: theme.color.action.primary,
        hoverUnchecked: theme.color.control.uncheckedHover,
    } satisfies Required<CheckboxColors>,
    iconPx: 0,
    gapPx: 10,
    faFontFamily: 'FontAwesome',
    faCheckedCode: '\\f14a',
    faUncheckedCode: '\\f0c8',
}

function resolveCheckboxColors(
    custom?: CheckboxColors
): Required<CheckboxColors> {
    const resolveFor = (
        value: string | ColorPair | undefined,
        fallback: string | ColorPair
    ): string | ColorPair => {
        if (!value) return fallback
        if (typeof value === 'string') return value
        if (!value.primary) return value.secondary ?? fallback
        if (!value.secondary) return value.primary
        return { primary: value.primary, secondary: value.secondary }
    }

    return {
        checked: resolveFor(custom?.checked, DEFAULTS.checkboxColors.checked),
        unchecked: resolveFor(custom?.unchecked, DEFAULTS.checkboxColors.unchecked),
        hoverChecked: resolveFor(custom?.hoverChecked, DEFAULTS.checkboxColors.hoverChecked),
        hoverUnchecked: resolveFor(custom?.hoverUnchecked, DEFAULTS.checkboxColors.hoverUnchecked),
    }
}

type StyledProps = {
    $textColor: string
    $iconPx: number
    $gapPx: number
    $colors: Required<CheckboxColors>
    $faFamily: string
    $checkedCode: string
    $uncheckedCode: string
    $disabled: boolean
}

export function LabeledCheckbox({
    children,
    checked,
    onCheckChange,
    textColor = DEFAULTS.textColor,
    checkboxColors,
    iconPx = DEFAULTS.iconPx,
    gapPx = DEFAULTS.gapPx,
    faFontFamily = DEFAULTS.faFontFamily,
    faCheckedCode = DEFAULTS.faCheckedCode,
    faUncheckedCode = DEFAULTS.faUncheckedCode,
    disabled,
    id,
    name,
    className,
    style,
    ...rest
}: LabeledCheckboxProps) {
    const colors = React.useMemo(
        () => resolveCheckboxColors(checkboxColors),
        [checkboxColors]
    )

    const inputId = id ?? name ?? React.useId()

    const handleToggle = (check: boolean) => {
        if (disabled) return
        onCheckChange?.(check)
    }

    return <Wrap
        className={className}
        style={style}
        htmlFor={inputId}
        $textColor={textColor}
        $iconPx={iconPx}
        $gapPx={gapPx}
        $colors={colors}
        $faFamily={faFontFamily}
        $checkedCode={faCheckedCode}
        $uncheckedCode={faUncheckedCode}
        $disabled={!!disabled}
    >
        <HiddenInput
            {...rest}
            id={inputId}
            name={name}
            type='checkbox'
            checked={checked}
            disabled={disabled}
            onChange={(e) => handleToggle(e.target.checked)}
        />

        <Box
            $iconPx={iconPx}
            $faFamily={faFontFamily}
            $uncheckedCode={faUncheckedCode}
            $checkedCode={faCheckedCode}
            $colors={colors}
            aria-hidden='true'
        />

        <Text>{children}</Text>
    </Wrap>
}

/* ---------- styles ---------- */

const Wrap = styled.label<StyledProps>`
    /* Transparent background by default */
    background: transparent;

    display: inline-flex;
    align-items: center;
    justify-content: flex-start;

    gap: ${({ $gapPx }) => `${$gapPx}px`};

    box-sizing: border-box;
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
    user-select: none;

    /* Match the “template-ish” feel but keep it tame */
    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.nm};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 1.2;

    color: ${({ $textColor }) => $textColor};
`

const HiddenInput = styled.input`
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 1px;
    height: 1px;
    margin: 0;
    padding: 0;
`

const Box = styled.span<Partial<StyledProps>>`
    position: relative;
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;

    box-sizing: border-box;
    background: ${({ $colors }) => {
        if (typeof $colors!.unchecked === 'object') {
            return $colors!.unchecked.secondary
        } else return 'inherit'
    }};

    &::after {
        display: block;
        position: absolute;
        left: -0.125rem;
        top: -0.125rem;

        font-family: ${({ $faFamily }) => $faFamily};
        font-size: 1.45rem;
        line-height: 1.3rem;

        content: '${({ $uncheckedCode }) => $uncheckedCode}';
        color: ${({ $colors }) => {
            if (typeof $colors!.unchecked === 'object') {
                return $colors!.unchecked.primary
            } else return $colors!.unchecked
        }};

        transition: all 0.3s ease;
        user-select: none;
        box-sizing: border-box;
    }

    /* Checked state driven by the hidden input */
    ${HiddenInput}:checked + &::after {
        content: '${({ $checkedCode }) => $checkedCode}';
        color: ${({ $colors }) => {
            if (typeof $colors!.checked === 'object') {
                return $colors!.checked.primary
            } else return $colors!.checked
        }};
    }

    ${HiddenInput}:checked + & {
        background: ${() => {
            return 'white'
            // if (typeof $colors!.checked === 'object') {
            //     return $colors!.checked.secondary
            // } else return 'inherit'
        }};
    }

    /* Hover (optional polish) */
    ${Wrap}:hover ${HiddenInput}:not(:disabled) + &::after {
        color: ${({ $colors }) => {
            if (typeof $colors!.hoverUnchecked === 'object') {
                return $colors!.hoverUnchecked.primary
            } else return $colors!.hoverUnchecked
        }};
    }

    ${Wrap}:hover ${HiddenInput}:not(:disabled) + & {
        background: ${({ $colors }) => {
            if (typeof $colors!.hoverUnchecked === 'object') {
                return $colors!.hoverUnchecked.secondary
            } else return 'inherit'
        }};
    }

    ${Wrap}:hover ${HiddenInput}:checked:not(:disabled) + &::after {
        color: ${({ $colors }) => {
            if (typeof $colors!.hoverChecked === 'object') {
                return $colors!.hoverChecked.primary
            } else return $colors!.hoverChecked
        }};
    }

    ${Wrap}:hover ${HiddenInput}:checked:not(:disabled) + & {
        background: ${({ $colors }) => {
            if (typeof $colors!.hoverChecked === 'object') {
                return $colors!.hoverChecked.secondary
            } else return 'inherit'
        }};
    }

    /* Keyboard focus ring */
    ${HiddenInput}:focus-visible + & {
        outline: 2px solid rgba(0, 144, 207, 0.25);
        outline-offset: 3px;
        border-radius: 6px;
    }

    /* Disabled */
    ${HiddenInput}:disabled + &::after {
        opacity: 0.55;
    }
`

const Text = styled.span`
    background: transparent;
    box-sizing: border-box;
`
