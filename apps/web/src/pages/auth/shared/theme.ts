import { theme } from '@shared/styles/theme'

export const authTheme = {
    colors: {
        logo: {
            width: '120%',
            maxWidth: '350px',
            marginBottom: theme.space[4],
        },
        textbox: {
            idle: {
                background: theme.color.control.fieldInvBg,
                foreground: theme.color.text.inverse,
                border: theme.color.control.fieldInvBorder,
                placeholder: theme.color.control.fieldInvPlaceholder,
            },
            focus: {
                background: theme.color.control.fieldInvBg,
                foreground: theme.color.text.inverse,
                border: theme.color.focus.ring,
                placeholder: theme.color.control.fieldInvPlaceholder,
            },
            disabled: {
                background: theme.color.control.fieldInvBgDisabled,
                foreground: theme.color.control.fieldInvTextDisabled,
                border: theme.color.control.fieldInvBorder,
                placeholder: theme.color.control.fieldInvPlaceholder,
            },
        },
        button: {
            idle: {
                background: theme.color.text.inverse,
                foreground: theme.color.text.primary,
                border: theme.color.action.inverseBorder,
            },
            hover: {
                background: theme.color.action.primary,
                foreground: theme.color.text.inverse,
                border: theme.color.action.primary,
            },
            active: {
                background: theme.color.action.inverseHoverBg,
                foreground: theme.color.text.primary,
                border: theme.color.action.inverseBorder,
            },
        },
        checkbox: {
            checked: {
                primary: theme.color.action.primary,
                secondary: theme.color.text.inverse,
            },
            hoverChecked: {
                primary: theme.color.action.primary,
                secondary: theme.color.text.inverse,
            },
            unchecked: theme.color.control.uncheckedInverse,
            hoverUnchecked: theme.color.control.uncheckedHoverInverse,
        }
    }
}