import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageStoreRoutingModule } from './manage-store-routing.module';
import { ManageStoreComponent } from './manage-store.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CreateUpdateStoreComponent } from './components/create-update-store.component';
import { AppMapModule } from '@/app/shared/layout/map/app-map.module';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        ManageStoreRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        AppMapModule,
        PaginatorModule,
    ],
    declarations: [ManageStoreComponent, CreateUpdateStoreComponent],
    exports: [CreateUpdateStoreComponent],
})
export class ManageStoreModule { }
