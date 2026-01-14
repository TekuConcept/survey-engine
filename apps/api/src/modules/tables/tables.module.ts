import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AccountsModule } from './accounts'

@Module({
    imports: [
        UsersModule,
        AccountsModule,
    ],
})
export class TablesModule {}
