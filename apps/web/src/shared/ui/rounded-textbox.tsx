import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { IconComponent } from '../vectors'

type ColorPair = {
    background?: string
    foreground?: string
    border?: string
    placeholder?: string
}

type TextboxColorStates = {
    idle?: ColorPair
    focus?: ColorPair
    disabled?: ColorPair
}

export type RoundedTextboxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'type'
> & {
    text?: string

    /**
     * Icon to display inside the textbox on the left side.
     */
    icon?: IconComponent
    iconSize?: number | string

    onTextChanged?: (value: string) => void

    /**
     * Optional color overrides. Uses sensible defaults if omitted.
     */
    colors?: TextboxColorStates

    /**
     * If true, renders an eye button to toggle masked/unmasked text.
     * Common for password-like inputs.
     */
    enableMaskToggle?: boolean

    /**
     * Initial masking state when enableMaskToggle is true.
     * Default: false (visible).
     */
    defaultMasked?: boolean

    /**
     * If true and enableMaskToggle is true, forces masking on (no unmask).
     * Useful for 'confirm password' fields if you want it always hidden.
     */
    forceMasked?: boolean

    /** Optional fixed width. */
    widthPx?: number
}

const DEFAULT_COLORS: Required<TextboxColorStates> = {
    idle: {
        background: theme.color.control.fieldBg,
        foreground: theme.color.text.primary,
        border: theme.color.control.fieldBorder,
        placeholder: theme.color.control.fieldPlaceholder,
    },
    focus: {
        background: theme.color.control.fieldBg,
        foreground: theme.color.text.primary,
        border: theme.color.focus.ring,
        placeholder: theme.color.control.fieldPlaceholder,
    },
    disabled: {
        background: theme.color.control.fieldBgDisabled,
        foreground: theme.color.control.fieldTextDisabled,
        border: theme.color.control.fieldBorder,
        placeholder: theme.color.control.fieldPlaceholder,
    },
}

function resolveColors(custom?: TextboxColorStates): Required<TextboxColorStates> {
    return {
        idle: { ...DEFAULT_COLORS.idle, ...(custom?.idle ?? {}) },
        focus: { ...DEFAULT_COLORS.focus, ...(custom?.focus ?? {}) },
        disabled: { ...DEFAULT_COLORS.disabled, ...(custom?.disabled ?? {}) },
    }
}

type StyledProps = {
    $c: Required<TextboxColorStates>
    $widthPx?: string | number
    $hasToggle?: boolean
    $hasIcon?: boolean
    $iconSize?: number | string
}

const Wrap = styled.div<Pick<StyledProps, '$widthPx'>>`
    width: ${({ $widthPx }) => $widthPx ? `${$widthPx}px` : '100%'};
`

const Field = styled.div<StyledProps>`
    position: relative;
    width: 100%;
`

const LeftIcon = styled.span<{ $iconSize: number | string }>`
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: ${({ $iconSize }) => typeof $iconSize === 'number' ? `${$iconSize}px` : $iconSize};
    height: ${({ $iconSize }) => typeof $iconSize === 'number' ? `${$iconSize}px` : $iconSize};

    pointer-events: none; /* clicks go to the input */
`

const Input = styled.input<StyledProps>`
    width: 100%;
    display: block;

    background-color: ${({ $c }) => $c.idle.background};
    border: 1px solid ${({ $c }) => $c.idle.border};
    border-radius: 50px;
    box-sizing: border-box;

    color: ${({ $c }) => $c.idle.foreground};
    cursor: text;

    font-family: ${({ theme }) => theme.font.family.base};
    font-size: ${({ theme }) => theme.font.size.nm};
    height: ${({ theme }) => theme.space[8]};
    line-height: ${({ theme }) => theme.space[5]};

    margin: 0px;

    overflow-x: clip;
    overflow-y: clip;

    padding: 6px 20px;
    padding-left: ${({ $hasIcon, $iconSize }) => ($hasIcon ? `calc(2.5 * ${$iconSize})` : '20px')};
    padding-right: ${({ $hasToggle }) => ($hasToggle ? '52px' : '20px')};

    text-align: start;

    transition: all 0.2s ease-in-out;

    &:focus { outline: none; }

    &:focus:not(:disabled) {
        background-color: ${({ $c }) => $c.focus.background};
        border-color: ${({ $c }) => $c.focus.border};
        color: ${({ $c }) => $c.focus.foreground};
    }

    &:disabled {
        background-color: ${({ $c }) => $c.disabled.background};
        border-color: ${({ $c }) => $c.disabled.border};
        color: ${({ $c }) => $c.disabled.foreground};
        cursor: not-allowed;
    }

    &::placeholder {
        color: ${({ $c }) => $c.idle.placeholder};
    }
`

const ToggleButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);

    height: 34px;
    width: 34px;
    border-radius: 999px;

    border: 1px solid ${({ theme }) => theme.color.control.eye.shadowIdle};
    background: ${({ theme }) => theme.color.control.eye.shadowIdle};
    cursor: pointer;

    display: grid;
    place-items: center;

    transition: background-color 0.2s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.color.control.eye.shadowHover};
    }

    &:active {
        background: ${({ theme }) => theme.color.control.eye.shadowActive};
    }

    &:focus-visible {
        outline: 2px solid rgba(62, 132, 242, 0.35);
        outline-offset: 2px;
    }
`

const EyeIcon = styled.span<StyledProps>`
    display: inline-block;
    width: 18px;
    height: 18px;

    /* Simple eye icon using CSS (no dependencies) */
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 3px 1px;
        border: 2px solid ${({ $c }) => $c.idle.placeholder};
        border-radius: 999px;
    }

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 6px;
        height: 6px;
        transform: translate(-50%, -50%);
        background: ${({ $c }) => $c.idle.placeholder};
        border-radius: 999px;
    }
`

const Slash = styled.span<StyledProps>`
    position: absolute;
    width: 22px;
    height: 2px;
    background: ${({ $c }) => $c.idle.placeholder};
    transform: rotate(-25deg);
    border-radius: 999px;
`

export function RoundedTextbox({
    text,
    icon: Icon,
    iconSize = theme.font.size.lg,
    onTextChanged,
    colors,
    enableMaskToggle = false,
    defaultMasked = false,
    forceMasked = false,
    widthPx,
    disabled,
    placeholder,
    autoComplete,
    inputMode,
    name,
    id,
    'aria-label': ariaLabel,
    ...rest
}: RoundedTextboxProps) {
    const merged = React.useMemo(() => resolveColors(colors), [colors])

    const [masked, setMasked] = React.useState<boolean>(
        enableMaskToggle ? defaultMasked : false
    )

    const effectiveMasked = enableMaskToggle
        ? (forceMasked ? true : masked) : false
    const inputType = effectiveMasked ? 'password' : 'text'

    const toggleMask = () => {
        if (!enableMaskToggle || forceMasked || disabled) return
        setMasked((v) => !v)
    }

    const { width, ...restStyle } = rest.style || {}
    rest.style = restStyle
    const useWidthPx = width ?? widthPx ?? 0
    const onChanged = onTextChanged ?? (() => {})

    const hasIcon = !!Icon

    return <Wrap $widthPx={useWidthPx}>
        <Field
            $c={merged}
            $widthPx={useWidthPx}
            $hasToggle={enableMaskToggle}
            $hasIcon={hasIcon}
        >
            {Icon ? (
                <LeftIcon aria-hidden='true' $iconSize={iconSize}>
                    <Icon
                        width={iconSize}
                        height={iconSize}
                        color={merged.idle.placeholder}
                    />
                </LeftIcon>
            ) : null}

            <Input
                {...rest}
                id={id}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                aria-label={ariaLabel ?? placeholder ?? 'Text input'}
                type={inputType}
                value={text}
                onChange={(e) => onChanged(e.target.value)}
                $c={merged}
                $widthPx={useWidthPx}
                $hasToggle={enableMaskToggle}
                $hasIcon={hasIcon}
                $iconSize={iconSize}
            />
            {enableMaskToggle && (
                <ToggleButton
                    type='button'
                    onClick={toggleMask}
                    aria-label={effectiveMasked ? 'Show text' : 'Hide text'}
                    title={effectiveMasked ? 'Show text' : 'Hide text'}
                    disabled={disabled || forceMasked}
                >
                    <EyeIcon $c={merged} />
                    {!effectiveMasked && <Slash $c={merged} />}
                </ToggleButton>
            )}
        </Field>
    </Wrap>
}
