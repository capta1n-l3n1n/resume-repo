import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'customer-group-filter-gender',
    templateUrl: './customer-group-filter-gender.component.html',
})
export class CustomerGroupFilterGenderComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {}

    gender: string[] = [];

    ngOnInit(): void {}
    ngOnDestroy() {}
}
