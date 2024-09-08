import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/components/notfound/notfound.component';
import { AppLayoutComponent } from './shared/layout/app.layout.component';
import { InternalErrorComponent } from './pages/components/internal-error/internal-error.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './pages/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'customers',
                            loadChildren: () =>
                                import(
                                    './pages/components/customers/customers.module'
                                ).then((m) => m.CustomersModule),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './pages/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './pages/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './pages/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './pages/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './pages/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./pages/components/auth/auth.module').then(
                            (m) => m.AuthModule,
                        ),
                },
                {
                    path: 'landing',
                    loadChildren: () =>
                        import(
                            './pages/components/landing/landing.module'
                        ).then((m) => m.LandingModule),
                },

                { path: 'internal-error', component: InternalErrorComponent },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            },
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
