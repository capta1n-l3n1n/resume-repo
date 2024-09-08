import { AppAuthGuard } from '@app/guards';
import { PaginationRequest } from '@app/models/pagination';
import { CreateTicketDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { TicketService } from '@app/services';
import { PaginationPipe } from '@app/shared/pipes';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket')
@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @UseGuards(AppAuthGuard)
    @Get('pagination')
    async findAllWithPagination(@Query(new PaginationPipe()) request: PaginationRequest): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.ticketService.findWithPagination(request));
    }

    @UseGuards(AppAuthGuard)
    @Post()
    @ApiBody({ type: CreateTicketDto })
    async createOrUpdate(@Body() body: CreateTicketDto) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.ticketService.createTicket(body));
    }

    @UseGuards(AppAuthGuard)
    @Put('approve/:ticketId')
    @ApiBody({ type: CreateTicketDto })
    async approveTicket(@Param('ticketId') ticketId: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.ticketService.approveTicket(ticketId));
    }

    @UseGuards(AppAuthGuard)
    @Put('reject/:ticketId')
    @ApiBody({ type: CreateTicketDto })
    async rejectTicket(@Param('ticketId') ticketId: string, @Body('reason') reason: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.ticketService.rejectTicket(ticketId, reason));
    }
}
