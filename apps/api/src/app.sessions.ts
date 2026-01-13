import passport from 'passport'
import crypto from 'crypto'
import session from 'express-session'
import { RedisStore } from 'connect-redis'
import { RedisClientType } from 'redis'
import { NestExpressApplication } from '@nestjs/platform-express'
import { REDIS_CLIENT, VaultService } from './common'
import { Logger } from '@nestjs/common'

export interface SessionState {
    created: number // timestamp ms
    secret: string
}

export interface SessionInit {
    secrets: SessionState[]
}

export namespace Sessions {
    function genSessionSecret(): string {
        // 32 bytes = 256 bits of entropy
        return crypto.randomBytes(32).toString('hex')
    }

    function normalizeInit(init: SessionInit | null | undefined): SessionInit {
        const secrets = Array.isArray(init?.secrets) ? init!.secrets : []

        // Filter out bad entries and sort newest first
        const cleaned = secrets
            .filter((s) =>
                typeof s?.secret === 'string' &&
                s.secret.length > 0 &&
                Number.isFinite(s?.created))
            .sort((a, b) => b.created - a.created)

        return { secrets: cleaned }
    }

    async function rotateSessionSecrets(
        vault: VaultService,
        now: number,
        rotateAfterMs: number,
        maxSecrets: number,
    ): Promise<SessionInit> {
        const vaultPath = 'session/config'

        // If missing, initialize with one secret.
        const existing = await vault.get<SessionInit>(vaultPath)
        let init = normalizeInit(existing)

        const newest = init.secrets[0]
        const needsInit = init.secrets.length === 0
        const needsRotate = !newest || (now - newest.created) > rotateAfterMs

        if (needsInit || needsRotate) {
            const next: SessionState = {
                created: now,
                secret: genSessionSecret()
            }
            init = { secrets: [next, ...init.secrets].slice(0, maxSecrets) }
            await vault.set<SessionInit>(vaultPath, init)
        }

        // Re-normalize (in case Vault transforms it)
        return normalizeInit(init)
    }

    export async function addSupport(
        app: NestExpressApplication,
        isDev: boolean
    ) {
        const MAX_SECRETS = 3
        const THREE_DAYS = 1000 * 60 * 60 * 24 * 7

        const redis = app.get<RedisClientType>(REDIS_CLIENT)
        const vault = app.get<VaultService>(VaultService)
        const init = await rotateSessionSecrets(
            vault,
            Date.now(),
            THREE_DAYS,
            MAX_SECRETS,
        )

        if (init.secrets.length === 0) {
            throw new Error(
                `Vault session init has no secrets after rotation.`
            )
        }

        // IMPORTANT: newest first
        const secrets = init.secrets
            .sort((a, b) => b.created - a.created)
            .map((s) => s.secret)

        Logger.verbose(`Using ${secrets.length} session secrets.`)

        app.use(
            session({
                name: 'sid',

                // Key rotation: first used to sign, all accepted to verify.
                secret: secrets,
                resave: false,
                saveUninitialized: false,
                rolling: true,

                cookie: {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: !isDev,
                    maxAge: THREE_DAYS, // (independent of secret rotation)
                },

                store: new RedisStore({
                    client: redis as any,
                    prefix: 'se:sess:',
                    // ttl: THREE_DAYS,
                }),
            }),
        )

        app.use(passport.initialize())
        app.use(passport.session())
    }
}
