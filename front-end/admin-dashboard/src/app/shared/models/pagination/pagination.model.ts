export abstract class Pagination {
    limit: number;
    offset: number;
    sort: any;

    constructor(defaultValues: Partial<Pagination> = {}) {
        this.limit = defaultValues.limit || 20;
        this.offset = defaultValues.offset || 0;
        this.sort = defaultValues.sort || {};
    }
}