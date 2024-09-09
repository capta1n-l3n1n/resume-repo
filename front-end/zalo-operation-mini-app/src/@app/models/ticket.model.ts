import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketType } from "../enums/ticket-type.enum";
import { BasePaginator } from "./base-paginator.model";
import { IStore } from "./stores.model";
interface TicketEmployee {
  name: string;
  phone: string;
  id: string;
  storeId: string;
}
export interface ITicketItem {
  phone: string;
  fromDate: Date | string;
  toDate: Date | string;
  type: TicketType;
  status: TicketStatus;
  content: string;
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  employee: TicketEmployee;
  store: IStore;
}
export interface ITicket extends BasePaginator {
  items: ITicketItem[];
}
