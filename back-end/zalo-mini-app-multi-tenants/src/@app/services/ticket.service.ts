import { TicketStatus } from '@app/enums';
import { PaginationRequest } from '@app/models/pagination';
import { CreateTicketDto } from '@app/models/request';
import { ObjectHelper } from '@app/shared/helpers';
import { TicketRepository } from '@database/repositories';
import { BcError, NotFoundError, RequestInvalidError } from '@errors/error-base';
import { errorCode } from '@errors/error-message';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TicketService {
    private readonly logger = new Logger(TicketService.name);
    public constructor(private readonly ticketRepository: TicketRepository) {}

    async findWithPagination(request: PaginationRequest) {
        request.query['$or'] = [{ deletedAt: { $exists: false } }, { deletedAt: null }];
        this.logger.log('Request query: ', request.query);
        return await this.ticketRepository.findTicketEmployeeStoreWithPaginator(request);
    }

    async createTicket(body: CreateTicketDto) {
        const data = ObjectHelper.extractJustData(CreateTicketDto, body);
        return await this.ticketRepository.create({
            ...data,
            status: TicketStatus.WAITING,
        });
    }

    async approveTicket(id: string) {
        const entity = await this.ticketRepository.findOne({ id });
        if (!entity) {
            throw new NotFoundError('Ticket id not found');
        }
        if (entity.status != TicketStatus.WAITING) {
            throw new RequestInvalidError('Status invalid');
        }
        return await this.ticketRepository.updateOne({ id }, { status: TicketStatus.APPROVED });
    }

    async rejectTicket(id: string, reason: string) {
        const entity = await this.ticketRepository.findOne({ id });
        if (!entity) {
            throw new NotFoundError('Ticket id not found');
        }
        if (entity.status != TicketStatus.WAITING) {
            throw new RequestInvalidError('Status invalid');
        }
        return await this.ticketRepository.updateOne({ id }, { status: TicketStatus.REJECTED, extData: { reason } });
    }
}
