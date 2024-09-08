import { Activity } from '@app/enums';
import { XYZCheckInOutDto } from '@app/models/request';
import { ImageHelper } from '@app/shared/helpers';
import { ActivityLogRepository, StoreRepository } from '@database/repositories';
import { BcError, NotFoundError, RequestInvalidError } from '@errors/error-base';
import { errorCode } from '@errors/index';
import { Injectable, Logger } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { GeocodeService } from './geo-code.service';

@Injectable()
export class XYZService {
    private readonly logger = new Logger(XYZService.name);
    private readonly ALLOW_DISTANCE = 50;
    private readonly TIMEZONE_DEFAULT = 'Asia/Ho_Chi_Minh';

    constructor(
        private readonly activityLogRepository: ActivityLogRepository,
        private readonly activityLogService: ActivityLogService,
        private readonly geocodeService: GeocodeService,
        private readonly storeRepository: StoreRepository,
    ) { }

    async findAllActivities(
        month?: number,
        year?: number,
        employeeId: string = null,
        storeId: string = null
    ) {
        return await this.activityLogRepository.findAllActivitiesForTimeTracking(month, year, employeeId, storeId);
    }

    async checkInV1(appId: string, body: XYZCheckInOutDto, userAgent: string) {
        this.logger.debug(`checkIn: phone(${body.phone}), position: [${body.lat}, ${body.lng}], storeId: ${body.storeId}`);
        const store = await this.storeRepository.findOne({ id: body.storeId });
        if (!store) {
            throw new BcError(errorCode.ZALO_APP_ERR.STORE_NOT_FOUND);
        }
        const distance = await this.geocodeService.calculateDistance(body.lat, body.lng, store.lat, store.lng);
        this.logger.debug(`checkIn with distance: ${distance}`);
        if (distance > this.ALLOW_DISTANCE) {
            throw new BcError(errorCode.ZALO_APP_ERR.XYZ_CHECK_IN_OUT_DISTANCE);
        }
        const infoImage = ImageHelper.extractImageBase64(body.imageData);
        if (!infoImage) {
            throw new RequestInvalidError('Image invalid');
        }
        const { format, base64 } = infoImage;
        const watermask = ImageHelper.genTextWatermarkSvg(body.imageWidth, body.imageHeight, [
            `Position: ${body.lat}/${body.lng}`,
            `${new Date().toLocaleString('en-US', { timeZone: this.TIMEZONE_DEFAULT })}`,
            `${userAgent}`,
        ]);
        const originImage = Buffer.from(base64, 'base64');
        const finalImage = await ImageHelper.addWatermaskOnImage(originImage, watermask);
        const imageData = ImageHelper.genImageBase64Str(finalImage, format);
        const address = await this.geocodeService.reverse(body.lat, body.lng);
        return await this.activityLogService.create(
            {
                phone: body.phone,
                activity: Activity.CHECK_IN,
                evidence: {
                    lat: body.lat,
                    lng: body.lng,
                    address,
                    storeId: body.storeId,
                    storeName: store.name,
                    storeAddress: store.address,
                    photo: imageData,
                    userAgent,
                    note: body.note,
                },
            },
            appId,
        );
    }

    async getLogbyId(logId: string) {
        const log = await this.activityLogService.findById(logId);
        if (!log) {
            throw new NotFoundError('logId not found');
        }
        return log.evidence;
    }
}
