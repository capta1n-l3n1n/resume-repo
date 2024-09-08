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
import { TimeTrackingTicketComponent } from './time-tracking-ticket.component';
import { TimeTrackingTicketRoutingModule } from './time-tracking-ticket-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TimeTrackingTicketRoutingModule,
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
    declarations: [TimeTrackingTicketComponent],
})
export class TimeTrackingTicketModule {}
