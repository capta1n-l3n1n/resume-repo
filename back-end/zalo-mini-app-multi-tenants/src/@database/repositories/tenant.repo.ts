import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Store, Tenant } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TenantRepository extends GenericRepository<Tenant> {
    private readonly context = TenantRepository.name;

    constructor(
        @Inject(MongoDbConstants.TenantCollection)
        private readonly tenantModel: Model<Tenant>,
        private readonly configService: ConfigService,
    ) {
        super(tenantModel);
    }
}
