import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UsersService } from '@tables/users/users.service'
import { User } from '@tables/users/users.schema'

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly usersService: UsersService
    ) { super() }

    serializeUser(
        user: User,
        done: (err: any, id?: number) => void
    ): void { done(null, user.id) }

    async deserializeUser(
        id: number,
        done: (err: any, user?: any) => void
    ): Promise<void> {
        try {
            const user = await this.usersService.findById(id)
            // Passport expects "false" when no user is found
            done(null, user ?? false)
        } catch (err) { done(err) }
    }
}
