import { CustomHeader } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { XYZCheckInOutDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { XYZService } from '@app/services';
import { Body, Controller, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('XYZ')
@Controller('XYZ')
export class XYZController {
    constructor(private readonly XYZService: XYZService) { }

    @UseGuards(AppAuthGuard)
    @Get('logs')
    async getActivities(
        @Query('month') month: number,
        @Query('year') year: number,
        @Query('employeeId') employeeId: string,
        @Query('storeId') storeId: string,
    ): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.XYZService.findAllActivities(month, year, employeeId, storeId));
    }

    @UseGuards(AppAuthGuard)
    @Post('v1/check-in')
    async checkInV1(@Headers(CustomHeader.X_APP_ID) appId: string, @Body() body: XYZCheckInOutDto, @Headers(CustomHeader.USER_AGENT) userAgent: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.XYZService.checkInV1(appId, body, userAgent));
    }

    /** Admin session */
    @UseGuards(AppAuthGuard)
    @Get('logs/:logId')
    async getLogById(@Param('logId') logId: string): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.XYZService.getLogbyId(logId));
    }
}
