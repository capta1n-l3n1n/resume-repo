import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
    @ApiProperty({ description: 'Store name' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'Store address' })
    @IsString()
    @IsNotEmpty()
    readonly address: string;
}
