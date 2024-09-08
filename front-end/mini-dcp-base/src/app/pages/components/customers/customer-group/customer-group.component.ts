import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerGroupDialogComponent } from './customer-group-dialog/customer-group-dialog.component';
import { CustomerGroup } from '@/app/pages/api/customer-group';
import { CustomerGroupService } from '@/app/pages/service/customer-group.service';

@Component({
    templateUrl: './customer-group.component.html',
})
export class CustomerGroupComponent implements OnInit, OnDestroy {
    customerGroup!: CustomerGroup[];

    cols: any[] = [];
    visible: boolean = true;
    ref: DynamicDialogRef | undefined;

    constructor(
        public layoutService: LayoutService,
        private customerGroupService: CustomerGroupService,
        public dialogService: DialogService,
        public messageService: MessageService,
    ) {}
    showDialog() {
        // this.ref = this.dialogService.open(CustomerGroupDialogComponent, {
        //     header: 'Select a Product',
        //     width: '70%',
        //     contentStyle: { overflow: 'auto' },
        //     baseZIndex: 10000,
        //     maximizable: true,
        // });
        this.visible = true;

        // this.ref.onClose.subscribe((product: CustomerGroup) => {
        //     if (product) {
        //         this.messageService.add({
        //             severity: 'info',
        //             summary: 'Product Selected',
        //             detail: product.name,
        //         });
        //     }
        // });

        // this.ref.onMaximize.subscribe((value) => {
        //     this.messageService.add({
        //         severity: 'info',
        //         summary: 'Maximized',
        //         detail: `maximized: ${value.maximized}`,
        //     });
        // });
    }
    ngOnInit(): void {
        this.customerGroupService
            .getGroup()
            .then((data) => (this.customerGroup = data));
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains',
        );
    }
}
