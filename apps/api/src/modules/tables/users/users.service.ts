import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Database } from '@/common'
import { User, UserDto, UserSchema, UserStatus } from './users.schema'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserSchema, Database.DATA_TABLES)
        private readonly usersRepo: Repository<User>,
    ) {}

    normalizeEmail(email: string): string {
        return email.trim().toLowerCase() ?? ''
    }

    normalizeUsername(username: string): string {
        return username.trim().toLowerCase() ?? ''
    }

    private sanitize(user: User | null): User | null {
        if (!user) return null
        delete user.password
        return user
    }

    async findById(id: number): Promise<User | null> {
        const result = await this.usersRepo
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne()
        return this.sanitize(result)
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.usersRepo
            .createQueryBuilder('user')
            .where('user.email = :email', {
                email: this.normalizeEmail(email)
            })
            .getOne()
        return this.sanitize(result)
    }

    async findByUsername(username: string): Promise<User | null> {
        const result = await this.usersRepo
            .createQueryBuilder('user')
            .where('user.username = :username', {
                username: this.normalizeUsername(username)
            })
            .getOne()
        return this.sanitize(result)
    }

    async findExisting(
        username: string,
        email: string,
        select: (keyof User)[] | '*' = '*'
    ): Promise<User | null> {
        const query = this.usersRepo
            .createQueryBuilder('user')
            .where('user.username = :username OR user.email = :email', {
                username: this.normalizeUsername(username),
                email: this.normalizeEmail(email),
            })

        if (select !== '*') {
            const uniqueFields = Array.from(new Set([...(select ?? [])]))
            if (select && uniqueFields.length > 0) {
                query.select(select.map(field => `user.${field}`))
            }
        }

        const result = await query.getOne()
        return this.sanitize(result)
    }

    async findExistingWithPassword(
        identifier: string,
        select: (keyof User)[] | '*' = '*'
    ): Promise<User | null> {
        const query = this.usersRepo
            .createQueryBuilder('user')
            .where('user.username = :identifier', { identifier })
            .orWhere('user.email = :identifier', { identifier })

        if (select !== '*') {
            const uniqueFields = Array.from(
                new Set([...(select ?? []), 'password'])
            )
            query.select(uniqueFields.map(field => `user.${field}`))
        }

        return await query.getOne()
    }

    async createUser(dto: UserDto): Promise<User> {
        const user = this.usersRepo.create({
            email: this.normalizeEmail(dto.email),
            username: this.normalizeUsername(dto.username),
            password: dto.password,
            status: UserStatus.PENDING,
            verified_at: null,
        } as User)

        const result = await this.usersRepo.save(user)
        return this.sanitize(result)
    }

    async markVerified(userId: number): Promise<void> {
        await this.usersRepo
            .createQueryBuilder()
            .update(User)
            .set({ verified_at: new Date() } as any)
            .where('id = :id', { id: userId })
            .execute()
    }

    async disableUser(userId: number): Promise<void> {
        await this.usersRepo
            .createQueryBuilder()
            .update(User)
            .set({ status: UserStatus.DISABLED } as any)
            .where('id = :id', { id: userId })
            .execute()
    }
}
