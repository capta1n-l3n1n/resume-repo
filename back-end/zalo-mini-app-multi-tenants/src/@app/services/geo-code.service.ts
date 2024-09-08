import { AsyncHelper } from '@app/shared/helpers';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GeocodeService {
    private readonly logger = new Logger(GeocodeService.name);
    public constructor(private readonly httpService: HttpService) {}

    calculateDistance(lat1: number = 10.7818634, lon1: number = 106.6784919, lat2: number = 10.7818634, lon2: number = 106.6784919): number {
        this.logger.debug(`[${lat1}, ${lon1}] - [${lat2}, ${lon2}]`);
        const radius = 6371000; // Radius of the Earth in meters
        const latDistance = this.deg2rad(lat2 - lat1);
        const lonDistance = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = Math.floor(radius * c); // Distance in meters
        this.logger.debug('Distance:', distance);

        return distance;
    }

    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    async reverse(lat: number, lng: number) {
        await AsyncHelper.delay(1000); //limit rate 1 req/s
        const { data } = await lastValueFrom(this.httpService.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`));
        return data.display_name;
    }

    async getGeocode(address: string) {
        await AsyncHelper.delay(1000);
        const { data } = await lastValueFrom(this.httpService.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`));
        return { lat: data[0].lat, lng: data[0].lon };
    }
}
