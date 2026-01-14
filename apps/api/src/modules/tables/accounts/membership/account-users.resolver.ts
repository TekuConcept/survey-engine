import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UnauthorizedException } from '@nestjs/common'
import { CurrentUser } from '@common/decorators/current-user.decorator'

import { User } from '../../users/users.schema'
import { AccountUsersService } from './account-users.service'
import { AccountRole, AccountUser } from './account-users.schema'

@Resolver(() => AccountUser)
export class AccountUsersResolver {
    constructor(private readonly accountUsersService: AccountUsersService) {}

    @Query(() => [AccountUser])
    async accountMembers(
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
    ): Promise<AccountUser[]> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireMember(accountId, user.id)
        return this.accountUsersService.listMembers(accountId)
    }

    @Mutation(() => AccountUser)
    async addAccountMember(
        @CurrentUser() user: User,
        @Args('accountId', { type: () => Int }) accountId: number,
        @Args('userId', { type: () => Int }) userId: number,
        @Args('role', { nullable: true }) role: string,
    ): Promise<AccountUser> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireRole(
            accountId, user.id, AccountRole.ADMIN)

        const targetRole = role as AccountRole ?? AccountRole.MEMBER
        const canAdd = await this.accountUsersService.testRole(
            accountId, user.id, targetRole)
        if (!canAdd) throw new UnauthorizedException(
            'Insufficient role to add member with specified role')
        return this.accountUsersService.addMember(
            accountId, userId, targetRole)
    }

    @Mutation(() => Boolean)
    async removeAccountMember(
        @Args('accountId', { type: () => Int }) accountId: number,
        @Args('userId', { type: () => Int }) userId: number,
        @CurrentUser() user: User,
    ): Promise<boolean> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireRole(
            accountId, user.id, AccountRole.ADMIN)
        
        const canRemove = await this.accountUsersService.testAuthority(
            accountId, user.id, userId)
        if (!canRemove) throw new UnauthorizedException(
            'Insufficient role to remove specified member')
        await this.accountUsersService.removeMember(accountId, userId)
        return true
    }

    @Mutation(() => Boolean)
    async setAccountMemberRole(
        @Args('accountId', { type: () => Int }) accountId: number,
        @Args('userId', { type: () => Int }) userId: number,
        @Args('role') role: string,
        @CurrentUser() user: User,
    ): Promise<boolean> {
        if (!user) throw new UnauthorizedException()
        await this.accountUsersService.requireRole(
            accountId, user.id, AccountRole.OWNER)
        // Defensive - should only be necessary if the
        //             required role is set below OWNER
        const canSet = await this.accountUsersService.testAuthority(
            accountId, user.id, userId)
        if (!canSet) throw new UnauthorizedException(
            'Insufficient role to set role for specified member')
        await this.accountUsersService.setRole(accountId, userId, role as any)
        return true
    }
}
