import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PaginationRequest } from '@shared/models';
import { BaseApi } from '../base.api';

@Injectable({ providedIn: 'root' })
export class EmployeeApi extends BaseApi {
    private readonly url = `${environment.apiUrl}/employees`;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    async getPagination(req: PaginationRequest) {
        const response = await firstValueFrom(
            this.getData(`${this.url}/pagination`, req),
        );
        this.handleResStatusData(response);
        return response.data;
    }

    async create(data: any) {
        const response = await firstValueFrom(
            this.postData(`${this.url}/create`, data),
        );
        this.handleResStatusData(response);
        return response.data;
    }

    updateEmployee(id: string, data: any): Observable<any> {
        return this.postData(`${this.url}/update/${id}`, data);
    }

    // getEmployees(
    //     path: string = '',
    //     limit: number | string = '',
    //     offset: number | string = '',
    // ): Observable<any> {
    //     return this.getData(
    //         `${this.defaultPath}/${path}?limit=${limit}&offset=${offset}`,
    //     );
    // }

    // searchEmployees(
    //     q: string = '',
    //     limit: number | string = '',
    //     offset: number | string = '',
    //     sort: string = '',
    // ): Observable<any> {
    //     return this.getData(
    //         `${this.defaultPath}/search?q=${q}&limit=${limit}&offset=${offset}&sort=${sort}`,
    //     );
    // }
}
