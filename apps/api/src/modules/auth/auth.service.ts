import * as bcrypt from 'bcrypt'
import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    Inject,
} from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Database } from '@/common'

import { User, UserStatus } from '@tables/users/users.schema'
import { Account, AccountType } from '@/modules/tables/accounts/accounts/accounts.schema'
import { AccountRole, AccountUser } from '@/modules/tables/accounts/membership/account-users.schema'
import { UsersService } from '@tables/users/users.service'
import { AuthSetupInput, AuthSetupResult } from './auth.schema'

@Injectable()
export class AuthService {
    constructor(
        @InjectDataSource(Database.DATA_TABLES)
        private readonly dataSource: DataSource,
        @Inject(UsersService)
        private readonly usersService: UsersService,
    ) {}

    async register(
        input: AuthSetupInput
    ): Promise<AuthSetupResult> {
        const email = this.usersService.normalizeEmail(input.email)
        const username = this.usersService.normalizeUsername(input.username)

        const existing = await this.usersService.findExisting(
            username,
            email,
            ['id', 'email', 'username']
        )
        if (existing) throw new ConflictException(
            'Email or username already in use'
        )

        const passwordHash = await bcrypt.hash(input.password, 12)

        try {
            return await this.dataSource.transaction(async (manager) => {
                const userRepo = manager.getRepository(User)
                const accountRepo = manager.getRepository(Account)
                const accountUserRepo = manager.getRepository(AccountUser)

                const user = userRepo.create({
                    email,
                    username,
                    password: passwordHash,
                    status: UserStatus.PENDING,
                    verified_at: null,
                } as any)
                const newUser = await userRepo.save(user) as any

                const accountName = input.accountName?.trim()
                const account = accountRepo.create({
                    name: accountName || `${username}'s account`,
                    type: AccountType.PERSONAL,
                } as any)
                const newAccount = await accountRepo.save(account) as any

                const membership = accountUserRepo.create({
                    account_id: (account as any).id,
                    user_id: (user as any).id,
                    role: AccountRole.OWNER,
                } as any)
                await accountUserRepo.save(membership)

                return new AuthSetupResult({
                    user: newUser,
                    account: newAccount,
                })
            })
        } catch (err: any) {
            // Handles races where another registration happened between precheck and insert
            const code = err?.code
            if (code === 'ER_DUP_ENTRY')
                throw new ConflictException('Email or username already in use')
            throw err
        }
    }

    async validateLogin(
        username: string,
        password: string,
    ): Promise<User> {
        const user = await this.usersService
            .findExistingWithPassword(username)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) throw new UnauthorizedException('Invalid credentials')

        if (user.status === UserStatus.DISABLED)
            throw new UnauthorizedException('Invalid credentials')

        // IMPORTANT: don’t leak the password hash upward
        delete user.password
        return user
    }
}
