import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
    /** Bare minimum for GraphQL (Code-First) to work */
    @Query(() => String)
    health(): string { return 'ok' }
}
