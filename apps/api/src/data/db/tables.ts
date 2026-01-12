import { EntitySchema } from 'typeorm'

export namespace DatabaseTables {
    const tables: EntitySchema[] = []

    export function register(
        tableName: EntitySchema
    ): void { tables.push(tableName) }

    export function getTables(): EntitySchema[] { return tables }
}
