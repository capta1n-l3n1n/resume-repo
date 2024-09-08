import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@/app/shared/services/base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService extends BaseService {
    private readonly defaultPath = 'tickets';

    constructor(http: HttpClient) {
        super(http);
    }

    getTicket(path: string): Observable<any> {
        return this.getData(`${this.defaultPath}/${path}`);
    }

    updateTicket(path: string): Observable<any> {
        return this.postData(`${this.defaultPath}/${path}`);
    }
}
