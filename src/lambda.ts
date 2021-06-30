import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Server } from 'http';
import { createNestApp } from './main';

// Hydrate config variables.
dotenv.config();

let cachedServer: Server;

async function bootstrap() {
    if (!cachedServer) {
        const app = express();

        const nestApp = await createNestApp<NestExpressApplication>(
            new ExpressAdapter(app),
        );

        // Security.
        nestApp.enable('trust proxy');

        await nestApp.init();
        cachedServer = createServer(app, undefined, []);
    }

    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    // NOTE: We tried this in conjunction with and without both keepConnectionAlive and useClass: TypeOrmConfigService,
    // but none of those combinations addressed the AlreadyHasActiveConnectionError issues.
    // This will allow us to freeze open connections to a database.
    // context.callbackWaitsForEmptyEventLoop = false;
    cachedServer = await bootstrap();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
