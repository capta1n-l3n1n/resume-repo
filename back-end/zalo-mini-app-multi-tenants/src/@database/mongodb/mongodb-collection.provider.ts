import { Connection, Model } from 'mongoose';
import { MongoDbConstants } from './mongodb.constants';
import { ActivityLogSchema, FollowerSchema, SettingSchema, EmployeeSchema, StoreSchema, AppInfoSchema, TenantSchema, TicketSchema, NotificationSchema } from '@database/schemas';

export const MongoDbCollectionProvider = [
    {
        provide: MongoDbConstants.TenantCollection,
        useFactory: async (connection: Connection) => connection.model(MongoDbConstants.TenantCollection, TenantSchema),
        inject: [MongoDbConstants.ConnectionCoreToken],
    },
    {
        provide: MongoDbConstants.ActivityCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.ActivityCollection, ActivityLogSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.FollowerCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.FollowerCollection, FollowerSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.AppInfoCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.AppInfoCollection, AppInfoSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.StoreCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.StoreCollection, StoreSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.SettingCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.SettingCollection, SettingSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.EmployeeCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.EmployeeCollection, EmployeeSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.TicketCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.TicketCollection, TicketSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
    {
        provide: MongoDbConstants.NotificationCollection,
        useFactory: (connection: Connection): Model<any> => connection.model(MongoDbConstants.NotificationCollection, NotificationSchema),
        inject: [MongoDbConstants.ConnectionTenantToken],
    },
];
