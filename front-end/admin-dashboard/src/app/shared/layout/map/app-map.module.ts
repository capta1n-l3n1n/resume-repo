import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppMapComponent } from './app-map.component';
@NgModule({
    imports: [CommonModule, StyleClassModule],
    declarations: [AppMapComponent],
    exports: [AppMapComponent],
})
export class AppMapModule {}
