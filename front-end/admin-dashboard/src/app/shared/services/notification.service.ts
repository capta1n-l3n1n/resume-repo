import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private messageService: MessageService) {}

    showErrorMessage(
        severity: string,
        detail: string,
        summary: string = 'Error',
        life: number = 3000,
    ): void {
        this.messageService.add({
            severity: 'error',
            summary: summary,
            detail: detail,
            life: life,
        });
    }
}
