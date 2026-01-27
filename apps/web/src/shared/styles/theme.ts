const px = (n: number) => `${n}px`
const rem = (n: number) => `${n}rem`

const Swatches = {
    primary: {
        1: '#f227a2',
        2: '#d01e8c',
        3: '#b01773',
    },
    secondary: {
        1: '#0086d5',
        2: '#006bb8',
        3: '#005a9e',
    },
    wash: {
        transparent: 'transparent',
        light: {
            1: '#ffffff',
            2: '#f8fbfd',
            3: '#f0f4fa',
            4: '#e8eef8',
            5: '#c9d0d7',
        },
        dark: {
            1: '#334c66',
            2: '#1e243e',
            3: '#2c2c47',
            4: '#202628',
            5: '#1c1c21',
            6: '#000000',
        },
    },
}

export const theme = {
    meta: {
        name: 'default',
    },

    // Breakpoints (use consistently in media queries)
    bp: {
        xs: px(480),
        sm: px(575),
        md: px(765),
        lg: px(990),
        xl: px(1200),
    },

    // Layout + rhythm
    space: {
        0: px(0),
        1: px(4),
        2: px(8),
        3: px(12),
        4: px(16),
        5: px(24),
        6: px(32),
        7: px(40),
        8: px(48),
        9: px(64),
    },

    radius: {
        square: px(0),
        xs: px(5),
        sm: px(10),
        md: px(14),
        lg: px(16),
        xl: px(20),
        pill: px(999),
    },

    font: {
        family: {
            base: "Lato, Roboto, Arial, sans-serif",
            mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        },
        size: {
            /** 12px */
            xs: rem(0.75),
            /** 14px */
            sm: rem(0.875),
            /** 16px */
            nm: rem(1),
            /** 20px */
            lg: rem(1.25),
            /** 24px */
            xl: rem(1.5),

            /** 40px */
            h1: rem(2.5),
            /** 32px */
            h2: rem(2),
            /** 28px */
            h3: rem(1.75),
            /** 24px */
            h4: rem(1.5),
            /** 20px */
            h5: rem(1.25),
            /** 16px */
            h6: rem(1),
        },
        weight: {
            /** 100 */
            thin: 100,
            /** 200 */
            extralight: 200,
            /** 300 */
            light: 300,
            /** 400 */
            normal: 400,
            /** 500 */
            medium: 500,
            /** 600 */
            semibold: 600,
            /** 700 */
            bold: 700,
            /** 800 */
            extrabold: 800,
            /** 900 */
            black: 900,
        },
    },

    /** -- system feedback and polish -- */

    border: {
        width: {
            hairline: px(1),
            strong: px(2),
        },
        color: {
            subtle: 'rgba(0, 0, 0, 0.10)',
            hover: 'rgba(0, 0, 0, 0.18)',
        },
    },

    shadow: {
        card: '0 18px 50px rgba(16, 24, 40, 0.12)',
        pop: '0 10px 30px rgba(16, 24, 40, 0.16)',
        menuitem: '0px 2px 8px #43537a40',
    },

    /** Core semantic color roles */
    color: {
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
    },

    /** Component-friendly defaults (optional but very handy) */
    component: {
        button: {
            height: px(44),
            paddingX: px(16),
            radius: px(48),
        },
        input: {
            height: px(48),
            paddingX: px(6),
            radius: px(50),
        },
        card: {
            radius: px(10),
        },
        tag: {
            radius: px(5),
        }
    },
}

export type Theme = typeof theme
