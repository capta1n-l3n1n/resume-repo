export interface CustomerReview {
    id?: string;
    orderId?: string;
    reviewAt?: Date;
    rating?: number | string;
    content?: string;
}
