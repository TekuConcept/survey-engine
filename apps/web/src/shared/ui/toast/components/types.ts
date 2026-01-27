
/** Toast “console” levels */
export type ToastLevel = 'debug' | 'info' | 'success' | 'warn' | 'error'

export type Toast = {
    id: string
    level: ToastLevel
    message: React.ReactNode
    title?: React.ReactNode
    durationMs?: number // default per-level if omitted
    createdAt: number
}

export type ToastInput = Omit<Toast, 'id' | 'createdAt'>

export type ToastContextValue = {
    push: (t: ToastInput) => string
    remove: (id: string) => void
    clear: () => void
}

/**
 * ---------------------------------------------------------------------------
 * Public API: `toast.*` (console-like)
 * ---------------------------------------------------------------------------
 *
 * Use anywhere (even outside React components):
 *   toast.log('Saved')          -> info
 *   toast.info('Loaded')
 *   toast.success('Created')
 *   toast.warn('Careful...')
 *   toast.error('Failed')
 *   toast.debug('Telemetry ...')
 */
export type ToastConsole = {
    log: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    debug: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    info: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    success: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    warn: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    error: (message: React.ReactNode, opts?: Partial<ToastInput>) => string
    clear: () => void
}

export type ToastEvent =
    | { type: 'push'; toast: ToastInput }
    | { type: 'clear' }

export type Listener = (evt: ToastEvent) => void
