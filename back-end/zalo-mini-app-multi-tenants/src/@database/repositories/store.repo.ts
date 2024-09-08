import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Store } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class StoreRepository extends GenericRepository<Store> {
    private readonly context = StoreRepository.name;

    constructor(
        @Inject(MongoDbConstants.StoreCollection)
        private readonly storeModel: Model<Store>,
        private readonly configService: ConfigService,
    ) {
        super(storeModel);
    }
}
