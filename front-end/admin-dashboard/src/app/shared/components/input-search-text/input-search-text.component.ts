import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
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
import { StringHelper } from '@shared/helpers/string.helper';

@Component({
    selector: 'input-search-text',
    templateUrl: './input-search-text.component.html',
})
export class InputSearchTextComponent {
    @Input() placeholder = StringHelper.EMPTY;
    @Output() changeTextSearch = new EventEmitter<string>();

    // Search
    textSearch: string = StringHelper.EMPTY;
    searchSubject: Subject<string> = new Subject<string>();
    constructor() {}

    ngOnInit() {
        this.searchSubject.pipe(debounceTime(300)).subscribe((textSearch) => {
            this.changeTextSearch.emit(textSearch);
        });
    }

    onChangeSearch($event) {
        this.searchSubject.next($event);
    }

    clearSearch() {
        this.textSearch = StringHelper.EMPTY;
        this.searchSubject.next(StringHelper.EMPTY);
    }

    ngOnDestroy() {
        this.searchSubject.unsubscribe();
    }
}
