import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { User } from '@tables/users/users.schema'
import { Account } from '@/modules/tables/accounts/accounts/accounts.schema'

@InputType()
export class AuthSetupInput {
    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string

    @Field({ nullable: true })
    accountName?: string
}

@ObjectType()
export class AuthSetupResult {
    constructor(partial?: Partial<AuthSetupResult>) {
        Object.assign(this, partial ?? {})
    }

    @Field(() => User)
    user: User

    @Field(() => Account)
    account: Account
}
