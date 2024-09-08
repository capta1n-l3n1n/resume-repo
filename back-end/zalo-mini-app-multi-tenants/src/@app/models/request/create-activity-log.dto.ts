import { Activity } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateActivityLogDto {
    @ApiProperty({ description: 'Phone number associated with the activity log' })
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty({ description: 'Activity type', enum: Activity })
    @IsEnum(Activity)
    @IsNotEmpty()
    readonly activity: Activity;

    @ApiProperty({ description: 'Voucher code' })
    @IsString()
    @IsOptional()
    readonly voucherCode?: string;

    @ApiProperty({ description: 'evidence' })
    @IsObject()
    @IsOptional()
    readonly evidence?: object;
}
