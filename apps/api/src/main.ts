import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { Sessions } from './app.sessions'

async function bootstrap() {
    const isDev = process.env.NODE_ENV !== 'production'
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        { logger: parseLogLevels() }
    )

    if (isDev) {
        app.enableCors({
            origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
            credentials: true,
            exposedHeaders: 'X-CSRF-Token',
        })
    }

    app.enableShutdownHooks() // for graceful shutdown
    app.set('trust proxy', 1) // for NGinX or other reverse proxy

    await Sessions.addSupport(app, isDev)
    await app.listen(Number(process.env.PORT || 4000))

    console.log(`Application is running on:`, await app.getUrl())
    if (isDev) console.log(`GraphQL playground:`, `${await app.getUrl()}/graphql`)
}

function parseLogLevels(): Array<'log' | 'error' | 'warn' | 'debug' | 'verbose'> {
    const level = (process.env.LOG_LEVEL ?? '').toLowerCase()
    const options = ['error', 'warn', 'log', 'debug', 'info', 'verbose'] as any[]

    if (level === 'verbose') return options
    if (level === 'info') return options.slice(0, 5)
    if (level === 'debug') return options.slice(0, 4)
    if (level === 'log') return options.slice(0, 3)
    if (level === 'warn') return options.slice(0, 2)
    if (level === 'error') return options.slice(0, 1)

    return process.env.NODE_ENV === 'production'
        ? options.slice(0, 2) // warn + error
        : options // all
}

bootstrap()
