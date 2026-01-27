import { gql } from '@apollo/client'
import { User } from '../tables/user/types'

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            status
            verified_at
            created_at
            updated_at
        }
    }
`

export type LoginVars = {
    username: string
    password: string
}

export type LoginResult = {
    login: User
}
