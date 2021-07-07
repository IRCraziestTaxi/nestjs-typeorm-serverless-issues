import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app-config';
// import { TypeOrmConfigService } from './config/database/typeorm-config.service';
import { AppConfig } from './config/interfaces/app-config.interface';
import { TypeOrmConfig } from './config/interfaces/typeorm-config.interface';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [appConfig], isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            // NOTE: This method (aside from surely being terribly inefficient - see class) did not address the issue.
            // Obtained (and slightly modified) from https://github.com/kop7/serverless-nestjs-typeorm.
            // useClass: TypeOrmConfigService,
            useFactory: (config: ConfigService<AppConfig>) => {
                const typeormConfig = config.get<TypeOrmConfig>('typeorm');
                return typeormConfig.options;
            },
            // Trying this newly added option in my fork of @nestjs/typeorm.
            // NOTE: This fix seems to do the trick.
            // ALSO NOTE: An additional fix was added to my fork of @nestjs/typeorm
            // where the keepConnectionAlive check is moved into the retry loop.
            // That fix alone also appears to have done the trick.
            connectionFactory: async (options) => {
                const manager = getConnectionManager();
                let connection: Connection;

                if (manager.has('default')) {
                    connection = manager.get('default');
                }

                if (!connection?.isConnected) {
                    connection = await createConnection(options);
                }

                return connection;
            },
        }),
        // App modules.
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
