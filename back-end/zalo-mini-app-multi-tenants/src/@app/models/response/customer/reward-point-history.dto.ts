export interface IRewardPointHistoryDTO {
  points: number;
  totalPoints: number;
  usedPoints: number;
  eventType: string;
  entityName: string;
  createdDate: Date;
}

export class RewardPointHistoryDTO implements IRewardPointHistoryDTO {
  points: number;
  totalPoints: number;
  usedPoints: number;
  eventType: string;
  entityName: string;
  createdDate: Date;

  public convertByElastic(data: any): IRewardPointHistoryDTO {
    if (!data) return;
    const source = data;
    this.points = source.point;
    this.totalPoints = source.total_point;
    this.usedPoints = source.used_point;
    this.eventType = source.event_type;
    this.entityName = source.entity_name;
    this.createdDate = source.created_at ? new Date(source.created_at) : null;
  }
}
