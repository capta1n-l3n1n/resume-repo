import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerGroup } from '../api/customer-group';

@Injectable()
export class CustomerGroupService {
    constructor(private http: HttpClient) {}

    getGroup() {
        return this.http
            .get<any>('assets/pages/data/customer-groups.json')
            .toPromise()
            .then((res) => res.data as CustomerGroup[])
            .then((data) => data);
    }

    // getProducts() {
    //     return this.http
    //         .get<any>('assets/pages/data/products.json')
    //         .toPromise()
    //         .then((res) => res.data as Product[])
    //         .then((data) => data);
    // }

    // getProductsMixed() {
    //     return this.http
    //         .get<any>('assets/pages/data/products-mixed.json')
    //         .toPromise()
    //         .then((res) => res.data as Product[])
    //         .then((data) => data);
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http
    //         .get<any>('assets/pages/data/products-orders-small.json')
    //         .toPromise()
    //         .then((res) => res.data as Product[])
    //         .then((data) => data);
    // }
}
