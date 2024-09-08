import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { LateTicketComponent } from './late-ticket.component';
import { LateTicketRoutingModule } from './late-ticket-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, CircleX } from 'lucide-angular';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputSearchTextModule } from '@shared/components/input-search-text/input-search-text.module';
const PRIMENG_MODULES = [
    TableModule,
    DropdownModule,
    TabViewModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ...PRIMENG_MODULES,
        StyleClassModule,

        LateTicketRoutingModule,
        InputSearchTextModule,
    ],
    declarations: [LateTicketComponent],
    providers: [ConfirmationService],
})
export class LateTicketModule {}
