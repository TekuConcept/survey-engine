
export interface DatabaseConfig {
    /** URL to the database */
    host: string
    /** Socket port number */
    port: number
    /** Authorized username for connections */
    user: string
    /** Password for connections */
    pass: string
    /** Database name to query */
    name: string
    /** Auth Source */
    authSource?: string
}

export interface VaultConfig {
    rootToken: string
    baseURL: string
}

export interface ExtrasConfig {}

export interface GlobalConfig {
    env: 'production' | 'development'
    /** Server port to listen on for HTTP connections */
    port: number
    /** Database connection info */
    database: DatabaseConfig
    /** Secrets vault configuration */
    vault?: VaultConfig
    /** Miscellaneous configuration values */
    extras?: ExtrasConfig
}
