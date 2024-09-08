import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'absence-ticket',
                data: { breadcrumb: 'Absence Ticket' },
                loadChildren: () =>
                    import('./absence-ticket/absence-ticket.module').then(
                        (m) => m.AbsenceTicketModule,
                    ),
            },
            {
                path: 'late-ticket',
                data: { breadcrumb: 'Late Ticket' },
                loadChildren: () =>
                    import('./late-ticket/late-ticket.module').then(
                        (m) => m.LateTicketModule,
                    ),
            },
            {
                path: 'over-time-ticket',
                data: { breadcrumb: 'Over Time Ticket' },
                loadChildren: () =>
                    import('./over-time-ticket/over-time-ticket.module').then(
                        (m) => m.OverTimeTicketModule,
                    ),
            },
            {
                path: 'time-tracking-ticket',
                data: { breadcrumb: 'Time Tracking Ticket' },
                loadChildren: () =>
                    import(
                        './time-tracking-ticket/time-tracking-ticket.module'
                    ).then((m) => m.TimeTrackingTicketModule),
            },

            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ManageTicketRoutingModule {}
