import { EmployeePosition } from '@app/enums';
import { PaginationRequest } from '@app/models/pagination';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@app/models/request';
import { ObjectHelper, StringHelper } from '@app/shared/helpers';
import { EmployeeRepository, StoreRepository } from '@database/repositories';
import { BcError } from '@errors/error-base';
import { errorCode } from '@errors/error-message';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmployeeService {
    private readonly logger = new Logger(EmployeeService.name);
    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly storeRepository: StoreRepository,
    ) {}

    async findAllWithPagination(request: PaginationRequest) {
        request.query = {
            $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
        };
        return await this.employeeRepository.findWithPagination(request);
    }

    async findAllWithPaginationExtStore(request: PaginationRequest) {
        request.query = {
            $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
        };
        const employees = await this.employeeRepository.findWithPagination(request);
        return this.mapStoreToEmployee(employees);
    }

    async mapStoreToEmployee(employees) {
        const stores = await this.storeRepository.findAll();
        const storeMap = new Map<string, any>();
        stores.forEach(store => storeMap.set(store.id, store));
        employees.items = employees.items.map(employee => {
            // Convert Mongoose document to plain object
            const employeeObj = employee.toObject ? employee.toObject() : employee;
            const { name, address, lat, lng, id } = storeMap.get(employeeObj.storeId);
            return { ...employeeObj, store: { name, address, lat, lng, id } };
        });
        return employees;
    }

    async create(body: CreateEmployeeDto) {
        const storeId = await this.storeRepository.findOne({ id: body.storeId });
        if (!storeId) {
            throw new BcError(errorCode.SYS_ERR.NOT_FOUND, 'store');
        }
        if (body.managerId) {
            const manager = await this.employeeRepository.findOne({ id: body.managerId });
            throw new BcError(errorCode.SYS_ERR.NOT_FOUND, 'manager');
        }
        const data = {
            ...ObjectHelper.extractJustData(body, CreateEmployeeDto),
            position: EmployeePosition[body.position],
            positionLevel: body.position,
        };
        console.log('data', data);
        // return await this.employeeRepository.create(newEmployee);
    }

    async update(requestBody: UpdateEmployeeDto, id: string) {
        const { name, phone, deviceId, storeId, updatedBy } = requestBody;
        let validStore = null;
        if (storeId) {
            validStore = await this.storeRepository.findOne({ id: storeId });
        }
        if (!validStore) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID);
        }
        const body = {
            name,
            phone,
            deviceId,
            storeId,
            updatedBy,
            updatedAt: Date.now(),
        };
        const isValid = await this.employeeRepository.updateOne({ id }, body);
        if (!isValid) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID);
        }
        return {
            store: isValid,
            isUpdated: true,
            message: 'Employee has been successfully updated.',
        };
    }

    async delete(requestQuery: any) {
        const { id, deletedBy } = requestQuery;
        const deleteEmployee = {
            deletedBy,
            deletedAt: Date.now(),
        };
        const isValid = await this.employeeRepository.updateOne({ id }, deleteEmployee);
        if (!isValid) {
            throw new BcError(errorCode.ZALO_APP_ERR.INVALID_ID);
        }
        return {
            message: 'Employee has been successfully deleted.',
        };
    }
    async findAll() {
        return await this.employeeRepository.findAll();
    }

    async findByPhone(phone: string) {
        return await this.employeeRepository.findOne({ phone });
    }

    async findEmployeeStoreWithPaginator(request: PaginationRequest) {
        return await this.employeeRepository.findEmployeeStoreWithPaginator(request);
    }

    async findSpecificWithPagination(request: PaginationRequest, searchTerm: string) {
        const query: any = {};
        if (!StringHelper.isEmpty(searchTerm)) {
            query['$and'] = [
                {
                    $or: [{ $text: { $search: `"${searchTerm}"` } }, { phone: { $regex: searchTerm, $options: 'i' } }],
                },
                {
                    $or: [{ deletedAt: { $exists: false } }, { deletedAt: null }],
                },
            ];
        }
        request.query = query;
        const employees = await this.employeeRepository.findWithPagination(request);
        return this.mapStoreToEmployee(employees);
    }
}
