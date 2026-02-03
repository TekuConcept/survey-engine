import { FormThemes } from './form-themes'
import { PageColors } from './page-colors'
import { themeSizes } from './sizes'

const px = (n: number) => `${n}px`
const rem = (n: number) => `${n}rem`

export const theme = {
    meta: {
        name: 'default',
    },

    ...themeSizes,

    font: {
        family: {
            base: "Lato, Roboto, Arial, sans-serif",
            mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            forms: "'docs-Roboto', Roboto, Lato, Arial, sans-serif",
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
    color: PageColors,

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

    forms: FormThemes,
}

export type Theme = typeof theme
