import { CreateAppInfoDto } from '@app/models/request';
import { AppInfoRepository } from '@database/repositories';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppInfoService {
    private readonly logger = new Logger(AppInfoService.name);
    constructor(private readonly appInfoRepository: AppInfoRepository) {}

    async getAll() {
        return await this.appInfoRepository.findAll();
    }
    async create(request: CreateAppInfoDto) {
        return await this.appInfoRepository.create(request);
    }
}
