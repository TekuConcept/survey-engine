import { useNavigate } from 'react-router-dom'
import { RoundedButton, Text } from '@shared/ui'
import { authTheme, RightMessage } from '@pages/auth/shared'
import { theme } from '@shared/styles/theme'
import { Paths } from '@routes/paths'

export function RightPane() {
    const navigate = useNavigate()

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
            Don't have an account yet?
        </Text>

        <RoundedButton onClick={() => navigate(Paths.createAccount)}>
            Sign Up
        </RoundedButton>
    </RightMessage>
}
