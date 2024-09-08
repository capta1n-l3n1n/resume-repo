import { TicketType } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
    @ApiProperty({ description: 'phone' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly phone: string;

    @ApiProperty({ description: 'type' })
    @IsEnum(TicketType)
    @Expose()
    type: TicketType;

    @ApiProperty({ description: 'from date' })
    @IsDateString()
    @IsNotEmpty()
    @Expose()
    readonly fromDate: Date;

    @ApiProperty({ description: 'to date' })
    @IsDateString()
    @IsOptional()
    @Expose()
    readonly toDate: Date;

    @ApiProperty({ description: 'content' })
    @IsString()
    @IsOptional()
    @Expose()
    readonly content: string;
}
