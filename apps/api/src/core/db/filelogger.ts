import { Logger, QueryRunner } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'

export class DatabaseFileLogger implements Logger {
    private queryLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs', 'queries.log'),
        { flags: 'a' }
    )
    private errorLogStream = fs.createWriteStream(
        path.join(__dirname, 'logs', 'errors.log'),
        { flags: 'a' }
    )

    logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        const log = `[QUERY] ${new Date().toISOString()} - ${query} - Parameters: ${JSON.stringify(parameters)}\n`
        this.queryLogStream.write(log)
    }

    logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        const log = `[ERROR] ${new Date().toISOString()} - ${error} - Query: ${query} - Parameters: ${JSON.stringify(parameters)}\n`
        this.errorLogStream.write(log)
    }

    logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
        const log = `[SLOW QUERY] ${new Date().toISOString()} - Execution Time: ${time}ms - Query: ${query} - Parameters: ${JSON.stringify(parameters)}\n`
        this.queryLogStream.write(log)
    }

    logSchemaBuild(_message: string, _queryRunner?: QueryRunner) {
        // Optional: Log schema build events
    }

    logMigration(_message: string, _queryRunner?: QueryRunner) {
        // Optional: Log migration events
    }

    log(_level: 'log' | 'info' | 'warn', _message: any, _queryRunner?: QueryRunner) {
        // Optional: Log general events
    }
}
