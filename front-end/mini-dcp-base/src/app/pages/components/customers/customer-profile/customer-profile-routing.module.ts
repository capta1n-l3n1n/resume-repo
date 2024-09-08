import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerProfileComponent } from './customer-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CustomerProfileComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomerProfileRoutingModule {}
