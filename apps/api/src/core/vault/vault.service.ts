import axios, { AxiosInstance, AxiosError } from 'axios'
import https from 'https'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VaultKvOptions, VaultKv2ReadResponse } from './types'
import { VaultConfig } from '@/core/config'

type JsonObject = Record<string, any>

export class VaultNotFoundError extends Error {
    constructor(public readonly path: string) {
        super(`Vault secret not found at path: ${path}`)
        this.name = 'VaultNotFoundError'
    }
}

export class VaultAccessError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
    ) {
        super(message)
        this.name = 'VaultAccessError'
    }
}

@Injectable()
export class VaultService {
    static readonly debug = process.env.NODE_ENV !== 'production'
    private readonly logger = new Logger(VaultService.name)
    private readonly client: AxiosInstance
    private readonly defaultMount: string
    private readonly prefix: string

    constructor(private readonly config: ConfigService) {
        const vault = this.config.get<VaultConfig>('vault')
        if (!vault?.baseURL) throw new Error('Missing vault.baseURL config')
        if (!vault?.token) throw new Error('Missing vault.token config')

        this.defaultMount = this.clean(vault?.mount ?? 'kv')
        this.prefix = vault?.prefix ? this.clean(vault.prefix) : ''
        this.client = axios.create({
            baseURL: vault.baseURL.replace(/\/+$/, ''), // trim trailing slashes
            headers: { 'X-Vault-Token': vault.token },
            timeout: 10000, // 10 seconds
            httpsAgent: new https.Agent({
                rejectUnauthorized: !VaultService.debug
            })
        })
    }

    /**
     * Read a KV v2 secret as JSON.
     * @param path e.g. "apps/my-app/session"
     * @returns T or null if missing
     */
    async get<T extends JsonObject>(
        path: string,
        opts: VaultKvOptions = {},
    ): Promise<T | null> {
        try {
            const mount = opts.mount ?? this.defaultMount
            const url = this.kv2DataUrl(mount, path)
            const res = await this.client.get<VaultKv2ReadResponse<T>>(url)
            return res.data.data.data ?? null
        } catch (e) {
            if (this.isNotFound(e)) return null
            throw this.wrapAxiosError(e, `Failed to read secret at "${path}"`)
        }
    }

    /** Same as get(), but throws if missing. */
    async getOrThrow<T extends JsonObject>(
        path: string,
        opts: VaultKvOptions = {},
    ): Promise<T> {
        const v = await this.get<T>(path, opts)
        if (!v) throw new VaultNotFoundError(path)
        return v
    }

    /**
     * Write a KV v2 secret as JSON (creates or replaces).
     * @param path e.g. "apps/my-app/session"
     * @param value any JSON object
     */
    async set<T extends JsonObject>(
        path: string,
        value: T,
        opts: VaultKvOptions = {},
    ): Promise<void> {
        try {
            const mount = opts.mount ?? this.defaultMount
            const url = this.kv2DataUrl(mount, path)
            // KV v2 expects { data: <your-object> }
            await this.client.post(url, { data: value })
        } catch (e) {
            throw this.wrapAxiosError(e, `Failed to write secret at "${path}"`)
        }
    }

    /**
     * Soft-delete latest version(s) (KV v2).
     * This hides it but doesn't destroy data.
     * For a hard delete, use destroy().
     */
    async remove(
        path: string,
        opts: VaultKvOptions = {},
    ): Promise<void> {
        try {
            const mount = opts.mount ?? this.defaultMount
            const url = this.kv2DeleteUrl(mount, path)
            await this.client.post(url, {}) // deletes latest version by default
        } catch (e) {
            // deleting something missing should usually be non-fatal
            // choose your preference:
            if (this.isNotFound(e)) return
            throw this.wrapAxiosError(e, `Failed to delete secret at "${path}"`)
        }
    }

    /** Permanently destroy versions (KV v2). This is irreversible. */
    async destroy(
        path: string,
        versions: number[] = [1],
        opts: VaultKvOptions = {},
    ): Promise<void> {
        try {
            const mount = opts.mount ?? this.defaultMount
            const url = this.kv2DestroyUrl(mount, path)
            await this.client.post(url, { versions })
        } catch (e) {
            if (this.isNotFound(e)) return
            throw this.wrapAxiosError(e, `Failed to destroy secret at "${path}"`)
        }
    }

    // -------------------------
    // Internals
    // -------------------------

    private applyPrefix(path: string): string {
        const cleanPath = this.clean(path)
        return this.prefix ? `${this.prefix}/${cleanPath}` : cleanPath
    }

    private kv2DataUrl(mount: string, path: string): string {
        // KV v2: read/write: /v1/<mount>/data/<path>
        const fullPath = this.applyPrefix(path)
        return `/v1/${this.clean(mount)}/data/${fullPath}`
    }

    private kv2DeleteUrl(mount: string, path: string): string {
        // KV v2 delete versions endpoint:
        // /v1/<mount>/delete/<path>
        const fullPath = this.applyPrefix(path)
        return `/v1/${this.clean(mount)}/delete/${fullPath}`
    }

    private kv2DestroyUrl(mount: string, path: string): string {
        // KV v2 destroy versions endpoint:
        // /v1/<mount>/destroy/<path>
        const fullPath = this.applyPrefix(path)
        return `/v1/${this.clean(mount)}/destroy/${fullPath}`
    }

    private clean(p: string): string {
        return p.replace(/^\/+|\/+$/g, '')
    }

    private isNotFound(e: unknown): boolean {
        const ax = e as AxiosError
        return !!ax?.response && ax.response.status === 404
    }

    private wrapAxiosError(e: unknown, context: string): Error {
        const ax = e as AxiosError<any>
        const status = ax?.response?.status
        const msg =
            ax?.response?.data?.errors?.join?.('; ') ||
            ax?.response?.data?.error ||
            ax?.message ||
            String(e)

        // Avoid logging secrets; keep it minimal.
        this.logger.error(
            `${context}. Status=${status ?? 'n/a'} Message=${msg}`
        )

        // If you want more specific handling for 403, etc:
        return new VaultAccessError(`${context}: ${msg}`, status)
    }
}
