import { Args, Int, Mutation, Query, Resolver, Context } from '@nestjs/graphql'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { HttpContext } from '@/common'
import { CurrentUser } from '@common/decorators/current-user.decorator'

import { User } from '../../users/users.schema'
import { Account, AccountDto } from './accounts.schema'
import { AccountsService } from './accounts.service'
import { AccountUsersService } from '../membership/account-users.service'
import { AccountRole } from '../membership/account-users.schema'

@Resolver(() => Account)
export class AccountsResolver {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly accountUsersService: AccountUsersService,
    ) {}

    @Query(() => [Account])
    async myAccounts(@CurrentUser() user: User): Promise<Account[]> {
        if (!user) throw new UnauthorizedException()
        return this.accountsService.findAccountsForUser(user.id)
    }

    @Query(() => Account)
    async account(
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
    ): Promise<Account> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireMember(accountId, user.id)

        const account = await this.accountsService.findById(accountId)
        if (!account) throw new NotFoundException('Account not found')
        return account as Account
    }

    @Mutation(() => Account)
    async createAccount(
        @CurrentUser() user: User,
        @Args('dto') dto: AccountDto,
    ): Promise<Account> {
        if (!user) throw new UnauthorizedException()

        /** User is automatically an "owner" of the accounts they create */
        const account = await this.accountsService.createAccount(dto)
        await this.accountUsersService.addMember(
            account.id, user.id, AccountRole.OWNER)
        return account
    }

    @Mutation(() => Account)
    async updateAccount(
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
        @Args('dto') dto: AccountDto,
    ): Promise<Account> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireRole(
            accountId, user.id, AccountRole.ADMIN)
        return this.accountsService.updateAccount(accountId, dto)
    }

    @Mutation(() => Boolean)
    async closeAccount(
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
    ): Promise<boolean> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireRole(
            accountId, user.id, AccountRole.OWNER)
        await this.accountsService.closeAccount(accountId)
        return true
    }

    @Mutation(() => Boolean)
    async setActiveAccount(
        @Context() ctx: HttpContext,
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
    ): Promise<boolean> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireMember(accountId, user.id)
        ctx.req.session['accountId'] = accountId
        return true
    }
}
