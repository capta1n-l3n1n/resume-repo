import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeTrackingService extends BaseService {
    private readonly defaultPath = 'activities';

    constructor(http: HttpClient) {
        super(http);
    }

    // getActivities(path: string = ''): Observable<any> {
    //     return this.getData(`${this.defaultPath}/${path}`);
    // }

    // getTicket() {
    //     return this.http
    //         .get<any>('assets/pages/data/ticket.json')
    //         .toPromise()
    //         .then((res) => res.data as Ticket[])
    //         .then((data) => data);
    // }
}
