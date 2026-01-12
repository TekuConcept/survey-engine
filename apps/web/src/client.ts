import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import {
    CombinedGraphQLErrors,
    CombinedProtocolErrors,
} from '@apollo/client/errors'

const errorLink = new ErrorLink(({ error, operation, result }) => {
    // GraphQL execution errors returned in the GraphQL `errors` array
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path, extensions }) => {
            console.log(
                `[GraphQL error] op=${operation.operationName || 'anonymous'}`,
                `message=${message}`,
                `locations=${JSON.stringify(locations ?? [])}`,
                `path=${JSON.stringify(path ?? [])}`,
                `extensions=${JSON.stringify(extensions ?? {})}`
            )
        })

        if (result?.data) console.log('[GraphQL partial data]', result.data)
        return
    }

    // Protocol-level errors (e.g., incremental delivery / transport details)
    if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) => {
            console.log(
                `[Protocol error] op=${operation.operationName || 'anonymous'}`,
                `message=${message}`,
                `extensions=${JSON.stringify(extensions ?? {})}`
            )
        })
        return
    }

    // Network / fetch / parse / etc.
    console.error(
        `[Network error] op=${operation.operationName || 'anonymous'}`,
        error
    )
})

// Use the following to disable all caching
const defaultOptions: ApolloClient.DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const cache = new InMemoryCache()
const link = ApolloLink.from([
    errorLink,
    new HttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include', // same-origin
    })
])

const client = new ApolloClient({ cache, link, defaultOptions })
export const Gql = { client }
