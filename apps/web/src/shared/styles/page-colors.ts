import { Swatches } from './swatches'

export const PageColors = {
    /** page-level */
    background: {
        app: Swatches.wash.light[2],
        dashboard: Swatches.wash.light[1],
    },

    /** cards/panels/containers (including gradients) */
    surface: {
        card: Swatches.wash.light[1],
        cardExtra: '#ffffff52',
        cardHover: '#bdcce5',
        inverse: '#1e1e22',
        inverseStrong: '#2c2c47',
        inverseGradient:
            'linear-gradient(135deg, #202628 0%, #2c2c47 65%, #1c1c21 100%)',
        project: Swatches.wash.light[3],
        menu: {
            fill: Swatches.wash.light[1],
            item: '#e3ebf7',
            active: '#cbd8ec',
        },

        separator: Swatches.wash.light[5],
    },

    text: {
        primary: Swatches.wash.dark[6],
        secondary: Swatches.wash.dark[2],

        muted: Swatches.wash.dark[1],//'rgba(0, 0, 0, 0.60)',
        inverse: Swatches.wash.light[1],

        caption: 'rgba(0, 0, 0, 0.65)',
        error: 'rgb(180, 30, 30)',
        mono: 'rgba(0, 0, 0, 0.85)',

        mutedHover: 'rgba(0, 0, 0, 0.8)',
        captionHover: 'rgba(0, 0, 0, 0.85)',
        errorHover: 'rgb(150, 25, 25)',
        monoHover: Swatches.wash.dark[6],
    },

    focus: {
        ring: 'rgba(62, 132, 242, 0.55)',
    },

    action: {
        // brand / primary action (buttons, checkboxes, etc.)
        // primary: '#0b5ddf', // '#0090cf',
        // primaryHover: '#0a4cc1', // '#007bb8',
        // primaryActive: '#084bb0', //'#006aa1',
        primary: Swatches.primary[1],
        primaryHover: Swatches.primary[2],
        primaryActive: Swatches.primary[3],
        primaryDisabled: 'rgb(180, 180, 180)',
        primaryText: '#ffffff',

        // inverse action
        inverseText: '#ffffff',
        inverseBorder: '#ffffff',
        inverseHoverBg: '#e0e0e0',
        inverseHoverText: '#000000',
    },

    control: {
        // checkbox unchecked states
        unchecked: 'rgba(0, 0, 0, 0.10)',
        uncheckedHover: 'rgba(0, 0, 0, 0.18)',
        uncheckedInverse: 'rgba(255, 255, 255, 0.30)',
        uncheckedHoverInverse: 'rgba(255, 255, 255, 0.45)',

        // textbox / input fields
        fieldBg: 'rgba(0, 0, 0, 0.05)',
        fieldInvBg: 'rgba(255, 255, 255, 0.15)',
        fieldBgDisabled: 'rgba(0, 0, 0, 0.03)',
        fieldInvBgDisabled: 'rgba(255, 255, 255, 0.08)',
        fieldBgNone: 'transparent',
        fieldBorder: 'transparent',
        fieldInvBorder: 'rgba(255, 255, 255, 0.10)',
        fieldText: 'black',
        fieldInvText: 'white',
        fieldTextDisabled: 'rgba(0, 0, 0, 0.55)',
        fieldInvTextDisabled: 'rgba(255, 255, 255, 0.55)',
        fieldPlaceholder: 'rgba(0, 0, 0, 0.35)',
        fieldInvPlaceholder: 'rgba(255, 255, 255, 0.55)',

        tag: {
            draft:    { bg: '#ae4bdc', fg: '#ffffff' },
            active:   { bg: '#0086d5', fg: '#ffffff' },
            stopped:  { bg: '#e3417a', fg: '#ffffff' },
            archived: { bg: '#96b4bd', fg: '#ffffff' },
        },
        button: {
            option: {
                idle: Swatches.wash.transparent,
                // hover: '#ffffff52',//'#f0f5fc',
                // active: Swatches.wash.light[5],
                hover: '#e8f5ff5e',
                active: '#e1edf9',
            },
            account: {
                idle: Swatches.wash.transparent,
                hover: '#b8c0cc45',
                active: '#b8c0cc8f',
            },
            nav: {
                text: Swatches.wash.dark[1],
                idle: Swatches.wash.transparent,
                hover: '#b8c0cc45',
                active: '#b8c0cc8f',
            },
            navSelected: {
                text: Swatches.wash.light[1],
                idle: Swatches.wash.dark[2],
            }
        },
        textbox: {
            idle: {
                background: Swatches.wash.light[1],
                foreground: Swatches.wash.dark[6],
                placeholder: Swatches.wash.dark[1],
                border: Swatches.wash.transparent,
            },
            focus: {
                background: Swatches.wash.light[1],
                foreground: Swatches.wash.dark[6],
                placeholder: Swatches.wash.dark[2],
            },
        },

        eye: {
            shadowIdle: 'rgba(0, 0, 0, 0)',
            shadowHover: 'rgba(0, 0, 0, 0.06)',
            shadowActive: 'rgba(0, 0, 0, 0.1)',
            icon: 'rgba(0, 0, 0, 0.55)',
        },
    },
}
