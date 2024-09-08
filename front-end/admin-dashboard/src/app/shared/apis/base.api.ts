import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { PaginationRequest } from '@shared/models';
import { ObjectHelper } from '@shared/helpers/object.helper';
import { errorBCMessage } from '@shared/constants/errror-messages.constant';
import { AppError } from '@shared/models/errror/app-error.model';

export abstract class BaseApi {
    constructor(private http: HttpClient) {}

    get xyzOperationHeader() {
        return new HttpHeaders({
            'x-tenant-id': '10',
            'x-app-id': 'xyz-operation',
        });
    }

    createRequestOption = (req?: any): HttpParams => {
        let options: HttpParams = new HttpParams();
        if (req) {
            const flaternedObj = ObjectHelper.flattenObject(req);
            Object.keys(flaternedObj).forEach((key) => {
                if (flaternedObj[key]) {
                    options = options.set(key, flaternedObj[key]);
                }
            });
        }
        return options;
    };

    handleResStatusData(data: any) {
        if (data.status == 1) {
            const errorCode = data.error.code;
            throw new AppError(
                errorBCMessage[errorCode] ||
                    `${errorBCMessage.default} - ${errorCode}`,
            );
        }
    }

    getData(url: string, req?: any): Observable<any> {
        const options = this.createRequestOption(req);
        return this.http.get<any>(url, {
            headers: this.xyzOperationHeader,
            params: options,
        });
    }

    postData(url: string, data?: any): Observable<any> {
        return this.http.post<any>(url, data, {
            headers: this.xyzOperationHeader,
        });
    }

    putData(url: string, data: any): Observable<any> {
        return this.http.put<any>(url, data, {
            headers: this.xyzOperationHeader,
        });
    }

    deleteData(url: string): Observable<any> {
        return this.http.delete<any>(url);
    }
}
