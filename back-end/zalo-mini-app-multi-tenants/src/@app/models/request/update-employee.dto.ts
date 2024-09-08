import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {

    @ApiProperty({ description: 'Employee name' })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiProperty({ description: 'Employee phone' })
    @IsString()
    @IsOptional()
    readonly phone?: string;

    @ApiProperty({ description: 'Employee  device id' })
    @IsString()
    @IsOptional()
    readonly deviceId?: string;

    @ApiProperty({ description: 'Employee working store id' })
    @IsString()
    @IsOptional()
    readonly storeId?: string;

    @ApiProperty({ description: 'Updated by?' })
    @IsString()
    @IsOptional()
    readonly updatedBy?: string;
}
