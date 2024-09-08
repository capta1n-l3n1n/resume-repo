import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
interface Area {
    name: string;
    value: string;
}
@Component({
    selector: 'customer-group-filter-area',
    templateUrl: './customer-group-filter-area.component.html',
})
export class CustomerGroupFilterAreaComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {
        this.areas = [
            { name: 'Tỉnh 1', value: 'Area 1' },
            { name: 'Tỉnh 2', value: 'Area 2' },
            { name: 'Tỉnh 3', value: 'Area 3' },
            { name: 'Tỉnh 4', value: 'Area 4' },
            { name: 'Tỉnh 5', value: 'Area 5' },
            { name: 'Tỉnh 6', value: 'Area 6' },
            { name: 'Tỉnh 7', value: 'Area 7' },
            { name: 'Tỉnh 8', value: 'Area 8' },
            { name: 'Tỉnh 9', value: 'Area 9' },
            { name: 'Tỉnh 10', value: 'Area 10' },
            { name: 'Tỉnh 11', value: 'Area 11' },
            { name: 'Tỉnh 12', value: 'Area 12' },
        ];
    }

    areas!: Area[];

    selectedAreas!: Area[];

    ngOnInit(): void {}
    ngOnDestroy() {}
}
