import { Activity } from '@app/enums';
import { IAppInfoDto } from '@app/models/request';
import { ArrayHelper } from '@app/shared/helpers';
import { ActivityLogRepository, FollowerRepository } from '@database/repositories';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);
    constructor(
        private readonly followerRepository: FollowerRepository,
        private readonly activityLogRepository: ActivityLogRepository,
    ) {}

    async follow(phone: string, appId: string) {
        return await this.followerRepository.updateOne({ phone, appId }, { phone, appId }, true);
    }

    async checkFollow(phone: string, appId: string) {
        const found = await this.followerRepository.findOne({ phone, appId });
        return found ? true : false;
    }

    async checkFistLogin(phone: string, appId: string) {
        const results = await this.activityLogRepository.findAll({ phone, appId, activity: Activity.REGISTER });
        return ArrayHelper.isEmpty(results) ? true : false;
    }
}
