import 'module-alias/register';
import 'dotenv/config';
import '@Shared/environment/ReadEnv';
import '@Shared/logger/Apm';
import '@Shared/exception/Unhandled.interceptor';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnv } from '@Shared/environment/GetEnv';

async function bootstrap() {
    const { host, port } = getEnv<{ host: string; port: number }>('app');
    let app: INestApplication;
    app = await NestFactory.create<NestApplication>(AppModule, {
        logger: ['error', 'warn'],
        cors: {
            origin: process.env.APP_CORS_ORIGIN?.split(','),
            credentials: true,
        },
    });
    global.getApp = () => app;
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix('/api/internatz-back/');
    await app.listen(port, host);
    console.log('\x1b[36m%s\x1b[0m', `Server listening on ${host}:${port}`);
}

bootstrap();
