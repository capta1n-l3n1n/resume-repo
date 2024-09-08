import { PaginationRequest, PaginationResponse } from '@app/models/pagination';
import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Employee } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeRepository extends GenericRepository<Employee> {
    private readonly context = EmployeeRepository.name;

    constructor(
        @Inject(MongoDbConstants.EmployeeCollection)
        private readonly employeeModel: Model<Employee>,
        private readonly configService: ConfigService,
    ) {
        super(employeeModel);
    }

    async findEmployeeStoreWithPaginator(request: PaginationRequest) {
        request.query = {
            $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
        };
        request.sort = { ...request.sort, name: 1 };

        const { query, offset, limit, sort } = request;

        const items = await this.employeeModel
            .aggregate([
                {
                    $match: query,
                },
                {
                    $lookup: {
                        from: 'zalo_app_stores',
                        localField: 'storeId',
                        foreignField: 'id',
                        as: 'store',
                    },
                },
                {
                    $unwind: '$store',
                },

                {
                    $project: {
                        _id: 0,
                        store: { _id: 0 },
                    },
                },
            ])
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec();

        const total = await this.employeeModel.countDocuments(query).exec();

        return new PaginationResponse({
            total,
            items,
            offset,
            limit,
            sort,
        });
    }
}
