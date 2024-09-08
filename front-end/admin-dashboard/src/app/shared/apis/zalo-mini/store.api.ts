import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BaseApi } from '../base.api';

@Injectable({ providedIn: 'root' })
export class StoreApi extends BaseApi {
    private readonly url = `${environment.apiUrl}/stores`;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}
