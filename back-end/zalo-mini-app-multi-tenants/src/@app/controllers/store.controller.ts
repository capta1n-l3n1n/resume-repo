import { AppAuthGuard } from '@app/guards';
import { PaginationRequest } from '@app/models/pagination';
import { CreateStoreDto, UpdateStoreDto } from '@app/models/request';
import { ResponseModel } from '@app/models/response';
import { StoreService } from '@app/services';
import { CustomValidationPipe, PaginationPipe } from '@app/shared/pipes';
import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Store')
@Controller('stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) { }
    @UseGuards(AppAuthGuard)
    @Get()
    async getStore(): Promise<any> {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.storeService.findAll());
    }

    @UseGuards(AppAuthGuard)
    @Get('/search')
    async search(@Query(new PaginationPipe()) request: PaginationRequest, @Query('q') searchTerm: string) {
        return this.storeService.findSpecificWithPagination(request, searchTerm);
    }

    @Post()
    async createStore(@Body(CustomValidationPipe) body: CreateStoreDto) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.storeService.create(body));
    }

    @Post('/update/:id')
    async updateStore(@Body(CustomValidationPipe) body: UpdateStoreDto, @Param('id') id: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.storeService.update(body, id));
    }

    @Post('/delete/:id')
    async deleteStore(@Param('id') id: string, @Query('deletedBy') deletedBy?: string) {
        const requestQuery = { id, deletedBy };
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.storeService.delete(requestQuery));
    }
}
