import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Heading,
    LabeledRoundedTextbox,
    RoundedButton,
    Text,
    TextLink,
    useToast,
} from '@shared/ui'
import {
    SigninWrap,
    LoginBannerContainer,
    LoginFormContainer,
    SigninOptions,
    authTheme,
} from '@pages/auth/shared'
import { theme } from '@shared/styles/theme'
import { Paths } from '@routes/paths'
import { ReduxPie, useAppDispatch } from '@app/store'

export function LeftPane() {
    return <>
        <CreateAccountBanner />
        <CreateAccountForm />
    </>
}

function CreateAccountBanner() {
    return <LoginBannerContainer>
        <Heading
            color={theme.color.text.inverse}
            level={3} align='left'
        >
            Create Account
        </Heading>
        <Text
            color={theme.color.text.inverse}
            block align='left'
            marginBottom={theme.space[2]}
            weight={theme.font.weight.light}
        >
            Set up an account to start building!
        </Text>
    </LoginBannerContainer>
}

function CreateAccountForm() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { push } = useToast()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        // Basic client-side guardrails (optional)
        if (!username.trim() || !email.trim() || !password) {
            push({
                level: 'error',
                message: 'Please fill out all fields',
                durationMs: 3000,
            })
            return
        }

        const result = await dispatch(
            ReduxPie.auth.registerAccount({
                username: username.trim(),
                email: email.trim(),
                password,
            })
        )

        if (ReduxPie.auth.registerAccount.fulfilled.match(result)) {
            push({
                level: 'success',
                message: 'Account created',
                durationMs: 2500,
            })

            navigate(Paths.dashboard)
            return
        }

        push({
            level: 'error',
            message:
                (result.payload as string) ??
                result.error?.message ??
                'Unable to create account',
            durationMs: 4000,
        })
    }

    return <LoginFormContainer>
        <NameTextbox name='Username' text={username} onTextChanged={setUsername} />
        <NameTextbox name='Email' text={email} onTextChanged={setEmail} />
        <PasswordTextbox text={password} onTextChanged={setPassword} />
        <CreateAccountButton onClick={onSubmit} />
        <SignInBlock />
    </LoginFormContainer>
}

function NameTextbox({ name, text, onTextChanged }: {
    name: string
    text?: string
    onTextChanged?: (value: string) => void
}) {
    return <LabeledRoundedTextbox
        labelProps={{
            text: name,
            color: theme.color.text.inverse,
        }}
        textboxProps={{
            placeholder: name,
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

function CreateAccountButton({ onClick }: { onClick?: () => void }) {
    return <SigninWrap>
        <RoundedButton
            style={{ width: '100%' }}
            colors={authTheme.colors.button}
            onClick={onClick}
        >
            Create Account
        </RoundedButton>
    </SigninWrap>
}

function SignInBlock() {
    return <SigninOptions style={{ justifyContent: 'center' }}>
        <Text
            color={theme.color.text.inverse}
            weight={theme.font.weight.light}
        >
            Already have an account?&nbsp;

            <TextLink
                as={Link}
                to={Paths.login}
                style={{ marginLeft: theme.space[1] }}
            >
                Sign in
            </TextLink>
        </Text>
    </SigninOptions>
}
