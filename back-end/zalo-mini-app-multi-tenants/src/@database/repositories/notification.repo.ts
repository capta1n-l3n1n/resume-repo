import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Notification } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class NotificationRepository extends GenericRepository<Notification> {
  constructor(
    @Inject(MongoDbConstants.NotificationCollection)
    private readonly notificationModel: Model<Notification>,
    private readonly configService: ConfigService,
  ) {
    super(notificationModel);
  }
  async findAllForApp(appId: string) {
    return await this.notificationModel.find({ appId }).skip(0).limit(100).sort({ logAt: -1 }).exec();
  }
}
