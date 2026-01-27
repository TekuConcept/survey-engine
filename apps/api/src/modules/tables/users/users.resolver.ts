import { Context, Query, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/common'
import { UsersService } from './users.service'
import { User } from './users.schema'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User, { nullable: true })
    async me(@Context() ctx: HttpContext): Promise<User | null> {
        const userId = (ctx.req?.user as User)?.id
        if (!userId) return null

        // NOTE: Sanitized within findById
        return await this.usersService.findById(userId)
    }
}
