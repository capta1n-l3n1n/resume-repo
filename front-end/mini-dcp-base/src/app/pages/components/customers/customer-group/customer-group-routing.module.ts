import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerGroupComponent } from './customer-group.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CustomerGroupComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomerGroupRoutingModule {}
