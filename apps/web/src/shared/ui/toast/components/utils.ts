import React from 'react'
import {
    Listener,
    ToastConsole,
    ToastContextValue,
    ToastEvent,
    ToastLevel,
} from './types'

function createToastBus() {
    const listeners = new Set<Listener>()
    return {
        emit(evt: ToastEvent) {
            listeners.forEach((l) => l(evt))
        },
        subscribe(listener: Listener) {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
    }
}

export const toastBus = createToastBus()

export const toast: ToastConsole = {
    log: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'info', message, ...opts } })
        return '' // actual id returned by provider when mounted; see note below
    },
    debug: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'debug', message, ...opts } })
        return ''
    },
    info: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'info', message, ...opts } })
        return ''
    },
    success: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'success', message, ...opts } })
        return ''
    },
    warn: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'warn', message, ...opts } })
        return ''
    },
    error: (message, opts) => {
        toastBus.emit({ type: 'push', toast: { level: 'error', message, ...opts } })
        return ''
    },
    clear: () => toastBus.emit({ type: 'clear' }),
}

/**
 * NOTE: The console-like API above is fully usable anywhere, but because it
 * broadcasts to the mounted provider, it can’t synchronously return an id
 * until the provider receives and enqueues it. Most apps don’t need the id.
 *
 * If you want ids returned, use `useToast()` inside components.
 */

export const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
    const ctx = React.useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>.')
    return ctx
}

export function defaultDurationMs(level: ToastLevel) {
    switch (level) {
    case 'error':   return 6500
    case 'warn':    return 5200
    case 'success': return 3600
    case 'debug':   return 2600
    case 'info':
    default:        return 3200
    }
}

export function levelColor(level: ToastLevel) {
    switch (level) {
        case 'success': return 'linear-gradient(90deg, #437e07, #6ba821)'
        case 'warn':    return 'linear-gradient(90deg, #872c00, #de8e00)'
        case 'error':   return 'linear-gradient(90deg, #e00051, #e84e04)'
        case 'debug':   return 'linear-gradient(90deg, #343d4a, #555ab0)'
        case 'info':
        default:        return 'linear-gradient(90deg, #1d89df, #3500b1)'
    }
}

export function cryptoId() {
    // Works in modern browsers; falls back safely
    const g = globalThis as any
    if (g?.crypto?.randomUUID) return g.crypto.randomUUID()
    return `t_${Math.random().toString(16).slice(2)}_${Date.now()}`
}
