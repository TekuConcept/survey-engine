/**
 * @file Data Source - TypeORM configuration for building migrations
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { loadAllSchemasSync } from './schema-loader'
import { DatabaseTables } from './tables'

dotenv.config()

// When this file is compiled, __dirname will be something like:
// dist/core/db
// We want dist root:
const distRoot = path.resolve(__dirname, '..', '..')
console.log(`Loading compiled schemas from: ${distRoot}`)

loadAllSchemasSync(distRoot)

const database = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USERNAME || 'root',
    pass: process.env.DB_PASSWORD || undefined,
    name: process.env.DB_DATABASE || undefined,
}

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.pass,
    database: database.name,

    entities: DatabaseTables.getTables(),

    synchronize: false,
    migrations: ['dist/core/db/migrations/*.js'],
}

export default new DataSource(dataSourceOptions)
