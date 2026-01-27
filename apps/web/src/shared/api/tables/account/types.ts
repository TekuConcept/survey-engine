
export enum AccountType {
    PERSONAL = 'PERSONAL',
}

export class Account {
    constructor(partial?: Partial<Account>) {
        Object.assign(this, partial ?? {})
        if (partial?.created_at)
            this.created_at = new Date(partial.created_at)
        if (partial?.updated_at)
            this.updated_at = new Date(partial.updated_at)
    }

    id: number = 0
    name: string = ''
    type: AccountType = AccountType.PERSONAL

    created_at: Date = new Date()
    updated_at: Date = new Date()
}
