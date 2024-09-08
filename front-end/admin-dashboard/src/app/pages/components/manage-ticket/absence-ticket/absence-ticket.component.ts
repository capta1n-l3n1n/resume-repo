import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { CustomerService } from '@/app/pages/service/customer.service';
import { Customer, Representative } from '@/app/pages/api/customer';
import { TicketService } from '@/app/pages/service/ticket.service';
import { Ticket } from '@/app/pages/api/ticket';
import { Table } from 'primeng/table';
import { normalizeString } from '@/app/shared/utils';

@Component({
    selector: 'absence-ticket',
    templateUrl: './absence-ticket.component.html',
})
export class AbsenceTicketComponent implements OnInit, OnDestroy {
    constructor(
        public layoutService: LayoutService,
        private ticketService: TicketService,
    ) {
        this.layoutService.setPageTitle('Quản lý phiếu xin nghỉ');
    }
    filterName: string = '';
    tickets!: Ticket[];
    filterTicketData = this.tickets;

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;
    fetchTicket() {
        this.ticketService.getTicket('absence').subscribe((res) => {
            this.tickets = res.data;
            this.filterTicketData = res.data;
            this.loading = false;
        });
    }
    clearFilters(table: Table) {
        table.clear();
        this.fetchTicket();
        this.filterName = '';
    }

    approveTicket(id: string) {
        this.ticketService
            .updateTicket(`absence/approved/${id}`)
            .subscribe(() => {
                this.fetchTicket();
            });
    }

    rejectTicket(id: string) {
        this.ticketService
            .updateTicket(`absence/rejected/${id}`)
            .subscribe(() => {
                this.fetchTicket();
            });
    }
    filterTickets() {
        const normalizedFilterName = normalizeString(this.filterName);
        this.filterTicketData = this.tickets.filter((item) =>
            normalizeString(item.name).includes(normalizedFilterName),
        );
    }
    ngOnInit() {
        this.fetchTicket();
    }
    ngOnDestroy() {
        this.layoutService.setPageTitle('');
    }
}
