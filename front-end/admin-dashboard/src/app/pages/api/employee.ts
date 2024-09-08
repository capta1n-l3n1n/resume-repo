import { Store } from './store';

export interface EmployeeItem {
    name?: string;
    phone?: string;
    id?: string;
    storeId?: string;
    store?: Store;
}

export interface Employee {
    id?: string;
    limit?: string;
    offset?: number;
    total?: number;
    items?: EmployeeItem[];
}
