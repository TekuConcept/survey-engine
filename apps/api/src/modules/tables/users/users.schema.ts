import { DatabaseTables } from '@/core/db/tables'
import {
    Field,
    InputType,
    Int,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql'
import { EntitySchema } from 'typeorm'

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    PENDING = 'PENDING',
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
    description: 'The status of a user account',
})

export interface IUserSchema {
    id: number
    email: string
    username: string
    password: string

    status: UserStatus

    verified_at: Date
    created_at: Date
    updated_at: Date
}

@InputType()
export class UserDto {
    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string
}

@ObjectType()
export class User implements IUserSchema {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial ?? {})
    }

    @Field(_type => Int)
    id: number

    @Field()
    email: string

    @Field()
    username: string

    /** @internal – ORM-only */
    password: string

    @Field(_type => UserStatus)
    status: UserStatus

    @Field(() => Date)
    verified_at: Date

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    tableName: 'users',
    target: User,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        email: {
            type: 'varchar',
            length: 128,
            unique: true,
            nullable: false,
        },
        username: {
            type: 'varchar',
            length: 32,
            unique: true,
            nullable: false,
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        status: {
            type: 'varchar',
            length: 16,
            nullable: false,
            default: UserStatus.PENDING,
        },
        verified_at: {
            type: 'timestamp',
            nullable: true,
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

DatabaseTables.register(UserSchema)
