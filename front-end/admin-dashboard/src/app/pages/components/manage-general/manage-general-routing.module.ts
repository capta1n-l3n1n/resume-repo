import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'manage-store',
                data: { breadcrumb: 'Manage Store' },
                loadChildren: () =>
                    import('./manage-store/manage-store.module').then(
                        (m) => m.ManageStoreModule,
                    ),
            },
            {
                path: 'manage-employee',
                data: { breadcrumb: 'Manage Employee' },
                loadChildren: () =>
                    import('./manage-employee/manage-employee.module').then(
                        (m) => m.ManageEmployeeModule,
                    ),
            },

            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ManageGeneralRoutingModule {}
