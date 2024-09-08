import { CustomHeader } from '@app/enums';
import { MongoDbConstants } from '@database/mongodb/mongodb.constants';
import { BcError } from '@errors/error-base';
import { errorCode } from '@errors/error-message';
import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const MongoDbConnectionProvider = [
    {
        provide: MongoDbConstants.ConnectionCoreToken,
        inject: [getConnectionToken()],
        useFactory: async (connection: Connection) => {
            return connection.useDb('core');
        },
    },
    {
        provide: MongoDbConstants.ConnectionTenantToken,
        useFactory: async (request, connection: Connection) => {
            const dbName = request.headers[CustomHeader.X_DB_NAME];
            if (!dbName) {
                throw new BcError(errorCode.SYS_ERR.MISSING_MIDDLEWARE);
            }
            console.log('dbName', dbName);
            return connection.useDb(`${dbName}`);
        },
        inject: [REQUEST, getConnectionToken()],
    },
];
