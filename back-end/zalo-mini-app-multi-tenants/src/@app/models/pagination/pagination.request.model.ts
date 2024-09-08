import { Pagination } from './pagination.model';

export class PaginationRequest extends Pagination {
    query: any;

    constructor(defaultValues: Partial<PaginationRequest> = {}) {
        super(defaultValues);
        this.query = defaultValues.query || null;
    }
}
