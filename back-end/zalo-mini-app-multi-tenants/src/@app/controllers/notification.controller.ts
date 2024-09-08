import { CustomHeader } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { PaginationRequest } from '@app/models/pagination';
import { CreateNotificationDto, UpdateNotificationDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { NotificationService } from '@app/services';
import { PaginationPipe } from '@app/shared/pipes';
import { Body, Controller, Get, Post, UseGuards, Headers, Param, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @UseGuards(AppAuthGuard)
    @Get('/all')
    async getAllForApp(@Headers(CustomHeader.X_APP_ID) appId: string): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.findAllForApp(appId));
    }
    @UseGuards(AppAuthGuard)
    @Get()
    async getAllWithPagination(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Query(new PaginationPipe()) request: PaginationRequest
    ): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.findAllWithPagination(request, appId));
    }




    @UseGuards(AppAuthGuard)
    @Get('/total-unread')
    async getTotalUnread(
        @Headers(CustomHeader.X_APP_ID) appId: string,
    ): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.getTotalUnread(appId));

    }

    @UseGuards(AppAuthGuard)
    @Post()
    @ApiBody({ type: CreateNotificationDto })
    async create(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Body() requestBody: CreateNotificationDto
    ) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.create(requestBody, appId));
    }

    @UseGuards(AppAuthGuard)
    @Post('/update-read-all/')
    @ApiBody({ type: UpdateNotificationDto })
    async updateReadAll(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Query('updatedBy') updatedBy: string,
    ) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.updateReadAll(appId, updatedBy));
    }
    @UseGuards(AppAuthGuard)
    @Post('/update-read-all/:receiver')
    @ApiBody({ type: UpdateNotificationDto })
    async updateReadAllForReceiver(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Query('updatedBy') updatedBy: string,
        @Param('receiver') receiver: string,
    ) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.updateReadAllForReceiver(appId, receiver, updatedBy));
    }

    @UseGuards(AppAuthGuard)
    @Post('/update/:id')
    @ApiBody({ type: UpdateNotificationDto })
    async update(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Param('id') id: string,
        @Body() requestBody: UpdateNotificationDto,
    ) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.update(id, requestBody, appId));
    }


    @UseGuards(AppAuthGuard)
    @Get('/:phone')
    async getByPhoneWithPagination(
        @Headers(CustomHeader.X_APP_ID) appId: string,
        @Param('phone') phone: string,
        @Query(new PaginationPipe()) request: PaginationRequest
    ): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.notificationService.getByPhone(request, phone, appId));
    }
}
