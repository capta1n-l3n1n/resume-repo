import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {}
    ngOnInit() {}

    ngOnDestroy() {}
}
