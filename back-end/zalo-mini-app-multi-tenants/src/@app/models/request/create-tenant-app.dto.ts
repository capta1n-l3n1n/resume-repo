import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppInfoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly displayName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly config: string;
}
