import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
    @ApiProperty({ description: 'Notification message content' })
    @IsString()
    @IsNotEmpty()
    readonly message: string;

    @ApiProperty({ description: 'Notification sender' })
    @IsString()
    @IsNotEmpty()
    readonly sender: string;

    @ApiProperty({ description: 'Notification receiver' })
    @IsString()
    @IsNotEmpty()
    readonly receiver: string;

    @ApiProperty({ description: 'Notification is read?' })
    @IsBoolean()
    @IsOptional()
    readonly isRead?: boolean;
}
