import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverTimeTicketComponent } from './over-time-ticket.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OverTimeTicketComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class OverTimeTicketRoutingModule {}
