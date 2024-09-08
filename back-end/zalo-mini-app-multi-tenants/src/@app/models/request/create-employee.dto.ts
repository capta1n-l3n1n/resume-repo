import { EmployeePosition } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Employee name' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: 'Employee phone' })
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty({ description: 'Employee device id' })
    @IsString()
    @IsOptional()
    readonly deviceId?: string;

    @ApiProperty({ description: 'Employee working store id' })
    @IsString()
    @IsNotEmpty()
    readonly storeId: string;

    @ApiProperty({ description: 'Position' })
    @IsEnum(EmployeePosition)
    @IsNotEmpty()
    readonly position: EmployeePosition;

    @ApiProperty({ description: 'Manager id' })
    @IsString()
    @IsNotEmpty()
    readonly managerId: string;
}
