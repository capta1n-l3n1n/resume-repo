import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimeTrackingTicketComponent } from './time-tracking-ticket.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TimeTrackingTicketComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class TimeTrackingTicketRoutingModule {}
