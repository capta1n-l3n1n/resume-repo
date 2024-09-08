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
import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { CustomerProfileDetailComponent } from './customer-profile-detail/customer-profile-detail.component';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import {
    BadgeDollarSign,
    CircleDollarSign,
    Crown,
    LucideAngularModule,
} from 'lucide-angular';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgApexchartsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CustomerDetailRoutingModule,
        DropdownModule,
        InputTextModule,
        AvatarModule,
        RatingModule,
        SelectButtonModule,
        TagModule,
        TabViewModule,
        LucideAngularModule.pick({ Crown, CircleDollarSign, BadgeDollarSign }),
    ],
    declarations: [CustomerProfileDetailComponent],
})
export class CustomerDetailModule {}
