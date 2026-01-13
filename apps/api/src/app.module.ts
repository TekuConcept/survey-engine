import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MySQLConfigService } from '@data/db/mysql.service'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { Database, RedisModule, VaultModule } from './common'
import { loadConfig, getConfig } from './config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true, // join(process.cwd(), 'src/schema.gql')
            sortSchema: true,
            playground: getConfig().env !== 'production',
        }),

        TypeOrmModule.forRootAsync({
            name: Database.DATA_TABLES,
            imports: [ConfigModule],
            useClass: MySQLConfigService,
            inject: [ConfigService],
        }),

        VaultModule,
        RedisModule,
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule {}
