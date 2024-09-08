import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { CustomerProfileService } from '@/app/pages/service/customer-profile.service';
import {
    CustomerProfile,
    CustomerProfileItem,
} from '@/app/pages/api/customer-profile';
import { Table } from 'primeng/table';
import { BaseService } from '@/app/shared/services/base.service';
import { Router } from '@angular/router';
import { CustomerProfileDetailService } from '@/app/shared/services/customer-profile-detail.service';

@Component({
    templateUrl: './customer-profile.component.html',
})
export class CustomerProfileComponent implements OnInit, OnDestroy {
    customersProfilesItem: CustomerProfileItem[];
    first: number = 0;
    rows: number = 10;
    cols: any[] = [];
    itemFilter: MenuItem[];
    page: number = 0;
    totalRecords: number;
    phoneSearch: string = '';
    constructor(
        public layoutService: LayoutService,
        private customerProfileService: CustomerProfileService,
        private baseService: BaseService,
        private customerProfileDetailService: CustomerProfileDetailService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.baseService.getData('customers?limit=10&offset=0').subscribe(
            (response) => {
                this.customersProfilesItem = response.data.items;
                this.totalRecords = response.data.total;
            },
            (error) => {
                console.error('Error fetching data:', error);
            },
        );

        this.itemFilter = [
            {
                label: 'Bộ lọc',
                icon: 'pi pi-filter',
                items: [
                    {
                        label: 'Lọc 1',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video',
                            },
                        ],
                    },
                    {
                        label: 'Lọc 2',
                        icon: 'pi pi-fw pi-trash',
                    },

                    {
                        label: 'Lọc 3',
                        icon: 'pi pi-fw pi-external-link',
                    },
                ],
            },
        ];
    }
    ngOnDestroy(): void {}
    // onGlobalFilter(table: Table, event: Event) {
    //     const ngon = table.filterGlobal(
    //         (event.target as HTMLInputElement).value,
    //         'contains',
    //     );
    //     console.log((event.target as HTMLInputElement).value);
    // }
    onResetSearch(searchInput: HTMLInputElement): void {
        this.phoneSearch = '';
        searchInput.value = '';
        this.baseService
            .getData(`customers?limit=${this.rows}&offset=${this.page}&phone=`)
            .subscribe(
                (response) => {
                    this.customersProfilesItem = response.data.items;
                    this.totalRecords = response.data.total;
                },
                (error) => {
                    console.error('Error fetching data:', error);
                },
            );
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            const inputElement = event.target as HTMLInputElement;
            this.phoneSearch = inputElement.value;
            this.baseService
                .getData(
                    `customers?limit=${this.rows}&phone=${this.phoneSearch}`,
                )
                .subscribe(
                    (response) => {
                        this.customersProfilesItem = response.data.items;
                        this.totalRecords = response.data.total;
                    },
                    (error) => {
                        console.error('Error fetching data:', error);
                    },
                );
        }
    }

    onPageChange(event: any): void {
        console.log(event);
        this.page = event.page;
        this.baseService
            .getData(
                `customers?limit=${event.rows}&offset=${this.page}&phone=${this.phoneSearch}`,
            )
            .subscribe(
                (response) => {
                    this.customersProfilesItem = response.data.items;
                },
                (error) => {
                    console.error('Error fetching data:', error);
                },
            );
        this.first = event.first;
        this.rows = event.rows;
    }
    goToDetail(item: any): void {
        this.customerProfileDetailService.setSelectedItem(item);

        this.router.navigate(['/customers/customer-detail', item.phone]);
    }
}
