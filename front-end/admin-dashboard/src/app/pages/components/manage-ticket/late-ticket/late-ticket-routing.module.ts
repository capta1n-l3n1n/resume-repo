import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LateTicketComponent } from './late-ticket.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LateTicketComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class LateTicketRoutingModule {}
