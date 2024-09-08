import { CustomHeader } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { CreateSettingDto, IAppInfoDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { SettingsService } from '@app/services';
import { CustomValidationPipe } from '@app/shared/pipes';
import { Controller, Post, Body, Headers, Get, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App settings')
@Controller('app-settings')
export class SettingsController {
    constructor(private readonly SettingsService: SettingsService) {}

    @UseGuards(AppAuthGuard)
    @Post()
    async createOrUpdate(@Headers(CustomHeader.X_APP_INFO) appInfo: IAppInfoDto, @Body(CustomValidationPipe) body: CreateSettingDto): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.SettingsService.createOrUpdate(body, appInfo));
    }

    @UseGuards(AppAuthGuard)
    @Get()
    async getSetting(@Headers(CustomHeader.X_APP_INFO) appInfo: IAppInfoDto, @Query('v', ParseIntPipe) v: number): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.SettingsService.findOne(appInfo, v));
    }
}
