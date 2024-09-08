import { ApiProperty } from '@nestjs/swagger';
import { IsLongitude, IsLatitude, IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
    @ApiProperty({ description: 'Store name' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiProperty({ description: 'Store address' })
    @IsString()
    @IsOptional()
    readonly address?: string;

    @ApiProperty({ description: 'Updated by?' })
    @IsString()
    @IsOptional()
    readonly updatedBy?: string;

    @ApiProperty({ description: 'Store latitude' })
    @IsString()
    @IsLatitude()
    @IsOptional()
    readonly lat?: number;

    @ApiProperty({ description: 'Store longtitude' })
    @IsString()
    @IsLongitude()
    @IsOptional()
    readonly lng?: number;
}
