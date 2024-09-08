import { Component, OnInit, OnDestroy } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { debounceTime, firstValueFrom, Subject, Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { TicketApi } from '@shared/apis';
import { TicketType } from '@shared/enums/ticket-type.enum';
import { PageConstant } from '@shared/constants/page.constant';
import { PaginationRequest, PaginationResponse } from '@shared/models';
import { DateHelper } from '@shared/helpers/date.helper';
import { TableLazyLoadEvent } from 'primeng/table';
import { ToastService } from '@shared/services';
import { TicketStatus } from '@shared/enums/ticket-status.enum';

@Component({
    templateUrl: './late-ticket.component.html',
})
export class LateTicketComponent {
    dateFormat = DateHelper.DATE_TIME_FORMAT;
    ticketType: TicketType.LATE;

    listData: any[] = [];
    activatedTab = 0;

    // Search
    textSearch: string;
    searchSubject: Subject<string> = new Subject<string>();

    // Pagination
    itemPerPage = PageConstant.ITEM_PER_PAGE;
    itemPerPageOptions = PageConstant.ITEM_PER_PAGE_OPTIONS;
    totalItems = 0;
    isLoadingTable = false;
    constructor(
        private readonly layoutService: LayoutService,
        private readonly ticketApi: TicketApi,
        private readonly toastService: ToastService,
    ) {
        this.layoutService.setPageTitle('Quản lý phiếu đi trễ');
    }

    ngOnInit() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((textSearch) => {
            this.fetchData(0, textSearch);
        });
        this.searchSubject.next(null);
    }

    async fetchData(offset: number = 0, searchTerm?: string) {
        this.isLoadingTable = true;
        const query: any = {};
        const text = searchTerm ?? this.textSearch;
        if (text) {
            query['text'] = text;
        }
        let ticketStatus;
        switch (this.activatedTab) {
            case 0: {
                ticketStatus = TicketStatus.WAITING;
                break;
            }
            case 1: {
                ticketStatus = TicketStatus.APPROVED;
                break;
            }
            case 2: {
                ticketStatus = TicketStatus.REJECTED;
                break;
            }
        }

        const params: PaginationRequest = {
            limit: this.itemPerPage,
            query: {
                type: this.ticketType,
            },
            offset,
            sort: 'createdAt,desc',
        };
        try {
            const data: PaginationResponse<any> =
                await this.ticketApi.getPagination(params);
            this.listData = data.items;
            this.totalItems = data.total;
        } catch (ex) {
            console.log('Has error', ex);
        } finally {
            this.isLoadingTable = false;
        }
    }

    onLazyLoad(data: TableLazyLoadEvent) {
        this.fetchData(data.first);
    }

    onChangeSearch($event) {
        console.log('fuck', $event);
    }

    clearSearch() {
        this.textSearch = null;
        this.searchSubject.next(null);
    }

    onChangetab(value: number) {}

    ngOnDestroy() {
        this.layoutService.setPageTitle('');
    }
}
