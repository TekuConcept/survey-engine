import { gql } from '@apollo/client'
import { User } from './types'

export const ME_QUERY = gql`
    query Me {
        me {
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

export type MeResult = {
    me: User | null
}
