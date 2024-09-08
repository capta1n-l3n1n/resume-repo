import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseService {
    private readonly defaultPath = 'employees';

    constructor(http: HttpClient) {
        super(http);
    }

    getEmployees(
        path: string = '',
        limit: number | string = '',
        offset: number | string = '',
    ): Observable<any> {
        return this.getData(
            `${this.defaultPath}/${path}?limit=${limit}&offset=${offset}`,
        );
    }
    createEmployee(data: any): Observable<any> {
        return this.postData(`${this.defaultPath}/create`, data);
    }
    updateEmployee(id: string, data: any): Observable<any> {
        return this.postData(`${this.defaultPath}/update/${id}`, data);
    }

    searchEmployees(
        q: string = '',
        limit: number | string = '',
        offset: number | string = '',
        sort: string = '',
    ): Observable<any> {
        return this.getData(
            `${this.defaultPath}/search?q=${q}&limit=${limit}&offset=${offset}&sort=${sort}`,
        );
    }
}
