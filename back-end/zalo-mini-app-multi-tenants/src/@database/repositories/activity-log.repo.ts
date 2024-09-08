import { Activity } from '@app/enums';
import { ConfigService } from '@app/shared/config-manager';
import { MongoDbConstants } from '@database/mongodb';
import { GenericRepository } from '@database/repositories/generic.repo';
import { ActivityLog } from '@database/schemas';
import { Inject, Injectable, Query } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ActivityLogRepository extends GenericRepository<ActivityLog> {
    private readonly context = ActivityLogRepository.name;

    constructor(
        @Inject(MongoDbConstants.ActivityCollection)
        private readonly activityLogModel: Model<ActivityLog>,
        private readonly configService: ConfigService,
    ) {
        super(activityLogModel);
    }


    async findAllActivitiesForTimeTracking(
        month?: number,
        year?: number,
        employeeId: string = null,
        storeId: string = null
    ) {
        // check month and year or default current month and year
        const currentDate = new Date();
        const effectiveMonth = !month ? currentDate.getMonth() : Number(month - 1);
        const effectiveYear = !year ? currentDate.getFullYear() : Number(year);

        //get month and year
        const startOfMonth = new Date(Date.UTC(effectiveYear, effectiveMonth, 1));
        const startOfNextMonth = new Date(Date.UTC(effectiveYear, effectiveMonth + 1, 1));

        const $match: any = {
            logDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth,
            },
        };
        if (employeeId) {
            $match['employeeId'] = employeeId;
        }
        if (storeId) {
            $match['storeId'] = storeId;
        }
        return await this.activityLogModel.aggregate([
            {
                $lookup: {
                    from: 'zalo_app_employees',
                    localField: 'phone',
                    foreignField: 'phone',
                    as: 'logEmployees',
                },
            },
            {
                $unwind: '$logEmployees',
            },
            {
                $lookup: {
                    from: 'zalo_app_stores',
                    localField: 'logEmployees.storeId',
                    foreignField: 'id',
                    as: 'storeDetails',
                },
            },
            {
                $unwind: '$storeDetails',
            },
            {
                $project: {
                    _id: 0,
                    employeeId: '$logEmployees.id',
                    employeeName: '$logEmployees.name',
                    storeId: '$logEmployees.storeId',
                    storeName: '$storeDetails.name',
                    logDate: '$logDate',
                    logDay: {
                        $dateToString: {
                            format: '%d/%m',
                            date: '$logDate',
                            timezone: 'Asia/Ho_Chi_Minh',
                        },
                    },
                    logAt: '$logAt',
                    activityId: '$id',
                },
            },
            {
                $match,
            },
            {
                $group: {
                    _id: {
                        employeeName: '$employeeName',
                        storeName: '$storeName',
                        logDay: '$logDay',
                    },
                    logs: {
                        $push: {
                            logDate: '$logDate',
                            activityId: '$activityId',
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $addFields: {
                    minLog: {
                        $min: '$logs.logDate',
                    },
                    maxLog: {
                        $max: '$logs.logDate',
                    },
                },
            },
            {
                $addFields: {
                    minActivityId: {
                        $arrayElemAt: [
                            '$logs.activityId',
                            {
                                $indexOfArray: ['$logs.logDate', '$minLog'],
                            },
                        ],
                    },
                    maxActivityId: {
                        $arrayElemAt: [
                            '$logs.activityId',
                            {
                                $indexOfArray: ['$logs.logDate', '$maxLog'],
                            },
                        ],
                    },
                },
            },
            {
                $addFields: {
                    minLogTime: {
                        $dateToString: {
                            format: '%H:%M',
                            date: '$minLog',
                            timezone: 'Asia/Ho_Chi_Minh',
                        },
                    },
                    maxLogTime: {
                        $cond: {
                            if: {
                                $gt: ['$count', 1],
                            },
                            then: {
                                $dateToString: {
                                    format: '%H:%M',
                                    date: '$maxLog',
                                    timezone: 'Asia/Ho_Chi_Minh',
                                },
                            },
                            else: '',
                        },
                    },
                    totalHours: {
                        $cond: {
                            if: {
                                $gt: ['$count', 1],
                            },
                            then: {
                                $divide: [
                                    {
                                        $subtract: ['$maxLog', '$minLog'],
                                    },
                                    3600000,
                                ],
                            },
                            else: 4,
                        },
                    },
                },
            },
            {
                $addFields: {
                    maxActivityId: {
                        $cond: {
                            if: { $eq: ['$maxLogTime', ''] },
                            then: '',
                            else: '$maxActivityId',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        employeeName: '$_id.employeeName',
                        storeName: '$_id.storeName',
                    },
                    totalDays: {
                        $sum: 1,
                    },
                    totalHours: {
                        $sum: '$totalHours',
                    },
                    logs: {
                        $push: {
                            logDay: '$_id.logDay',
                            logTime: {
                                minLog: '$minLogTime',
                                maxLog: '$maxLogTime',
                                minActivityId: '$minActivityId',
                                maxActivityId: '$maxActivityId',
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    employeeName: '$_id.employeeName',
                    storeName: '$_id.storeName',
                    totalDays: 1,
                    totalHours: 1,
                    logs: {
                        $arrayToObject: {
                            $map: {
                                input: {
                                    $sortArray: {
                                        input: '$logs',
                                        sortBy: {
                                            logDay: 1,
                                        },
                                    },
                                },
                                as: 'log',
                                in: {
                                    k: '$$log.logDay',
                                    v: '$$log.logTime',
                                },
                            },
                        },
                    },
                },
            },
        ]);
    }

    async findAllForAppByPhone(appId: string, phone: string) {
        return await this.activityLogModel.find({ appId, phone }).skip(0).limit(100).sort({ logAt: -1 }).exec();
    }
}
