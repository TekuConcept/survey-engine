import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Gql } from '@/client'
import {
    REGISTER_MUTATION,
    AuthSetupInput,
    RegisterResult,
} from '@shared/api/auth/register'
import {
    LOGIN_MUTATION,
    LoginResult,
    LoginVars,
} from '@/shared/api/auth/login'
import { LOGOUT_MUTATION, LogoutResult } from '@shared/api/auth/logout'
import { ME_QUERY, MeResult } from '@/shared/api/tables/user/me'

export type AuthState = {
    user: RegisterResult['register']['user'] | null
    account: RegisterResult['register']['account'] | null
    isAuthenticated: boolean
    checked: boolean
    error?: string
}

const initialState: AuthState = {
    user: null,
    account: null,
    isAuthenticated: false,
    checked: false,
    error: undefined,
}

export const registerAccount = createAsyncThunk(
    'auth/register',
    async (input: AuthSetupInput, thunkApi) => {
        try {
            const res = await Gql.client.mutate<
                RegisterResult,
                { input: AuthSetupInput }
            >({
                mutation: REGISTER_MUTATION,
                variables: { input },
                fetchPolicy: 'no-cache',
            })

            const payload = res.data?.register
            if (!payload) throw new Error('No register payload returned')

            return payload
        } catch (err: any) {
            return thunkApi.rejectWithValue(
                err?.message ?? 'Unable to create account'
            )
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (vars: LoginVars, thunkApi) => {
        try {
            const res = await Gql.client.mutate<LoginResult, LoginVars>({
                mutation: LOGIN_MUTATION,
                variables: vars,
                fetchPolicy: 'no-cache',
            })

            const user = res.data?.login
            if (!user) throw new Error('No user returned')

            return user
        } catch (err: any) {
            return thunkApi.rejectWithValue(err?.message ?? 'Unable to sign in')
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_: void, thunkApi) => {
        try {
            const res = await Gql.client.mutate<LogoutResult>({
                mutation: LOGOUT_MUTATION,
                fetchPolicy: 'no-cache',
            })

            // Even if server returns false, client should still clear local auth
            return res.data?.logout ?? true
        } catch {
            // If server logout fails (network), still clear local auth
            return thunkApi.rejectWithValue('Logout request failed')
        }
    }
)

export const bootstrapAuth = createAsyncThunk(
    'auth/bootstrap',
    async (_: void, thunkApi) => {
        try {
            const res = await Gql.client.query<MeResult>({
                query: ME_QUERY,
                fetchPolicy: 'no-cache',
            })

            // me() returns null if not logged in
            return res.data?.me ?? null
        } catch (err: any) {
            // If server errors, treat as unauthenticated but still "checked"
            return thunkApi.rejectWithValue(err?.message ?? 'Session check failed')
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth(state) {
            state.user = null
            state.account = null
            state.isAuthenticated = false
            state.error = undefined
        },
        setAuth(
            state,
            action: PayloadAction<{
                user: AuthState['user']
                account: AuthState['account']
            }>
        ) {
            state.user = action.payload.user
            state.account = action.payload.account
            state.isAuthenticated = !!action.payload.user
            state.error = undefined
        },
    },
    extraReducers: (builder) => {
        // Register account
        builder
            .addCase(registerAccount.pending, (state) => {
                state.error = undefined
            })
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.account = action.payload.account
                state.isAuthenticated = true
                state.checked = true
                state.error = undefined
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.checked = true
                state.error =
                    (action.payload as string) ??
                    action.error.message ??
                    'Unable to create account'
            })

        // Login user
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = undefined
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.checked = true
                state.error = undefined
                // account stays as-is; set it if your backend returns it or you fetch it later
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.checked = true
                state.error =
                    (action.payload as string) ??
                    action.error.message ??
                    'Unable to sign in'
            })

        // Logout user
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.account = null
                state.isAuthenticated = false
                state.checked = true
                state.error = undefined
            })
            .addCase(logoutUser.rejected, (state) => {
                state.user = null
                state.account = null
                state.isAuthenticated = false
                state.checked = true
                // keep error optional; you can store it if you want
            })

        // Bootstrap auth (check session)
        builder
            .addCase(bootstrapAuth.pending, (state) => {
                state.error = undefined
                // don't flip checked here; wait until resolved
            })
            .addCase(bootstrapAuth.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = !!action.payload
                state.checked = true
                state.error = undefined
            })
            .addCase(bootstrapAuth.rejected, (state, action) => {
                state.user = null
                state.account = null
                state.isAuthenticated = false
                state.checked = true
                state.error =
                    (action.payload as string) ??
                    action.error.message ??
                    'Session check failed'
            })
    },
})
