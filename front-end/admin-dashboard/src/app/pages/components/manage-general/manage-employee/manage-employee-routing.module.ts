import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageEmployeeComponent } from './manage-employee.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ManageEmployeeComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ManageEmployeeRoutingModule {}
