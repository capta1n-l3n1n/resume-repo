export interface IBillDTO {
  id: number;
  createdDate: Date;
  contentReview: string;
  orderId: number;
  totalAmount: number;
  typeName: string;
}

export class BillDTO implements IBillDTO {
  id: number;
  createdDate: Date;
  contentReview: string;
  orderId: number;
  totalAmount: number;
  typeName: string;

  public convertByElastic(data: any): BillDTO {
    if (!data) return;
    const source = data;
    this.id = source.BillId;
    this.createdDate = source.BillDate ? new Date(source.BillDate) : null;
    this.contentReview = source.ContentReview;
    this.orderId = source.OrderId;
    this.totalAmount = source.TotalAmount;
    this.typeName = source.TypeName;
  }

  public static convertByElastic(data: any): BillDTO {
    if (!data) return null;
    const model = new BillDTO();
    const source = data;
    model.id = source.BillId;
    model.createdDate = source.BillDate ? new Date(source.BillDate) : null;
    model.contentReview = source.ContentReview;
    model.orderId = source.OrderId;
    model.totalAmount = source.TotalAmount;
    model.typeName = source.TypeName;
    return model;
  }
}
