import { StringHelper } from '@app/shared/helpers';
import { RewardPointHistoryDTO } from './reward-point-history.dto';
import { BillDTO } from './bill.dto';
import { VoucherDTO } from './voucher.dto';

export interface ICustomerItemDTO {
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
  billArray: Array<any>;
  avataUrl: string;
  address: string;
  city: string;
  district: string;
  rewardPointsHistory: Array<any>;
  vouchers: Array<any>;
}

export class CustomerItemDTO implements ICustomerItemDTO {
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
  billArray: Array<any>;
  avataUrl: string;
  address: string;
  city: string;
  district: string;
  rewardPointsHistory: Array<any>;
  vouchers: Array<any>;

  public convertByElastic(data: any): CustomerItemDTO {
    if (!data || !data._source) return;
    const source = data._source;
    this.name = source.Customer_Name;
    this.birthday = source.Customer_Birthday ? new Date(source.Customer_Birthday) : null;
    this.monthOfBirth = source.monthOfBirth != 0 ? source.monthOfBirth : null;
    this.age = source.Customer_BodMonth != 0 ? source.monthOfBirth : null;
    this.gender = source.Customer_Gender;
    this.phone = source.Customer_Phone;
    this.level = source.Customer_Level;
    this.points = source.Customer_Points;
    this.totalBills = source.Customer_TotalBills;
    this.totalPayment = source.Customer_TotalMoney;
    this.createdDate = source.Customer_CreatedDate ? new Date(source.Customer_CreatedDate) : null;
    this.address = source.Customer_Address;
    this.city = source.Customer_City;
    this.district = source.Customer_District;

    this.billArray = [];
    if (!StringHelper.isEmpty(source.BillArray)) {
      this.billArray = JSON.parse(source.BillArray).BillArray.map(i => {
        return BillDTO.convertByElastic(i);
      });
    }
    this.rewardPointsHistory = [];
    if (!StringHelper.isEmpty(source.RewardPointsHistory)) {
      this.rewardPointsHistory = JSON.parse(source.RewardPointsHistory).RewardPointsHistory.map(i => {
        const item = new RewardPointHistoryDTO();
        item.convertByElastic(i);
        return item;
      });
    }
    this.vouchers = [];
    if (!StringHelper.isEmpty(source.VoucherArray)) {
      this.vouchers = JSON.parse(source.VoucherArray).VoucherArray.map(i => {
        const item = new VoucherDTO();
        item.convertByElastic(i);
        return item;
      });
    }
  }
}
