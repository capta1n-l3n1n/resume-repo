import { PaginationRequest, PaginationResponse } from '@app/models/pagination';
import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { Ticket } from '@database/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TicketRepository extends GenericRepository<Ticket> {
    private readonly context = TicketRepository.name;

    constructor(
        @Inject(MongoDbConstants.TicketCollection)
        private readonly ticketModel: Model<Ticket>,
        private readonly configService: ConfigService,
    ) {
        super(ticketModel);
    }

    async findTicketEmployeeStoreWithPaginator(request: PaginationRequest) {
        const { query, offset, limit, sort } = request;

        const items = await this.ticketModel
            .aggregate([
                {
                    $match: query,
                },
                {
                    $lookup: {
                        from: MongoDbConstants.EmployeeCollection,
                        localField: 'phone',
                        foreignField: 'phone',
                        as: 'employee',
                    },
                },
                {
                    $unwind: '$employee',
                },
                {
                    $lookup: {
                        from: MongoDbConstants.StoreCollection,
                        localField: 'employee.storeId',
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
                        employee: { _id: 0 },
                        store: { _id: 0 },
                    },
                },
            ])
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .exec();

        const total = await this.ticketModel.countDocuments(query).exec();

        return new PaginationResponse({
            total,
            items,
            offset,
            limit,
            sort,
        });
    }
}
