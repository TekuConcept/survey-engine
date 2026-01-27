import { theme } from '@shared/styles/theme'
import { RoundedButton, Text } from '@shared/ui'
import { authTheme, RightMessage } from '@pages/auth/shared'

export function RightPane() {
    return <RightMessage>
        <img
            src='/img/selogo.svg'
            alt='Survey Engine Logo'
            style={authTheme.colors.logo}
        />

        <Text
            color={theme.color.text.primary}
            block
            align='center'
            weight={theme.font.weight.semibold}
            marginBottom={theme.space[4]}
        >
            Build and launch campaigns with a clean, powerful survey workflow.
        </Text>

        <RoundedButton>
            Learn More
        </RoundedButton>
    </RightMessage>
}
