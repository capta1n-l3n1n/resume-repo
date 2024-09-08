import { ICustomerItemDTO } from './response';

export interface IAppCustomerItemDTO extends ICustomerItemDTO {
  isFollow: boolean;
}

export class AppCustomerItemDTO implements IAppCustomerItemDTO {
  isFollow: boolean;
  name: string;
  birthday: Date;
  monthOfBirth: number;
  age: number;
  gender: string;
  phone: string;
  level: string;
  points: number;
  totalBills: string;
  totalPayment: string;
  createdDate: Date;
  billArray: any[];
  avataUrl: string;
  address: string;
  city: string;
  district: string;
  rewardPointsHistory: any[];
  vouchers: any[];
}
