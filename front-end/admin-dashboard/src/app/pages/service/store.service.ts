import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService extends BaseService {
    private readonly defaultPath = 'stores';

    constructor(http: HttpClient) {
        super(http);
    }

    getStore(path: string = ''): Observable<any> {
        return this.getData(`${this.defaultPath}/${path}`);
    }

    // updateTicket(path: string): Observable<any> {
    //     return this.postData(`${this.defaultPath}/${path}`);
    // }
    // getTicket() {
    //     return this.http
    //         .get<any>('assets/pages/data/ticket.json')
    //         .toPromise()
    //         .then((res) => res.data as Ticket[])
    //         .then((data) => data);
    // }
}
