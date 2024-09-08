export interface IVoucherDTO {
  code: string;
  discountType: string;
  endAt: Date;
  isUsed: boolean;
  minimumOrderAmount: number;
  value: number;
}

export class VoucherDTO implements IVoucherDTO {
  code: string;
  discountType: string;
  endAt: Date;
  isUsed: boolean;
  minimumOrderAmount: number;
  value: number;

  public convertByElastic(data: any): VoucherDTO {
    if (!data) return;
    const source = data;
    this.code = source.code;
    this.discountType = source.discount_type;
    this.endAt = source.ends_at ? new Date(source.ends_at) : null;
    this.isUsed = source.is_used;
    this.minimumOrderAmount = source.minimum_order_amount;
    this.value = source.value;
  }
}
