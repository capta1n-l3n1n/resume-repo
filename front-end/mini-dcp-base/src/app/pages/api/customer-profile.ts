export interface CustomerProfile {
    limit: number;
    offset: number;
    sort: object;
    total: number;
    items: CustomerProfileItem[];
    error: any;
    status: number;
}

export interface CustomerProfileItem {
    name: string;
    birthday: number;
    gender: string;
    phone: number;
    totalBills: number;
    totalPayment: number;
    createdDate: number;
    billArray: [
        {
            BillDate: Date;
            BillId: number;
            ContentReview: any;
            OrderId: string | number;
            TotalAmount: number;
            TypeName: string;
        },
    ];
}
