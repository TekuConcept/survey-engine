import React from 'react'
import { Toast, ToastInput } from './types'
import { ToastItem } from './toast-item'
import { cryptoId, defaultDurationMs, toastBus, ToastContext } from './utils'
import { ToastViewport } from './primitive'

export function ToastProvider({
    children,
    maxToasts = 4,
    placement = 'top-right',
}: {
    children: React.ReactNode
    maxToasts?: number
    placement?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}) {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const remove = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const clear = React.useCallback(() => {
        setToasts([])
    }, [])

    const push = React.useCallback(
        (t: ToastInput) => {
            const id = cryptoId()
            const createdAt = Date.now()
            const toast: Toast = {
                id,
                createdAt,
                durationMs: t.durationMs ?? defaultDurationMs(t.level),
                ...t,
            }

            setToasts((prev) => {
                const next = [toast, ...prev]
                return next.slice(0, maxToasts)
            })

            return id
        },
        [maxToasts]
    )

    // Wire global toastBus -> provider
    React.useEffect(() => {
        toastBus.subscribe((evt) => {
            if (evt.type === 'clear') {
                clear()
                return
            }

            if (evt.type === 'push') {
                push(evt.toast)
            }
        })
    }, [push, clear])

    return <ToastContext.Provider value={{ push, remove, clear }}>
        {children}
        <ToastViewport $placement={placement}>
            {toasts.map((t) => (
                <ToastItem
                    key={t.id}
                    toast={t}
                    onClose={() => remove(t.id)}
                />
            ))}
        </ToastViewport>
    </ToastContext.Provider>
}
