import { Global, Module } from '@nestjs/common'
import { RedisModule } from './redis'
import { VaultModule } from './vault'

@Global()
@Module({
    imports: [
        RedisModule,
        VaultModule,
    ],
})
export class CoreModule {}
