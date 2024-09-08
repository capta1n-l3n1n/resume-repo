import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
    providedIn: 'root',
})
export abstract class BaseService {
    private baseUrl = environment.apiUrl;
    private constructUrl(path: string): string {
        return `${this.baseUrl}/${path}`;
    }
    constructor(private http: HttpClient) {}

    getData(path: string): Observable<any> {
        const url = this.constructUrl(path);
        return this.http.get<any>(url);
    }
    postData(path: string, data: any): Observable<any> {
        const url = this.constructUrl(path);
        return this.http.post<any>(url, data);
    }
    putData(path: string, data: any): Observable<any> {
        const url = this.constructUrl(path);
        return this.http.put<any>(url, data);
    }
    deleteData(path: string): Observable<any> {
        const url = this.constructUrl(path);
        return this.http.delete<any>(url);
    }
}
