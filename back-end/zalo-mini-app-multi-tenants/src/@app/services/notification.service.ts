import { PaginationRequest } from '@app/models/pagination';
import { CreateNotificationDto, UpdateNotificationDto } from '@app/models/request';
import { NotificationRepository } from '@database/repositories';
import { BcError } from '@errors/error-base';
import { errorCode } from '@errors/error-message';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    constructor(private readonly notificationRepository: NotificationRepository) { }


    async findAllForApp(appId: string) {
        return await this.notificationRepository.findAllForApp(appId);
    }
    async findAllWithPagination(request: PaginationRequest, appId: string) {
        request.query['appId'] = appId
        return await this.notificationRepository.findWithPagination(request);
    }
    async getTotalUnread(appId: string) {
        return { totalUnread: (await this.notificationRepository.findAll({ appId, isRead: false })).length || 0 };
    }
    async getByPhone(request: PaginationRequest, phone: string, appId: string) {
        request.query['appId'] = appId
        request.query['receiver'] = phone
        return await this.notificationRepository.findWithPagination(request);
    }

    async create(requestBody: CreateNotificationDto, appId: string) {
        const { message, receiver, sender, isRead } = requestBody
        const newNotification = {
            message,
            receiver,
            sender,
            isRead,
            appId,
            createdAt: Date.now(),
        };
        return await this.notificationRepository.create(newNotification);
    }
    async update(id: string, requestBody: UpdateNotificationDto, appId: string) {
        const { isRead, message, updatedBy } = requestBody
        const body = {
            isRead,
            message,
            updatedBy,
            updatedAt: Date.now()
        }
        const isValid = await this.notificationRepository.updateOne({ id, appId }, body);
        if (!isValid) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID)
        }
        return {
            notification: isValid,
            message: "Notification has been successfully updated."
        }
    }


    async updateReadAll(appId: string, updatedBy: string) {
        const updateBody = {
            isRead: true,
            updatedBy,
            updatedAt: Date.now()
        };
        const filter = {
            appId,
            createdAt: { $lte: Date.now() }
        }
        const result = await this.notificationRepository.updateMany(filter, { $set: updateBody });
        return { message: `${result.modifiedCount} notifications have been successfully updated.` }
    }

    async updateReadAllForReceiver(appId: string, receiver: string, updatedBy: string) {
        const updateBody = {
            isRead: true,
            updatedBy,
            updatedAt: Date.now()
        };
        const filter = {
            appId,
            receiver,
            createdAt: { $lte: Date.now() }
        }
        const result = await this.notificationRepository.updateMany(filter, { $set: updateBody });
        return { message: `${result.modifiedCount} notifications have been successfully updated.` }
    }

}
