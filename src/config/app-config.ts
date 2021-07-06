import { AppConfig } from './interfaces/app-config.interface';

export const appConfig = (): AppConfig => ({
    typeorm: {
        options: {
            // https://docs.nestjs.com/techniques/database#auto-load-entities
            // Note that glob paths are not supported by webpack, so if you are building your application within a monorepo, you won't be able to use them.
            // To address this issue, an alternative solution is provided. To automatically load entities, set the autoLoadEntities property of the configuration object (passed into the forRoot() method) to true.
            // Every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
            // Note that entities that aren't registered through the forFeature() method, but are only referenced from the entity (via a relationship), won't be included by way of the autoLoadEntities setting.
            autoLoadEntities: true,
            database: process.env.TYPEORM_DATABASE,
            type: (process.env.TYPEORM_CONNECTION as any) || 'mysql',
            host: process.env.TYPEORM_HOST || 'localhost',
            port: parseInt(process.env.TYPEORM_PORT) || 3306,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            // At runtime, ignore migrations.
            migrations: [],
            // NOTE: This by itself does not mitigate AlreadyHasActiveConnectionError in a serverless (specifically AWS Lambda) environment.
            keepConnectionAlive: true,
        },
    },
});
