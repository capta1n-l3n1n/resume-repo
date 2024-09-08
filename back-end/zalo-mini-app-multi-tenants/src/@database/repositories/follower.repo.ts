import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Follower } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FollowerRepository extends GenericRepository<Follower> {
    private readonly context = FollowerRepository.name;

    constructor(
        @Inject(MongoDbConstants.FollowerCollection)
        private readonly followerModel: Model<Follower>,
        private readonly configService: ConfigService,
    ) {
        super(followerModel);
    }
}
