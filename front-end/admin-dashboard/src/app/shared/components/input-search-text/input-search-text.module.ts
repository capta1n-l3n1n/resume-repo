import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputSearchTextComponent } from './input-search-text.component';
const PRIMENG_MODULES = [InputTextModule];

@NgModule({
    imports: [CommonModule, FormsModule, ...PRIMENG_MODULES],
    declarations: [InputSearchTextComponent],
    exports: [InputSearchTextComponent],
})
export class InputSearchTextModule {}
