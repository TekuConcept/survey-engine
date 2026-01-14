import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Database } from '@/common'
import { Account, AccountDto, AccountSchema } from './accounts.schema'

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(AccountSchema, Database.DATA_TABLES)
        private readonly accountRepo: Repository<Account>,
    ) {}

    async findById(accountId: number): Promise<Account | null> {
        const result = await this.accountRepo
            .createQueryBuilder('account')
            .where('account.id = :accountId', { accountId })
            .getOne()
        return result
    }

    async createAccount(dto: AccountDto): Promise<Account> {
        const account = this.accountRepo.create(dto)
        return await this.accountRepo.save(account)
    }

    async updateAccount(
        accountId: number,
        patch: AccountDto,
    ): Promise<Account> {
        const account = await this.findById(accountId)
        if (!account) throw new NotFoundException('Account not found')

        Object.assign(account, patch)
        return await this.accountRepo.save(account)
    }

    async closeAccount(accountId: number): Promise<void> {
        await this.accountRepo.delete(accountId)
    }

    async findAccountsForUser(userId: number): Promise<Account[]> {
        const results = await this.accountRepo
            .createQueryBuilder('account')
            .innerJoin('account.accountUsers', 'accountUser')
            .where('accountUser.user_id = :userId', { userId })
            .getMany()
        return results
    }
}
