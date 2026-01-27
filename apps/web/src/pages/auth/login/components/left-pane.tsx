import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Heading,
    LabeledCheckbox,
    LabeledRoundedTextbox,
    RoundedButton,
    useToast,
} from '@shared/ui'
import { theme } from '@shared/styles/theme'
import {
    SigninWrap,
    LoginBannerContainer,
    LoginFormContainer,
    SigninOptions,
    authTheme,
} from '@pages/auth/shared'
import { ReduxPie, useAppDispatch } from '@app/store'
import { Paths } from '@routes/paths'

export function LeftPane() {
    return <>
        <LoginBanner />
        <LoginForm />
    </>
}

function LoginBanner() {
    return <LoginBannerContainer>
        <Heading
            color={theme.color.text.inverse}
            level={3} align='left'
        >
            Sign In
        </Heading>
    </LoginBannerContainer>
}

function LoginForm() {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { push } = useToast()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(true)

    const from = (location.state as any)?.from?.pathname ?? Paths.dashboard

    const onSignIn = async () => {
        if (!username.trim() || !password) {
            push({
                level: 'error',
                message: 'Enter your username and password',
                durationMs: 3000,
            })
            return
        }

        const res = await dispatch(
            ReduxPie.auth.loginUser({ username: username.trim(), password })
        )

        if (ReduxPie.auth.loginUser.fulfilled.match(res)) {
            push({
                level: 'success',
                message: 'Signed in',
                durationMs: 2000,
            })

            // If "remember me" affects auth, it must be handled server-side
            // (cookie max-age, refresh token issuance, etc.). For now it’s UI-only.

            navigate(from)
            return
        }

        push({
            level: 'error',
            message:
                (res.payload as string) ??
                res.error?.message ??
                'Unable to sign in',
            durationMs: 4000,
        })
    }

    return <LoginFormContainer>
        <UsernameTextbox text={username} onTextChanged={setUsername} />
        <PasswordTextbox text={password} onTextChanged={setPassword} />
        <SigninButton onClick={onSignIn} />
        <RememberMeCheckbox checked={rememberMe} onCheckChange={setRememberMe} />
    </LoginFormContainer>
}

function UsernameTextbox({ text, onTextChanged }: {
    text?: string
    onTextChanged?: (value: string) => void
}) {
    return <LabeledRoundedTextbox
        labelProps={{
            text: 'Username',
            color: theme.color.text.inverse,
        }}
        textboxProps={{
            placeholder: 'Username or Email',
            colors: authTheme.colors.textbox,
            text,
            onTextChanged,
        }}
        style={{ marginBottom: 20 }}
    />
}

function PasswordTextbox({ text, onTextChanged }: {
    text?: string
    onTextChanged?: (value: string) => void
}) {
    return <LabeledRoundedTextbox
        labelProps={{
            text: 'Password',
            color: theme.color.text.inverse,
        }}
        textboxProps={{
            placeholder: 'Password',
            enableMaskToggle: true,
            defaultMasked: true,
            colors: authTheme.colors.textbox,
            text,
            onTextChanged,
        }}
        style={{ marginBottom: 20 }}
    />
}

function SigninButton({ onClick }: { onClick?: () => void }) {
    return <SigninWrap>
        <RoundedButton
            style={{ width: '100%' }}
            colors={authTheme.colors.button}
            onClick={onClick}
        >
            Sign In
        </RoundedButton>
    </SigninWrap>
}

function RememberMeCheckbox({ checked, onCheckChange }: {
    checked?: boolean
    onCheckChange?: (checked: boolean) => void
}) {
    return <SigninOptions>
        <LabeledCheckbox
            textColor={theme.color.action.inverseText}
            checkboxColors={authTheme.colors.checkbox}
            checked={checked}
            onCheckChange={onCheckChange}
        >
            Remember Me
        </LabeledCheckbox>
    </SigninOptions>
}
