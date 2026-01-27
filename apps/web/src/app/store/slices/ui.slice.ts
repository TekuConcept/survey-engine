import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'

export interface UiState {
    busyCount: number
    toast?: { message: string; at: number }
}

const initialState: UiState = {
    busyCount: 0,
    toast: undefined,
}

export const demoAsync = createAsyncThunk(
    'ui/demoAsync',
    async (ms: number, { dispatch }) => {
        // Simulate async work (API, etc.)
        await new Promise((r) => setTimeout(r, ms))
        dispatch(uiSlice.actions.toast(`Async done in ${ms}ms`))
        return ms
    }
)

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        busyStart(state) { state.busyCount += 1 },
        busyEnd(state) {
            state.busyCount = Math.max(0, state.busyCount - 1)
        },
        toast(state, action: PayloadAction<string>) {
            state.toast = { message: action.payload, at: Date.now() }
        },
        clearToast(state) { state.toast = undefined },
    },
    extraReducers: (builder) => {
        builder
        .addCase(demoAsync.pending, (state) => {
            state.busyCount += 1
        })
        .addCase(demoAsync.fulfilled, (state) => {
            state.busyCount = Math.max(0, state.busyCount - 1)
        })
        .addCase(demoAsync.rejected, (state) => {
            state.busyCount = Math.max(0, state.busyCount - 1)
        });
    },
})
