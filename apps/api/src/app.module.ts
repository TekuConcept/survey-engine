import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MySQLConfigService } from '@/core/db/mysql.service'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { Database } from './common'
import { loadConfig, getConfig } from './core/config'
import { CoreModule } from './core/core.module'
import { FeatureModule } from './modules/feature.module'

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

        CoreModule,
        FeatureModule,
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule {}
