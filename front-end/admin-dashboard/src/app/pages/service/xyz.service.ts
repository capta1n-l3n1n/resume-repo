import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class xyzService extends BaseService {
    private readonly defaultPath = 'xyz';

    constructor(http: HttpClient) {
        super(http);
    }

    getLogById(id: string): Observable<any> {
        return this.getData(`${this.defaultPath}/logs/${id}`);
    }
    getActivitieLogs(
        month: string = '',
        year: string = '',
        employeeId: string = '',
        storeId: string = '',
    ): Observable<any> {
        const query = [
            month ? `month=${month}` : '',
            year ? `year=${year}` : '',
            storeId ? `storeId=${storeId}` : '',
            employeeId ? `employeeId=${employeeId}` : ''
        ];
        const queryStr = query.filter(q => q !== '').join('&');
        return this.getData(
            `${this.defaultPath}/logs/?${queryStr}`,
        );
    }
}
