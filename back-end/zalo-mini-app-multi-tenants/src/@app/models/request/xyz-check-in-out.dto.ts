import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class XYZCheckInOutDto {
    @ApiProperty({ description: 'Phone number associated with the activity log' })
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty({ description: 'lat' })
    @IsLatitude()
    @IsNotEmpty()
    readonly lat: number;

    @ApiProperty({ description: 'lng' })
    @IsLongitude()
    @IsNotEmpty()
    readonly lng: number;

    @ApiProperty({ description: 'storeId' })
    @IsString()
    @IsNotEmpty()
    readonly storeId: string;

    @ApiProperty({ description: 'imageData' })
    @IsString()
    @IsOptional()
    imageData: string;

    @ApiProperty({ description: 'imageHeight' })
    @IsNumber()
    @IsOptional()
    imageHeight: number = 485;

    @ApiProperty({ description: 'imageWidth' })
    @IsNumber()
    @IsOptional()
    imageWidth: number = 364;

    @ApiProperty({ description: 'note' })
    @IsString()
    @IsOptional()
    readonly note: string;
}
