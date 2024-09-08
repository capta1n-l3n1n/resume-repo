import { CustomHeader, getPositionJson } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { PaginationRequest } from '@app/models/pagination';
import { CreateEmployeeDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { EmployeeService } from '@app/services';
import { PaginationPipe } from '@app/shared/pipes';
import { Body, Controller, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @UseGuards(AppAuthGuard)
    @Get('/all')
    async findAll(): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.findAll());
    }

    @Get('positions')
    async getPosition(): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(getPositionJson());
    }

    @Get()
    async findWithPagination(@Query(new PaginationPipe()) request: PaginationRequest): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.findAllWithPaginationExtStore(request));
    }

    @UseGuards(AppAuthGuard)
    @Get('search')
    async search(@Query(new PaginationPipe()) request: PaginationRequest, @Query('q') searchTerm: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.findSpecificWithPagination(request, searchTerm));
    }

    @UseGuards(AppAuthGuard)
    @Post('create')
    async create(@Body() requestBody: CreateEmployeeDto): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.create(requestBody));
    }

    @UseGuards(AppAuthGuard)
    @Post('update/:id')
    async update(@Body() requestBody: CreateEmployeeDto, @Param('id') id: string): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.update(requestBody, id));
    }

    @UseGuards(AppAuthGuard)
    @Post('/delete/:id')
    async delete(@Param('id') id: string, @Query('deletedBy') deletedBy?: string): Promise<any> {
        const requestQuery = { id, deletedBy };
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.delete(requestQuery));
    }

    @UseGuards(AppAuthGuard)
    @Get('/:phone')
    async getEmployeeByPhone(@Param('phone') phone: string): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.employeeService.findByPhone(phone));
    }
}
