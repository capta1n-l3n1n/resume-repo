import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { AbsenceTicketComponent } from './absence-ticket.component';
import { AbsenceTicketRoutingModule } from './absence-ticket-routing.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TicketService } from '@/app/pages/service/ticket.service';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        AbsenceTicketRoutingModule,
        FormsModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        OverlayPanelModule,
        InputTextModule,
    ],
    declarations: [AbsenceTicketComponent],
    providers: [TicketService],
})
export class AbsenceTicketModule {}
