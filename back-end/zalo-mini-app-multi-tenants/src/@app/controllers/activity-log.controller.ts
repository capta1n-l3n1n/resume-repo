import { CustomHeader } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { CreateActivityLogDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { ActivityLogService } from '@app/services';
import { Body, Controller, Get, Post, UseGuards, Headers, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Activity logs')
@Controller('activities')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) {}

    @UseGuards(AppAuthGuard)
    @Get('/:phone')
    async getActivitiesByPhone(@Headers(CustomHeader.X_APP_ID) appId: string, @Param('phone') phone: string): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.activityLogService.findAllForApp(appId, phone));
    }

    @UseGuards(AppAuthGuard)
    @Post()
    @ApiBody({ type: CreateActivityLogDto })
    async create(@Headers(CustomHeader.X_APP_ID) appId: string, @Body() requestBody: CreateActivityLogDto) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.activityLogService.create(requestBody, appId));
    }
}
