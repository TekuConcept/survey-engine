import {
    combineReducers,
    configureStore,
    UnknownAction,
} from '@reduxjs/toolkit'
import {
    uiSlice,
    authSlice,
} from './slices'

const appReducer = combineReducers({
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
})

const rootReducer: typeof appReducer = (
    state: any,
    action: UnknownAction,
) => {
    if (action.type === 'app/RESET') state = undefined
    return appReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const resetApp = () => store.dispatch({ type: 'app/RESET' })
