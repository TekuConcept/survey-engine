import { Global, Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TablesModule } from './tables/tables.module'

@Global()
@Module({
    imports: [
        AuthModule,
        TablesModule,
    ],
})
export class FeatureModule {}
