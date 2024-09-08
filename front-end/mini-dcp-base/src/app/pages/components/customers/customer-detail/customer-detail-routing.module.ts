import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerProfileDetailComponent } from './customer-profile-detail/customer-profile-detail.component';
import { NotfoundComponent } from '../../notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CustomerProfileDetailComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomerDetailRoutingModule {}
