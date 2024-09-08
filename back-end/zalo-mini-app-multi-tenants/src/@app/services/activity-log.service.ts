import { CreateActivityLogDto } from '@app/models/request';
import { ActivityLogRepository } from '@database/repositories';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);
    constructor(private readonly activityLogRepository: ActivityLogRepository) { }

    async create(requestBody: CreateActivityLogDto, appId: string) {
        const logAt = Date.now();
        const newActivity = {
            ...requestBody,
            appId,
            logAt,
        };
        return await this.activityLogRepository.create(newActivity);
    }

    async findAllForApp(appId: string, phone: string) {
        return await this.activityLogRepository.findAllForAppByPhone(appId, phone);
    }

    async findById(logId: string) {
        return await this.activityLogRepository.findOne({ id: logId });
    }
}
