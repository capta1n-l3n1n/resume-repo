import { CreateStoreDto, UpdateStoreDto } from '@app/models/request';
import { StoreRepository } from '@database/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { GeocodeService } from './geo-code.service';
import { PaginationRequest } from '@app/models/pagination';
import { BcError } from '@errors/error-base';
import { errorCode } from '@errors/error-message';
import { StringHelper } from '@app/shared/helpers';

@Injectable()
export class StoreService {
    private readonly logger = new Logger(StoreService.name);
    public constructor(
        private readonly storeRepository: StoreRepository,
        private readonly geocodeService: GeocodeService,
    ) { }

    async findAll() {
        const query = {
            $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
        }
        return await this.storeRepository.findAll(query);
    }

    async findSpecificWithPagination(request: PaginationRequest, searchTerm: string) {
        const query: any = {};
        if (!StringHelper.isEmpty(searchTerm)) {
            query['$and'] = [
                {
                    $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { address: { $regex: searchTerm, $options: 'i' } }],
                },
                {
                    $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
                },
            ];
        }
        request.query = query;
        return await this.storeRepository.findWithPagination(request);
    }

    async create(requestBody: CreateStoreDto) {
        const { address, name } = requestBody;
        const { lat, lng } = await this.geocodeService.getGeocode(requestBody.address);
        const newStore = {
            address,
            name,
            lat,
            lng,
        };
        this.logger.debug(newStore);
        return await this.storeRepository.create(newStore);
    }

    async update(requestBody: UpdateStoreDto, id: string) {
        const { address, name, lat, lng, updatedBy } = requestBody;
        const body = {
            address,
            name,
            lat,
            lng,
            updatedBy,
            updatedAt: Date.now(),
        };
        const isValid = await this.storeRepository.updateOne({ id }, body);
        if (!isValid) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID);
        }
        return {
            store: isValid,
            isUpdated: true,
            message: 'Store has been successfully updated.',
        };
    }
    async delete(requestQuery: any) {
        const { id, deletedBy } = requestQuery;
        const deleteStore = {
            deletedBy,
            deletedAt: Date.now(),
        };
        const isValid = await this.storeRepository.updateOne({ id }, deleteStore);
        if (!isValid) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID);
        }
        return {
            message: 'Store has been successfully deleted.',
        };
    }
}
