import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Setting } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SettingRepository extends GenericRepository<Setting> {
    private readonly context = SettingRepository.name;

    constructor(
        @Inject(MongoDbConstants.SettingCollection)
        private readonly settingModel: Model<Setting>,
        private readonly configService: ConfigService,
    ) {
        super(settingModel);
    }
}
