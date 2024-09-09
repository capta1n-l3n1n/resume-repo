import { BasePaginator } from "./base-paginator.model";

export interface INotification extends BasePaginator {
  items: INotificationItem[];
}
export interface INotificationItem {
  createdAt: string | Date;
  appId: string;
  message: string;
  sender: string;
  receiver: string;
  isRead: boolean;
  id: string;
  updatedAt: string | Date;
}
