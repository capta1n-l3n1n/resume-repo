import { CustomHeader } from '@app/enums';
import { TenantRepository } from '@database/repositories';
import { NotFoundError, RequestInvalidError } from '@errors/index';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
    private readonly logger = new Logger(TenantsMiddleware.name);
    constructor(private tenantRepository: TenantRepository) {}

    async use(req: Request, res: Response, next: NextFunction) {
        //Check that tenantId exists in the headers of the request
        const tenantId = req.headers[CustomHeader.X_TENANT_ID]?.toString();
        this.logger.debug(`TenantsMiddleware Tenant: ${tenantId}`);
        if (!tenantId) {
            throw new RequestInvalidError('X-TENANT-ID not provided');
        }
        const tenantExits = await this.tenantRepository.findOne({ tenantId });
        if (!tenantExits) {
            throw new NotFoundError('Tenant does not exist');
        }
        this.logger.debug(`TenantsMiddleware db: ${tenantExits.dbName}`);
        req.headers[CustomHeader.X_DB_NAME] = tenantExits.dbName;
        next();
    }
}
