import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { TimeTrackingsRoutingModule } from './time-tracking-routing.module';
import { TimeTrackingComponent } from './time-tracking.component';

import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DialogModule } from 'primeng/dialog';
import { AppMapComponent } from '@/app/shared/layout/map/app-map.component';
import { AppMapModule } from '@/app/shared/layout/map/app-map.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TimeTrackingsRoutingModule,
        TableModule,
        StyleClassModule,
        ButtonModule,
        InputTextModule,
        CascadeSelectModule,
        DialogModule,
        AppMapModule,
        DropdownModule,
    ],
    declarations: [TimeTrackingComponent],
    exports: [],
})
export class TimeTrackingModule {}
