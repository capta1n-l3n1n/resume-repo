import { Store } from '@/app/pages/api/store';
import { StoreService } from '@/app/pages/service/store.service';
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'component-create-update-store',
    templateUrl: 'create-update-store.component.html',
    providers: [MessageService],
})
export class CreateUpdateStoreComponent implements OnDestroy {
    @Input() storeDialog: boolean = false;
    @Input() store: Store = {};

    @Input() submitted: boolean;

    @Output() storeSaved = new EventEmitter<Store>();
    @Output() storeDeleted = new EventEmitter<string>();
    @Output() storesDeleted = new EventEmitter<Store[]>();
    @Output() closeDialog = new EventEmitter<void>();

    constructor(
        private messageService: MessageService,
        private storeService: StoreService,
    ) {}

    ngOnDestroy(): void {
        this.storeDialog = false;
    }

    saveStore() {
        this.submitted = true;

        if (this.store.name?.trim()) {
            if (this.store.id) {
                this.storeSaved.emit(this.store);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Store Updated',
                    life: 3000,
                });
            } else {
                this.store.id = this.createId();
                this.storeSaved.emit(this.store);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Store Created',
                    life: 3000,
                });
            }

            this.hideDialog();
        }
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    deleteStore() {
        this.storeDeleted.emit(this.store.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Store Deleted',
            life: 3000,
        });
        this.store = {};
        this.hideDialog();
    }
    hideDialog() {
        this.closeDialog.emit(); // Phát sự kiện để đóng hộp thoại từ component cha
    }
}
