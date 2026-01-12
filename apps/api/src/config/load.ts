import { GlobalConfig } from './types'

let cache: GlobalConfig = null

/** Get a cached copy of the configuration */
export const getConfig = () => {
    if (cache) return cache
    else return loadConfig()
}

/** Load configuration from environment variables */
export function loadConfig(): GlobalConfig {
    const result: GlobalConfig = {
        env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        port: parseInt(process.env.PORT, 10) || 3000,
        database: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            user: process.env.DB_USERNAME || 'root',
            pass: process.env.DB_PASSWORD || undefined,
            name: process.env.DB_DATABASE || 'survey-engine',
        },
        vault: {
            rootToken: process.env.VAULT_TOKEN
                || process.env.VAULT_ROOT_TOKEN,
            baseURL: process.env.VAULT_URL
                || (process.env.VAULT_HOST
                    ? `https://${process.env.VAULT_HOST}:${process.env.VAULT_PORT || 8200}`
                    : undefined
                ) || 'https://127.0.0.1:8200',
        },
        extras: {},
    }

    cache = result
    return result
}
