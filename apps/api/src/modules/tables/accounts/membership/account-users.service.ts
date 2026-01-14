import { Repository } from 'typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Database } from '@/common'
import {
    AccountRole,
    AccountUser,
    AccountUserSchema,
} from './account-users.schema'

@Injectable()
export class AccountUsersService {
    constructor(
        @InjectRepository(AccountUserSchema, Database.DATA_TABLES)
        private readonly accountUsersRepo: Repository<AccountUser>,
    ) {}

    private roleRank(role: AccountRole): number {
        switch (role) {
            case AccountRole.OWNER: return 3
            case AccountRole.ADMIN: return 2
            case AccountRole.MEMBER: return 1
            default: return 0
        }
    }

    async listMembers(accountId: number): Promise<AccountUser[]> {
        const results = await this.accountUsersRepo
            .createQueryBuilder('accountUser')
            .where('accountUser.account_id = :accountId', { accountId })
            .getMany()
        return results
    }

    async findMembership(
        accountId: number,
        userId: number,
    ): Promise<AccountUser | null> {
        const result = await this.accountUsersRepo
            .createQueryBuilder('accountUser')
            .where('accountUser.account_id = :accountId', { accountId })
            .andWhere('accountUser.user_id = :userId', { userId })
            .getOne()
        return result
    }

    async isMember(
        accountId: number,
        userId: number,
    ): Promise<boolean> {
        const count = await this.accountUsersRepo
            .createQueryBuilder('accountUser')
            .where('accountUser.account_id = :accountId', { accountId })
            .andWhere('accountUser.user_id = :userId', { userId })
            .getCount()
        return count > 0
    }

    async addMember(
        accountId: number,
        userId: number,
        role?: AccountRole,
    ): Promise<AccountUser> {
        const accountUser = this.accountUsersRepo.create({
            account_id: accountId,
            user_id: userId,
            role: role || AccountRole.MEMBER,
        })
        return await this.accountUsersRepo.save(accountUser)
    }

    async removeMember(
        accountId: number,
        userId: number,
    ): Promise<void> {
        await this.accountUsersRepo.delete({
            account_id: accountId,
            user_id: userId,
        })
    }

    async setRole(
        accountId: number,
        userId: number,
        role: AccountRole,
    ): Promise<void> {
        await this.accountUsersRepo
            .createQueryBuilder()
            .update(AccountUser)
            .set({ role } as any)
            .where('account_id = :accountId', { accountId })
            .andWhere('user_id = :userId', { userId })
            .execute()
    }

    /**
     * Ensures that the user is a member of the account.
     * @param accountId Target account ID
     * @param userId Target user ID
     * @throws Error if the user is not a member
     */
    async requireMember(
        accountId: number,
        userId: number,
    ): Promise<void> {
        const isMember = await this.isMember(accountId, userId)
        if (!isMember) throw new UnauthorizedException(
            'User is not a member of the account')
    }

    /**
     * Ensures that the user has at least the
     * minimum specified role in the account.
     * @param accountId Target account ID
     * @param userId Target user ID
     * @param minRole Minimum required role
     */
    async requireRole(
        accountId: number,
        userId: number,
        minRole: AccountRole,
    ): Promise<void> {
        const membership = await this.findMembership(accountId, userId)
        if (!membership) throw new UnauthorizedException(
            'User is not a member of the account')

        const roleHierarchy = [
            AccountRole.MEMBER,
            AccountRole.ADMIN,
            AccountRole.OWNER,
        ]
        const userRoleIndex = roleHierarchy.indexOf(membership.role)
        const minRoleIndex = roleHierarchy.indexOf(minRole)

        if (userRoleIndex < minRoleIndex) throw new UnauthorizedException(
            'User does not have sufficient role for this action')
    }

    async testRole(
        accountId: number,
        userId: number,
        role: AccountRole,
    ): Promise<boolean> {
        const membership = await this.findMembership(accountId, userId)
        if (!membership) return false
        return this.roleRank(membership.role) >= this.roleRank(role)
    }

    /**
     * Tests whether a user has authority over another member
     * @param accountId Target account ID
     * @param userId Requesting user ID
     * @param memberId Target user ID
     * @returns True if the requesting user has authority over the target user
     */
    async testAuthority(
        accountId: number,
        userId: number,
        memberId: number,
    ): Promise<boolean> {
        const membership = await this.findMembership(accountId, userId)
        if (!membership) return false

        const targetMembership = await this.findMembership(accountId, memberId)
        if (!targetMembership) return false

        return this.roleRank(membership.role) >= this.roleRank(targetMembership.role)
    }
}
