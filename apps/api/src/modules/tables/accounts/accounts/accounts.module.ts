import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Database } from '@/common'

import { AccountsService } from './accounts.service'
import { AccountsResolver } from './accounts.resolver'
import { AccountSchema } from './accounts.schema'

import { AccountUsersService } from '../membership/account-users.service'
import { AccountUsersResolver } from '../membership/account-users.resolver'
import { AccountUserSchema } from '../membership/account-users.schema'

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AccountSchema, AccountUserSchema],
            Database.DATA_TABLES,
        ),
    ],
    providers: [
        AccountsService,
        AccountUsersService,
        AccountsResolver,
        AccountUsersResolver,
    ],
    exports: [AccountsService, AccountUsersService],
})
export class AccountsModule {}
