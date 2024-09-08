import { StringHelper } from '@app/shared/helpers';
import { PaginationRequest } from '@app/models/pagination';
import { Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class PaginationPipe implements PipeTransform {
    private readonly sortVals = { asc: 1, desc: -1 };

    transform(raw): PaginationRequest {
        try {
            let { limit, offset, sort } = raw;
            let sortMapped: any = {};
            if (!StringHelper.isEmpty(sort)) {
                const sortItems: Array<string> = sort.split(StringHelper.SPLITTER);
                sortItems.forEach(item => {
                    const sorts = item.split(StringHelper.COMMA);
                    if (sorts.length != 2) return;
                    if (!this.sortVals[sorts[1]]) return;
                    sortMapped[sorts[0]] = this.sortVals[sorts[1]];
                });
            }
            delete raw.limit;
            delete raw.offset;
            delete raw.sort;
            return new PaginationRequest({
                limit: +limit,
                offset: +offset,
                sort: sortMapped,
                query: { ...raw },
            });
        } catch (err) {
            console.log(err);
        }
    }
}
