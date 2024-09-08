import { Component } from '@angular/core';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../validator/password-validator';

@Component({
    selector: 'app-first-login',
    templateUrl: './first-login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class FirstLoginComponent {
    passwordForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        public layoutService: LayoutService,
    ) {
        this.passwordForm = this.fb.group(
            {
                defaultPassword: [
                    '',
                    [Validators.required, Validators.minLength(8)],
                ],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', Validators.required],
            },
            { validators: passwordMatchValidator() },
        );
    }

    onSubmit() {
        if (this.passwordForm.valid) {
            console.log('Form Submitted!', this.passwordForm.value);
        }
    }

    get defaultPassword() {
        return this.passwordForm.get('defaultPassword');
    }

    get password() {
        return this.passwordForm.get('password');
    }

    get confirmPassword() {
        return this.passwordForm.get('confirmPassword');
    }
}
