import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CustomerProfileDetailService {
    private selectedItem: any;

    setSelectedItem(item: any): void {
        this.selectedItem = item;
    }

    getSelectedItem(): any {
        return this.selectedItem;
    }
}
