import { CreateSettingDto, IAppInfoDto } from '@app/models/request';
import { SettingRepository } from '@database/repositories';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SettingsService {
    private readonly logger = new Logger(SettingsService.name);
    constructor(private readonly settingRepository: SettingRepository) {}

    async createOrUpdate(body: CreateSettingDto, appInfo: IAppInfoDto) {
        this.logger.debug('createOrUpdate');
        const newSetting = {
            ...body,
            appId: appInfo.appId,
        };
        return await this.settingRepository.updateOne({ appId: appInfo.appId, version: body.version }, newSetting, true);
    }

    async findOne(appInfo, version: number) {
        return await this.settingRepository.findOne({ appId: appInfo.appId, version });
    }
}
