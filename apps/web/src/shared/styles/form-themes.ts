
const RichTechBoxTheme = {
    background: 'transparent',
    fontSize: '16pt',
    lineHeight: 1.5,
    minHeight: '1.5em',
}

/** richtextbox */
const rtb = {
    input: {
        /** title themed textbox */
        title: {
            ...RichTechBoxTheme,
            fontSize: '24pt',
            lineHeight: 1.25,
        },
        /** description themed textbox */
        desc: {
            ...RichTechBoxTheme,
            fontSize: '11pt',
        },
        /** question themed textbox */
        q: {
            ...RichTechBoxTheme,
            fontSize: '12pt',
            minHeight: 'inherit',
        },
    },
    sep: {
        background: {
            default: 'rgba(0, 0, 0, .3)',
            default2: 'rgba(0, 0, 0, .12)',
            focus: 'rgb(0, 125, 140)',
        }
    },
    button: {
        background: {
            default: 'rgba(0, 0, 0, 0)',
            hover: 'rgba(0, 0, 0, .03)',
            active: 'rgba(0, 0, 0, .13)',
        },
        color: {
            default: 'rgba(0, 0, 0, .54)',
            hover: 'rgba(0, 0, 0, .87)',
            active: 'rgba(0, 0, 0, .87)',
        },
    },
}

export const FormThemes = {
    rtb,
}

// margin: 6px 2px 0 2px;
// transition: background 0.3s ease;

// background: rgba(95, 99, 104, 0.04);
// color: rgba(0, 0, 0, .54); -> color: rgba(0, 0, 0, .87);
