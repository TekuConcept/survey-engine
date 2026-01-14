
/**
 * KV v2: secrets are under `/v1/<mount>/data/<path>`
 * mount default: "secret"
 */
export interface VaultKvOptions {
    mount?: string // e.g. "secret", "kv", "app"
}

/**
 * For KV v2, Vault wraps data in
 * `{ data: { data: T, metadata: ... } }`
 */
export interface VaultKv2ReadResponse<T> {
    request_id: string
    lease_id: string
    renewable: boolean
    lease_duration: number
    data: {
        data: T
        metadata: {
            created_time: string
            custom_metadata?: Record<string, any>
            deletion_time: string
            destroyed: boolean
            version: number
        }
    }
    wrap_info: any
    warnings: any
    auth: any
}
