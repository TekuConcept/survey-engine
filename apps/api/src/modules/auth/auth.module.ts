import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Database } from '@/common'
import { UsersModule } from '@tables/users/users.module'
import { AuthService } from './auth.service'
import { SessionSerializer } from './session-serializer'
import { AuthResolver } from './auth.resolver'
import { AccountsModule, UserSchema } from '../tables'

@Module({
    imports: [
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([UserSchema], Database.DATA_TABLES),
        UsersModule,
        AccountsModule,
    ],
    providers: [
        SessionSerializer,
        AuthService,
        AuthResolver,
    ],
    exports: [AuthService],
})
export class AuthModule {}
