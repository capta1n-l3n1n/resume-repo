import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerProfile } from '../api/customer-profile';

@Injectable()
export class CustomerProfileService {
    constructor(private http: HttpClient) {}

    getProfile() {
        return this.http
            .get<any>('assets/pages/data/customers-profiles.json')
            .toPromise()
            .then((res) => res.data as CustomerProfile[])
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
