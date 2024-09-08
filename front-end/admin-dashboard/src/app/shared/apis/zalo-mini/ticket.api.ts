import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PaginationRequest } from '@shared/models';
import { firstValueFrom } from 'rxjs';
import { BaseApi } from '../base.api';

@Injectable({ providedIn: 'root' })
export class TicketApi extends BaseApi {
    private readonly url = `${environment.apiUrl}/tickets`;

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
}
