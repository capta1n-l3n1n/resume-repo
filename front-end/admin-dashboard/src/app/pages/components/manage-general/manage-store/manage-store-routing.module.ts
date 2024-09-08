import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageStoreComponent } from './manage-store.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ManageStoreComponent }]),
    ],
    exports: [RouterModule],
})
export class ManageStoreRoutingModule {}
