import { gql } from '@apollo/client'
import { User } from '../tables/user/types'
import { Account } from '../tables/account/types'

export const REGISTER_MUTATION = gql`
    mutation Register($input: AuthSetupInput!) {
        register(input: $input) {
            user {
                id
                email
                username
                status
                verified_at
                created_at
                updated_at
            }
            account {
                id
                name
                type
                created_at
                updated_at
            }
        }
    }
`

export type AuthSetupInput = {
    email: string
    username: string
    password: string
}

export type RegisterResult = {
    register: {
        user: User
        account: Account
    }
}
