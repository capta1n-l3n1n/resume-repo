import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'customer-group-dialog',
    templateUrl: './customer-group-dialog.component.html',
})
export class CustomerGroupDialogComponent implements OnInit, OnDestroy {
    activeIndex: number = 5;

    constructor(public layoutService: LayoutService) {}

    ngOnInit(): void {}
    ngOnDestroy() {}
}
