import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FirstLoginComponent } from './first-login.component';
import { FirstLoginRoutingModule } from './first-login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FirstLoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        DividerModule,
    ],
    declarations: [FirstLoginComponent],
})
export class FirstLoginModule {}
