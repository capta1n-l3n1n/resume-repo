import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRequest } from '../api/customer-request';

@Injectable()
export class CustomerRequestService {
    constructor(private http: HttpClient) {}

    getRequest() {
        return this.http
            .get<any>('assets/pages/data/customers-requests.json')
            .toPromise()
            .then((res) => res.data as CustomerRequest[])
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
