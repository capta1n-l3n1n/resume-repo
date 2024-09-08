import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDetail } from '../api/customer-detail';

@Injectable()
export class CustomerDetailService {
    constructor(private http: HttpClient) {}

    getDetail() {
        return this.http
            .get<any>('assets/pages/data/customers-details.json')
            .toPromise()
            .then((res) => res.data as CustomerDetail[])
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
