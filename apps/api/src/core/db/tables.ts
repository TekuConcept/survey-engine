import { EntitySchema } from 'typeorm'

export namespace DatabaseTables {
    const tables = new Map<string, EntitySchema>()

    export function register(
        tableName: EntitySchema
    ): void {
        // Ensure no duplicate registrations
        // (first come, first served)
        const name = tableName.options.name
        if (!tables.has(name))
            tables.set(name, tableName)
    }

    export function getTables(): EntitySchema[] {
        // Deterministically order by name
        return Array.from(tables.values()).sort((a, b) => {
            const an = a.options.name ?? ''
            const bn = b.options.name ?? ''
            return an.localeCompare(bn)
        })
    }
}
