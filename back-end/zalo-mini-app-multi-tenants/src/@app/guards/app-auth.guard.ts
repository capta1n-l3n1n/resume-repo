import { CustomHeader } from '@app/enums';
import { IAppInfoDto } from '@app/models/request';
import { StringHelper } from '@app/shared/helpers';
import { AppInfoRepository } from '@database/repositories';
import { RequestInvalidError } from '@errors/error-base';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppAuthGuard implements CanActivate {
    private readonly logger = new Logger(AppAuthGuard.name);
    constructor(readonly appInfoRepository: AppInfoRepository) {}

    async canActivate(context: ExecutionContext) {
        this.logger.debug('App auth');
        const request = context.switchToHttp().getRequest();
        const appId = request.headers[CustomHeader.X_APP_ID];
        this.logger.debug(`appId: ${appId}`);
        if (StringHelper.isEmpty(appId)) {
            throw new RequestInvalidError('Missing app id');
        }
        const entity = await this.appInfoRepository.findOne({ id: appId });
        this.logger.debug(`App ${entity}`);
        if (!entity) return false;
        const app: IAppInfoDto = {
            appId: entity.id,
            config: entity.config,
        };
        request.headers[CustomHeader.X_APP_INFO] = app;
        return true;
    }
}
