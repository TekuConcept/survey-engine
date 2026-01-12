import * as _ from 'lodash'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    TypeOrmModuleOptions,
    TypeOrmOptionsFactory,
} from '@nestjs/typeorm'
import { Database } from '@/common'
import { getConfig } from '@/config'
import { DatabaseConfig } from '@/config/types'
import { DatabaseFileLogger } from './filelogger'
import { DatabaseTables } from './tables'

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const database = this.configService.get<DatabaseConfig>('database')
        const isDev = getConfig().env !== 'production'
        const enableLogging = isDev && false // set to true to debug issues

        return {
            name: Database.DATA_TABLES, // required for proper shutdown
            type: 'mysql',
            host: database.host,
            port: database.port,
            username: database.user,
            password: database.pass,
            database: database.name,
            entities: DatabaseTables.getTables(),
            synchronize: false, // rely exclusively on migrations
            autoLoadEntities: true, // for future organization

            logging: enableLogging ? [
                'query',
                'warn',
                'error',
            ] : undefined, // temporarily enable all logs
            logger: enableLogging ? new DatabaseFileLogger() : undefined,

            extra: {
                connectionLimit: 5, // or lower depending on worker count
                waitForConnections: true,
                queueLimit: 0,
            },
        }
    }
}
