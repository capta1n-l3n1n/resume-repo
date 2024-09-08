import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'customer-group-filter-age',
    templateUrl: './customer-group-filter-age.component.html',
})
export class CustomerGroupFilterAgeComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {}
    fromAge: number;
    toAge: number;
    inputFields: { valueFromAge: number; valueToAge: number }[] = [];

    addInput() {
        this.inputFields.push({ valueFromAge: null, valueToAge: null });
    }

    deleteInput(index: number) {
        this.inputFields.splice(index, 1);
    }
    ngOnInit(): void {}
    ngOnDestroy() {}
}
