import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StoreService } from '@/app/pages/service/store.service';
import { Store } from '@/app/pages/api/store';
import { PageConstant } from '@shared/constants/page.constant';
import { LayoutService } from '@shared/layout/app.layout.service';
@Component({
    templateUrl: './manage-store.component.html',
    providers: [MessageService],
})
export class ManageStoreComponent implements OnInit {

    isLoadingTable: boolean = false;
    storeDialog: boolean = false;
    stores: Store[] = [];
    storeToEdit: Store | null = null;
    selectedStores: Store[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions: number[] = PageConstant.ITEM_PER_PAGE_OPTIONS;
    rows = PageConstant.ITEM_PER_PAGE;

    constructor(
        private storeService: StoreService,
        private layoutService: LayoutService,
    ) {
        this.layoutService.setPageTitle('Quản lý cửa hàng');
    }

    ngOnInit() {
        this.storeService.getStore().subscribe((res) => {
            this.stores = res.data;
        });

        this.cols = [
            { field: 'name', header: 'Tên' },
            { field: 'address', header: 'Địa chỉ' },
        ];
    }

    openNew() {
        this.storeToEdit = null;
        this.storeDialog = true;
    }

    editStore(store: Store) {
        this.storeToEdit = { ...store };
        this.storeDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains',
        );
    }

    hideDialog() {
        this.storeDialog = false;
        this.submitted = false;
        this.storeToEdit = null;
    }

    onStoreSaved(store: Store) {
        if (this.storeToEdit) {
            // Update existing store
            const index = this.stores.findIndex((s) => s.id === store.id);
            if (index !== -1) {
                this.stores[index] = store;
            }
        } else {
            // Add new store
            this.stores.push(store);
        }
        this.hideDialog();
    }
    ngOnDestroy() {
        this.layoutService.setPageTitle('');
    }
}
