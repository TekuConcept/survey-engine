import { DatabaseTables } from '@/core/db/tables'
import {
    Field,
    InputType,
    Int,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql'
import { EntitySchema } from 'typeorm'

export enum AccountType {
    PERSONAL = 'PERSONAL',
}

registerEnumType(AccountType, {
    name: 'AccountType',
    description: 'The type of an account',
})

export interface IAccountSchema {
    id: number
    name: string
    type: AccountType

    created_at: Date
    updated_at: Date
}

@InputType()
export class AccountDto {
    @Field()
    name: string

    @Field(() => AccountType, { defaultValue: AccountType.PERSONAL })
    type: AccountType = AccountType.PERSONAL
}

@ObjectType()
export class Account implements IAccountSchema {
    constructor(partial?: Partial<Account>) {
        Object.assign(this, partial ?? {})
    }

    @Field(_type => Int)
    id: number

    @Field()
    name: string

    @Field(() => AccountType)
    type: AccountType

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}

export const AccountSchema = new EntitySchema<Account>({
    name: 'Account',
    tableName: 'accounts',
    target: Account,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        name: {
            type: 'varchar',
            length: 64,
            unique: true,
            nullable: false,
        },
        type: {
            type: 'varchar',
            length: 16,
            nullable: false,
            default: AccountType.PERSONAL,
        },
        created_at: {
            type: 'timestamp',
            createDate: true,
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true,
        },
    },
})

DatabaseTables.register(AccountSchema)
