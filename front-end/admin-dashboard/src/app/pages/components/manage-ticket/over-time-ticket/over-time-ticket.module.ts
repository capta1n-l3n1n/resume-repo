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
import { OverTimeTicketComponent } from './over-time-ticket.component';
import { OverTimeTicketRoutingModule } from './over-time-ticket-routing.module';

@NgModule({
    imports: [
        CommonModule,
        OverTimeTicketRoutingModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DropdownModule,
        TagModule,
    ],
    declarations: [OverTimeTicketComponent],
})
export class OverTimeTicketModule {}
