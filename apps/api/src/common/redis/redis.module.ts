import { createClient, RedisClientType } from 'redis'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RedisConfig } from '@/config'
import { RedisService } from './redis.service'
import { REDIS_CLIENT } from './types'

async function initRedisClient(
    config: ConfigService,
): Promise<RedisClientType> {
    const r = config.get<RedisConfig>('redis')
    const MAX_TIMEOUT = 10000

    let auth = ''
    if (r.user || r.pass) {
        const user = encodeURIComponent(r.user ?? '')
        const pass = encodeURIComponent(r.pass ?? '')
        auth = `${user}:${pass}@`
    }

    const url = `redis://${auth}${r.host}:${r.port}`
    const client: RedisClientType = createClient({
        url,
        socket: {
            reconnectStrategy: retries => Math.min(
                1000 * retries, MAX_TIMEOUT
            )
        },
    })

    client.on('error', e => console.error('[redis] client error:', e))

    await client.connect()
    await client.ping()

    return client
}

@Global()
@Module({
    providers: [
        {
            provide: REDIS_CLIENT,
            inject: [ConfigService],
            useFactory: initRedisClient,
        },
        RedisService,
    ],
    exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
