import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'customer-profile',
                data: { breadcrumb: 'Customers Profile' },
                loadChildren: () =>
                    import('./customer-profile/customer-profile.module').then(
                        (m) => m.CustomerProfileModule,
                    ),
            },
            {
                path: 'customer-detail/:phone',
                data: { breadcrumb: 'Customers Detail' },
                loadChildren: () =>
                    import('./customer-detail/customer-detail.module').then(
                        (m) => m.CustomerDetailModule,
                    ),
            },
            {
                path: 'customer-group',
                data: { breadcrumb: 'Customers Group' },
                loadChildren: () =>
                    import('./customer-group/customer-group.module').then(
                        (m) => m.CustomerGroupModule,
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CustomersRoutingModule {}
