export interface Ticket {
    id: string;
    name: string;
    phone: string;
    store: string;
    value: string;
    type: string;
    status: string;
    time?: { from: string; to: string };
    data?: object;
    createAt?: Date | string;
}
