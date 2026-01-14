import { DatabaseTables } from '@/core/db/tables'
import {
    Field,
    InputType,
    Int,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql'
import { EntitySchema } from 'typeorm'

export enum AccountRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

registerEnumType(AccountRole, {
    name: 'AccountRole',
    description: 'The role of an account',
})

export interface IAccountUserSchema {
    account_id: number
    user_id: number
    role: AccountRole

    created_at: Date
}

@InputType()
export class AccountUserDto {
    @Field(() => AccountRole)
    role: AccountRole
}

@ObjectType()
export class AccountUser implements IAccountUserSchema {
    constructor(partial?: Partial<AccountUser>) {
        Object.assign(this, partial ?? {})
    }

    @Field(_type => Int)
    account_id: number

    @Field(_type => Int)
    user_id: number

    @Field(() => AccountRole)
    role: AccountRole

    @Field(() => Date)
    created_at: Date
}

export const AccountUserSchema = new EntitySchema<AccountUser>({
    name: 'AccountUser',
    tableName: 'account-users',
    target: AccountUser,
    columns: {
        account_id: {
            type: 'int',
            primary: true,
        },
        user_id: {
            type: 'int',
            primary: true,
        },
        role: {
            type: 'varchar',
            length: 16,
            default: AccountRole.MEMBER,
        },
        created_at: {
            type: 'timestamp',
            createDate: true,
        },
    },
})

DatabaseTables.register(AccountUserSchema)
