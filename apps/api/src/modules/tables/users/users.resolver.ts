import { Context, Query, Resolver } from '@nestjs/graphql'
import { UnauthorizedException } from '@nestjs/common'

import { HttpContext } from '@/common'
import { UsersService } from './users.service'
import { User } from './users.schema'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    async me(@Context() ctx: HttpContext): Promise<User> {
        const unauthroized = new UnauthorizedException('Not authenticated')

        if (!ctx.req?.isAuthenticated || !ctx.req.isAuthenticated()) {
            throw unauthroized
        }

        const userId = (ctx.req?.user as User)?.id
        if (!userId) throw unauthroized

        const user = await this.usersService.findById(userId)
        if (!user) throw unauthroized

        return user
    }
}
