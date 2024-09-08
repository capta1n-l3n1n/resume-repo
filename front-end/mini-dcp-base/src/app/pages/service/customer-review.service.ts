import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerReview } from '../api/customer-review';

@Injectable()
export class CustomerReviewService {
    constructor(private http: HttpClient) {}

    getReview() {
        return this.http
            .get<any>('assets/pages/data/customer-reviews.json')
            .toPromise()
            .then((res) => res.data as CustomerReview[])
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
