import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';

@Component({
    templateUrl: './over-time-ticket.component.html',
})
export class OverTimeTicketComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {}

    ngOnInit() {}

    ngOnDestroy() {}
}
