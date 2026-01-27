import { useAppDispatch, useAppSelector } from '@app/store/hooks'
import { ReduxPie } from '@app/store'

export function PlaygroundPage() {
    const dispatch = useAppDispatch()
    const busy = useAppSelector((s: any) => s.ui.busyCount)
    const toast = useAppSelector((s: any) => s.ui.toast)

    return <div>
        <h2>Playground</h2>

        <div style={{ marginBottom: 12 }}>
            <button onClick={() => dispatch(ReduxPie.ui.toast('Hello'))}>
                Sync toast
            </button>{' '}
            <button onClick={() => dispatch(ReduxPie.ui.demoAsync(600))}>
                Async thunk
            </button>{' '}
            <button onClick={ReduxPie.reset}>
                RESET
            </button>
        </div>

        <div>busyCount: {busy}</div>
        {toast && (
            <div style={{ marginTop: 8 }}>
                toast: {toast.message}
                <button
                    onClick={() => dispatch(ReduxPie.ui.clearToast())}
                    style={{ marginLeft: 8 }}
                >
                    clear
                </button>
            </div>
        )}
    </div>
}
