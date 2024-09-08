import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { AppInfo } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AppInfoRepository extends GenericRepository<AppInfo> {
    private readonly context = AppInfoRepository.name;

    constructor(
        @Inject(MongoDbConstants.AppInfoCollection)
        private readonly appInfoModel: Model<AppInfo>,
        private readonly configService: ConfigService,
    ) {
        super(appInfoModel);
    }
}
