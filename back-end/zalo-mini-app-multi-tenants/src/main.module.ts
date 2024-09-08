import {
    ActivityLogController,
    AppController,
    AppInfoController,
    EmployeeController,
    GeocodeController,
    NotificationController,
    SettingsController,
    XYZController,
    StoreController,
    TicketController,
} from '@app/controllers';
import { AppAuthGuard } from '@app/guards';
import { TenantsMiddleware } from '@app/middlewares/tenants.middleware';
import {
    ActivityLogService,
    AppInfoService,
    AppService,
    CustomerElasticService,
    EmployeeService,
    GeocodeService,
    NotificationService,
    SettingsService,
    XYZService,
    StoreService,
    TicketService,
} from '@app/services';
import { ConfigService, ConfigServiceProvider } from '@app/shared/config-manager';
import { TeleBotService } from '@app/shared/services/tele-bot.service';
import { MongoDbCollectionProvider } from '@database/mongodb/mongodb-collection.provider';
import { MongoDbConnectionProvider } from '@database/mongodb/mongodb-connection.provider';
import {
    ActivityLogRepository,
    AppInfoRepository,
    EmployeeRepository,
    FollowerRepository,
    NotificationRepository,
    SettingRepository,
    StoreRepository,
    TenantRepository,
    TicketRepository,
} from '@database/repositories';
import { HttpModule } from '@nestjs/axios';
import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    controllers: [
        AppController,
        ActivityLogController,
        AppInfoController,
        GeocodeController,
        StoreController,
        XYZController,
        SettingsController,
        EmployeeController,
        TicketController,
        NotificationController,
    ],
    providers: [
        ConfigServiceProvider,

        // Service
        TeleBotService,
        AppService,
        CustomerElasticService,
        ActivityLogService,
        AppInfoService,
        GeocodeService,
        StoreService,
        XYZService,
        SettingsService,
        EmployeeService,
        TicketService,
        NotificationService,

        // databases
        ...MongoDbConnectionProvider,
        ...MongoDbCollectionProvider,
        // Repositories
        ActivityLogRepository,
        AppInfoRepository,
        FollowerRepository,
        StoreRepository,
        SettingRepository,
        TenantRepository,
        EmployeeRepository,
        TicketRepository,
        NotificationRepository,

        // Guards
        AppAuthGuard,
    ],
    imports: [
        HttpModule.register({
            timeout: 30000,
            maxRedirects: 5,
        }),
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                uri: ConfigService.getInstanse().get('MONGODB_CONNECTION_STRING'),
            }),
        }),
        ElasticsearchModule.registerAsync({
            useFactory: async () => ({
                node: ConfigService.getInstanse().get('ELASTICSEARCH_NODE'),
                auth: {
                    username: ConfigService.getInstanse().get('ELASTICSEARCH_USERNAME'),
                    password: ConfigService.getInstanse().get('ELASTICSEARCH_PASSWORD'),
                },
            }),
        }),
    ],
    exports: [MainModule, ...MongoDbConnectionProvider],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TenantsMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
