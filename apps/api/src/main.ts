import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    const isDev = process.env.NODE_ENV !== 'production'
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    if (isDev) {
        app.enableCors({
            origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
            credentials: true,
            exposedHeaders: 'X-CSRF-Token',
        })
    }

    app.enableShutdownHooks() // for graceful shutdown
    app.set('trust proxy', 1) // for NGinX or other reverse proxy

    await app.listen(Number(process.env.PORT || 4000))

    console.log(`Application is running on:`, await app.getUrl())
    if (isDev) console.log(`GraphQL playground:`, `${await app.getUrl()}/graphql`)
}

bootstrap()
