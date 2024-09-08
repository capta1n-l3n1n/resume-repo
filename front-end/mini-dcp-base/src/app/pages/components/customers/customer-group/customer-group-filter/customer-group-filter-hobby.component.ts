import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
interface Hobby {
    name: string;
    value: string;
}
@Component({
    selector: 'customer-group-filter-hobby',
    templateUrl: './customer-group-filter-hobby.component.html',
})
export class CustomerGroupFilterHobbyComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {
        this.hobbies = [
            { name: 'Sở thích 1', value: 'Hobby 1' },
            { name: 'Sở thích 2', value: 'Hobby 2' },
            { name: 'Sở thích 3', value: 'Hobby 3' },
            { name: 'Sở thích 4', value: 'Hobby 4' },
            { name: 'Sở thích 5', value: 'Hobby 5' },
            { name: 'Sở thích 6', value: 'Hobby 6' },
            { name: 'Sở thích 7', value: 'Hobby 7' },
            { name: 'Sở thích 8', value: 'Hobby 8' },
            { name: 'Sở thích 9', value: 'Hobby 9' },
            { name: 'Sở thích 10', value: 'Hobby 10' },
            { name: 'Sở thích 11', value: 'Hobby 11' },
            { name: 'Sở thích 12', value: 'Hobby 12' },
        ];
    }

    hobbies!: Hobby[];

    selectedHobbies!: Hobby[];

    ngOnInit(): void {}
    ngOnDestroy() {}
}
