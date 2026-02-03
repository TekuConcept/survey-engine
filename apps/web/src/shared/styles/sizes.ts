const px = (n: number) => `${n}px`

export const themeSizes = {
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
}