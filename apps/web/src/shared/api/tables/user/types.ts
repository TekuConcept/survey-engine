
export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    PENDING = 'PENDING',
}

export class User {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial ?? {})
        if (partial?.verified_at)
            this.verified_at = new Date(partial.verified_at)
        if (partial?.created_at)
            this.created_at = new Date(partial.created_at)
        if (partial?.updated_at)
            this.updated_at = new Date(partial.updated_at)
    }

    id: number = 0
    email: string = ''
    username: string = ''

    status: UserStatus = UserStatus.PENDING
    verified_at: Date | null = null

    created_at: Date = new Date()
    updated_at: Date = new Date()
}
