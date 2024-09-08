export interface OrderHistory {
    id?: string;
    orderId?: string;
    orderAt?: Date | string;
    orderValue?: string;
    paymentStatus?: string;
    shippingStatus?: number;
}
