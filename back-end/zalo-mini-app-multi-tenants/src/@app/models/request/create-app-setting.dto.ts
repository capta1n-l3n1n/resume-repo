import { IsNumber, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSettingDto {
    @IsOptional()
    @Type(() => Object)
    setting?: Object;

    @IsNumber()
    @IsNotEmpty()
    version: number;
}
