import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
    @ApiProperty({ description: 'Notification message content' })
    @IsString()
    @IsOptional()
    readonly message?: string;

    @ApiProperty({ description: 'Notification is read?' })
    @IsBoolean()
    @IsOptional()
    readonly isRead?: boolean;
    @ApiProperty({ description: 'Updated by?' })
    @IsString()
    @IsOptional()
    readonly updatedBy?: string;
}
