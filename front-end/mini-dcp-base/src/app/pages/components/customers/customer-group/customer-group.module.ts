import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CustomerGroupRoutingModule } from './customer-group-routing.module';
import { CustomerGroupComponent } from './customer-group.component';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CustomerGroupDialogComponent } from './customer-group-dialog/customer-group-dialog.component';
import { OrderHistoryService } from '@/app/pages/service/order-history.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { CustomerGroupFilterAgeComponent } from './customer-group-filter/customer-group-filter-age.component';
import { CustomerGroupFilterBirthdayComponent } from './customer-group-filter/customer-group-filter-birthday.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CustomerGroupFilterGenderComponent } from './customer-group-filter/customer-group-filter-gender.component';
import { CustomerGroupFilterAreaComponent } from './customer-group-filter/customer-group-filter-area.component';
import { CustomerGroupFilterHobbyComponent } from './customer-group-filter/customer-group-filter-hobby.component';
import { CustomerGroupFilterActivityComponent } from './customer-group-filter/customer-group-filter-activity.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CustomerGroupRoutingModule,
        InputTextModule,
        DialogModule,
        DynamicDialogModule,
        SelectButtonModule,
        ToggleButtonModule,
        InputNumberModule,
        TabViewModule,
        MultiSelectModule,
        CheckboxModule,
        CalendarModule,
        DropdownModule,
    ],
    declarations: [
        CustomerGroupComponent,
        CustomerGroupDialogComponent,
        CustomerGroupFilterAgeComponent,
        CustomerGroupFilterBirthdayComponent,
        CustomerGroupFilterGenderComponent,
        CustomerGroupFilterAreaComponent,
        CustomerGroupFilterHobbyComponent,
        CustomerGroupFilterActivityComponent,
    ],
    providers: [DialogService, MessageService],
})
export class CustomerGroupModule {}
