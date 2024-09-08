import { ResponseModel } from '@app/models/response';
import { GeocodeService } from '@app/services';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Geocode')
@Controller('map')
export class GeocodeController {
    constructor(private readonly googleMapsService: GeocodeService) {}

    @Get('geocode')
    async get(@Query('address') address: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.googleMapsService.getGeocode(address));
    }

    @Get('reverse')
    async reverse(@Query('lat') lat: number, @Query('lng') lng: number) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.googleMapsService.reverse(lat, lng));
    }
}
