import { store, resetApp } from './store'
import { uiSlice, demoAsync } from './slices/ui.slice'
import {
    authSlice,
    bootstrapAuth,
    loginUser,
    logoutUser,
    registerAccount,
} from './slices/auth.slice'

export const ReduxPie = {
    ui: {
        ...uiSlice.actions,
        demoAsync,
    },
    auth: {
        ...authSlice.actions,
        registerAccount,
        loginUser,
        logoutUser,
        bootstrapAuth,
    },

    reset: resetApp,

    // optional escape hatch if you like the old ergonomics:
    dispatch: store.dispatch,
}
