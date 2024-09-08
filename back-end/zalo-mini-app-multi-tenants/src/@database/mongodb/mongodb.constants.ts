export class MongoDbConstants {
    public static readonly ConnectionCoreToken = 'mongodb_connection_core_token';
    public static readonly ConnectionTenantToken = 'mongodb_connection_tenant_token';

    public static readonly ZaloAppServicePrefix = 'zalo_app';
    public static readonly AppInfoCollection = `${this.ZaloAppServicePrefix}_app_infos`;
    public static readonly FollowerCollection = `${this.ZaloAppServicePrefix}_followers`;
    public static readonly ActivityCollection = `${this.ZaloAppServicePrefix}_activity_logs`;
    public static readonly StoreCollection = `${this.ZaloAppServicePrefix}_stores`;
    public static readonly SettingCollection = `${this.ZaloAppServicePrefix}_settings`;
    public static readonly EmployeeCollection = `${this.ZaloAppServicePrefix}_employees`;
    public static readonly TicketCollection = `${this.ZaloAppServicePrefix}_tickets`;
    public static readonly NotificationCollection = `${this.ZaloAppServicePrefix}_notifications`;

    public static readonly CoreServicePrefix = 'core';
    public static readonly TenantCollection = `${this.CoreServicePrefix}_tenants`;
}
export class SchemaConfig {
    public static readonly ToObject = {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    };
    public static readonly ToJSON = {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    };
}
