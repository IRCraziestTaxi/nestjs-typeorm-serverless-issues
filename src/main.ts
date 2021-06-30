import { INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const createNestApp = async <
    T extends INestApplication = INestApplication,
>(
    httpAdapter?: AbstractHttpAdapter,
): Promise<T> => {
    const app = await NestFactory.create<T>(AppModule, httpAdapter);
    app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);

    return app;
};

async function bootstrap() {
    const app = await createNestApp();

    await app.listen(3000);
}

bootstrap();
