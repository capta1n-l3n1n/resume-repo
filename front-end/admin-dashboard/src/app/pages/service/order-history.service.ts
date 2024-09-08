import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '../api/order-history';

@Injectable()
export class OrderHistoryService {
    constructor(private http: HttpClient) {}

    getOrderHistory() {
        return this.http
            .get<any>('assets/pages/data/orders-history.json')
            .toPromise()
            .then((res) => res.data as OrderHistory[])
            .then((data) => data);
    }

    // getProducts() {
    //     return this.http.get<any>('assets/pages/data/products.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }

    // getProductsMixed() {
    //     return this.http.get<any>('assets/pages/data/products-mixed.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('assets/pages/data/products-orders-small.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }
}
