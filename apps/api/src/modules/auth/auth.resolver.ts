import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { HttpContext } from '@/common'
import { AccountsService, User } from '@modules/tables'
import { AuthService } from './auth.service'
import { AuthSetupInput, AuthSetupResult } from './auth.schema'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly accountsService: AccountsService,
    ) {}

    @Mutation(() => AuthSetupResult)
    async register(
        @Context() ctx: HttpContext,
        @Args('input') input: AuthSetupInput,
    ): Promise<AuthSetupResult> {
        const result = await this.authService.register(input)

        await new Promise<void>((resolve, reject) => {
            ctx.req.login(result.user, (err: any) => {
                if (err) return reject(err)
                ctx.req.session['accountId'] = result.account.id
                resolve()
            })
        })

        return result
    }

    @Mutation(() => User)
    async login(
        @Context() ctx: HttpContext,
        @Args('username', { type: () => String }) username: string,
        @Args('password', { type: () => String }) password: string,
    ): Promise<User> {
        const user = await this.authService.validateLogin(username, password)
        const accounts = await this.accountsService.findAccountsForUser(user.id)

        await new Promise<void>((resolve, reject) => {
            ctx.req.login(user, (err: any) => {
                if (err) return reject(err)
                ctx.req.session['accountId'] = accounts[0]?.id
                resolve()
            })
        })

        return user
    }

    @Mutation(() => Boolean)
    async logout(@Context() ctx: HttpContext): Promise<boolean> {
        if (!ctx.req.session) return true

        const loggedOut =await new Promise<boolean>((resolve, reject) => {
            ctx.req.logout(e => {
                resolve(!e)
            }) // Passport logout
        })
        if (!loggedOut) return false

        return new Promise((resolve) => {
            ctx.req.session.destroy((err: any) => {
                ctx.res.clearCookie('connect.sid')
                resolve(!err)
            })
        })
    }
}
