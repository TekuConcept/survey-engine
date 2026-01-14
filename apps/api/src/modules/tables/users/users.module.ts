import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Database } from '@/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { UserSchema } from './users.schema'

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [UserSchema],
            Database.DATA_TABLES,
        ),
    ],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
