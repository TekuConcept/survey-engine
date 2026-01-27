import React from 'react'
import { Toast } from './types'
import {
    CloseButton,
    LeftAccent,
    ToastBody,
    ToastCard,
    ToastMessage,
    ToastTitle,
} from './primitive'

export function ToastItem({
    toast,
    onClose,
}: {
    toast: Toast
    onClose: () => void
}) {
    React.useEffect(() => {
        if (!toast.durationMs || toast.durationMs <= 0) return
        const timer = window.setTimeout(onClose, toast.durationMs)
        return () => window.clearTimeout(timer)
    }, [toast.durationMs, onClose])

    return <ToastCard $level={toast.level} role='status' aria-live='polite'>
        <LeftAccent $level={toast.level} />

        <ToastBody>
            {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
            <ToastMessage>{toast.message}</ToastMessage>
        </ToastBody>

        <CloseButton aria-label='Close toast' onClick={onClose}>
            ×
        </CloseButton>
    </ToastCard>
}
