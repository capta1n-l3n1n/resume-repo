import { CreateAppInfoDto } from '@app/models/request';
import { AppInfoService } from './../services/tenant-app.service';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tenant App')
@Controller('tenant-apps')
export class AppInfoController {
    constructor(private readonly AppInfoService: AppInfoService) {}

    // @Get()
    // async getAppInfos(): Promise<any> {
    //   return await this.AppInfoService.getAll();
    // }

    // @Post()
    // async createAppInfo(@Body() request: CreateAppInfoDto) {
    //   return await this.AppInfoService.create(request);
    // }
}
