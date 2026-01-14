import { RedisClientType } from 'redis'
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { REDIS_CLIENT } from './types'

@Injectable()
export class RedisService implements OnModuleDestroy {
    constructor(
        @Inject(REDIS_CLIENT)
        public readonly client: RedisClientType
    ) {}

    async onModuleDestroy() {
        // quit() flushes pending commands properly
        await this.client.quit().catch(() => void 0)
    }
}
