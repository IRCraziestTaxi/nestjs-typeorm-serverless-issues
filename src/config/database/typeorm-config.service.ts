// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { Connection, ConnectionManager, getConnectionManager } from 'typeorm';
// import { AppConfig } from '../interfaces/app-config.interface';
// import { TypeOrmConfig } from '../interfaces/typeorm-config.interface';

// NOTE: This method (aside from surely being terribly inefficient) did not address the issue.
// Obtained (and slightly modified) from https://github.com/kop7/serverless-nestjs-typeorm.

// @Injectable()
// export class TypeOrmConfigService implements TypeOrmOptionsFactory {
//     public constructor(private readonly config: ConfigService<AppConfig>) {}

//     public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
//         const connectionManager: ConnectionManager = getConnectionManager();
//         let defaultConnection: Connection;

//         // Avoid AlreadyHasActiveConnectionError errors.
//         if (connectionManager.has('default') && (defaultConnection = connectionManager.get('default')).isConnected) {
//             await defaultConnection.close();
//         }

//         const typeormConfig = this.config.get<TypeOrmConfig>('typeorm');

//         return typeormConfig.options;
//     }
// }
