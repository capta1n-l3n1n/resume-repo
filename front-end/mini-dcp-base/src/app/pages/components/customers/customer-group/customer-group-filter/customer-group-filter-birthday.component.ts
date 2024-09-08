import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
interface Month {
    name: string;
    value: string;
}
@Component({
    selector: 'customer-group-filter-birthday',
    templateUrl: './customer-group-filter-birthday.component.html',
})
export class CustomerGroupFilterBirthdayComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {
        this.months = [
            { name: 'Tháng 1', value: 'Jan' },
            { name: 'Tháng 2', value: 'Feb' },
            { name: 'Tháng 3', value: 'Mar' },
            { name: 'Tháng 4', value: 'Apr' },
            { name: 'Tháng 5', value: 'May' },
            { name: 'Tháng 6', value: 'Jun' },
            { name: 'Tháng 7', value: 'Jul' },
            { name: 'Tháng 8', value: 'Aug' },
            { name: 'Tháng 9', value: 'Sep' },
            { name: 'Tháng 10', value: 'Oct' },
            { name: 'Tháng 11', value: 'Nov' },
            { name: 'Tháng 12', value: 'Dec' },
        ];
    }

    months!: Month[];

    selectedMonths!: Month[];

    ngOnInit(): void {}
    ngOnDestroy() {}
}
