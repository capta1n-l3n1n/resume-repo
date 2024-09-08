import { CustomHeader } from '@app/enums';
import { AppAuthGuard } from '@app/guards';
import { IAppInfoDto } from '@app/models/request';
import { ICustomerItemDTO, ResponseModel } from '@app/models/response';
import { AppService, CustomerElasticService } from '@app/services';
import { AppInfoRepository } from '@database/repositories';
import { Controller, Get, Param, Post, Headers, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
    constructor(
        private readonly customerElasticService: CustomerElasticService,
        private readonly appService: AppService,
        private readonly appInfoRepository: AppInfoRepository,
    ) {}

    @UseGuards(AppAuthGuard)
    @Get('customers/:phone')
    async getCustomerByPhone(@Headers(CustomHeader.X_APP_INFO) appInfo: IAppInfoDto, @Param('phone') phone: string) {
        const response: ResponseModel = new ResponseModel();
        if (phone == '0569103769') {
            response.setData({
                name: 'Zalo Tester',
                birthday: null,
                age: null,
                gender: 'No Info',
                phone: '0813389997',
                level: 'Member',
                points: 0,
                totalBills: 0,
                totalPayment: 0,
                createdDate: '2024-07-02T00:00:00.000Z',
                address: 'No Info',
                city: 'HCM',
                district: '7',
                billArray: [],
                rewardPointsHistory: [],
                vouchers: [],
                isFollow: false,
            });
            return response;
        }
        if (phone == '0962428440') {
            response.setData({
                name: 'Lương Sỹ Bảo',
                birthday: null,
                age: null,
                gender: 'No Info',
                phone: '0962428440',
                level: 'Member',
                points: 20380,
                totalBills: 1,
                totalPayment: 1019000,
                createdDate: '2023-11-07T00:00:00.000Z',
                address: '696 Chu Văn An, Thị Trấn Phú Mỹ, Phú Tân, An Giang, Việt Nam',
                city: 'An Giang',
                district: 'Huyện Phú Tân',
                billArray: [
                    {
                        id: 344435,
                        createdDate: '2024-06-13T13:24:52.000Z',
                        contentReview: null,
                        orderId: 391796058,
                        totalAmount: 1019000,
                        typeName: 'Xuất',
                    },
                    {
                        id: 34443511,
                        createdDate: '2024-06-13T13:24:52.000Z',
                        contentReview: null,
                        orderId: 391796058,
                        totalAmount: 1019000,
                        typeName: 'Xuất',
                    },
                    {
                        id: 34443115,
                        createdDate: '2024-06-13T13:24:52.000Z',
                        contentReview: null,
                        orderId: 391796058,
                        totalAmount: 1019000,
                        typeName: 'Nhập',
                    },
                ],
                rewardPointsHistory: [
                    {
                        points: 20380,
                        totalPoints: 20380,
                        usedPoints: 0,
                        eventType: 'Xuất',
                        entityName: 344435,
                        createdDate: '2024-06-13T13:24:52.000Z',
                    },
                    {
                        points: 20381,
                        totalPoints: 20381111,
                        usedPoints: 0,
                        eventType: 'Nhập',
                        entityName: 3441435,
                        createdDate: '2024-06-13T13:24:52.000Z',
                    },
                ],
                vouchers: [
                    {
                        code: 'I18H7589',
                        discountType: 'price',
                        endAt: '2024-07-14T23:59:59.000Z',
                        isUsed: false,
                        minimumOrderAmount: 0,
                        value: 100000,
                    },
                ],
                isFollow: false,
                isFirstLogin: true,
            });
            return response;
        }
        const data: ICustomerItemDTO = await this.customerElasticService.searchByPhone(phone, appInfo);
        const isFollow: boolean = await this.appService.checkFollow(phone, appInfo.appId);
        const isFirstLogin: boolean = await this.appService.checkFistLogin(phone, appInfo.appId);
        return response.setData({
            ...data,
            isFollow,
            isFirstLogin,
        });
    }

    @UseGuards(AppAuthGuard)
    @Post('followers/:phone')
    async followApp(@Headers(CustomHeader.X_APP_ID) appId: string, @Param('phone') phone: string) {
        const response: ResponseModel = new ResponseModel();
        return response.setData(await this.appService.follow(phone, appId));
    }
}
