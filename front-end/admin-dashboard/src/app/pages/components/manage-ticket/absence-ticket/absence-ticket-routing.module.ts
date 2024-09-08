import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbsenceTicketComponent } from './absence-ticket.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AbsenceTicketComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AbsenceTicketRoutingModule {}
