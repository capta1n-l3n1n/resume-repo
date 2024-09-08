import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
interface Channel {
    name: string;
    value: string;
}

@Component({
    selector: 'customer-group-filter-activity',
    templateUrl: './customer-group-filter-activity.component.html',
})
export class CustomerGroupFilterActivityComponent implements OnInit, OnDestroy {
    constructor(public layoutService: LayoutService) {
        this.channels = [
            { name: 'Sở thích 1', value: 'Activity 1' },
            { name: 'Sở thích 2', value: 'Activity 2' },
            { name: 'Sở thích 3', value: 'Activity 3' },
            { name: 'Sở thích 4', value: 'Activity 4' },
            { name: 'Sở thích 5', value: 'Activity 5' },
            { name: 'Sở thích 6', value: 'Activity 6' },
            { name: 'Sở thích 7', value: 'Activity 7' },
            { name: 'Sở thích 8', value: 'Activity 8' },
            { name: 'Sở thích 9', value: 'Activity 9' },
            { name: 'Sở thích 10', value: 'Activity 10' },
            { name: 'Sở thích 11', value: 'Activity 11' },
            { name: 'Sở thích 12', value: 'Activity 12' },
        ];
    }

    channels!: Channel[];

    selectedChannels!: Channel[];

    orderVolumnFrom: number;
    orderVolumnTo: number;
    spentVolumnFrom: number;
    spentVolumnTo: number;

    rangeDatesBuying: Date[] | undefined;
    rangeDatesNotBuying: Date[] | undefined;
    optionsBuying: any[] = [
        { label: 'Khoảng thời gian', value: 'option1' },
        { label: 'Thời gian cụ thể', value: 'option2' },
    ];
    optionsNotBuying: any[] = [
        { label: 'Khoảng thời gian', value: 'option1' },
        { label: 'Thời gian cụ thể', value: 'option2' },
    ];

    selectedOptionBuying: any | undefined;
    optionsTimeBuying: any[] = [
        { label: '30 ngày gần nhất', value: 'option1' },
        { label: '7 ngày gần nhất', value: 'option2' },
        { label: '3 ngày gần nhất', value: 'option3' },
    ];
    selectedOptionNotBuying: any | undefined;
    optionsTimeNotBuying: any[] = [
        { label: '30 ngày gần nhất', value: 'option1' },
        { label: '7 ngày gần nhất', value: 'option2' },
        { label: '3 ngày gần nhất', value: 'option3' },
    ];

    selectedOptionTimeBuying: any | undefined;
    selectedOptionTimeNotBuying: any | undefined;
    activeIndex: number;
    ngOnInit(): void {}
    ngOnDestroy() {}
}
