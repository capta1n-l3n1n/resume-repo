export enum TicketStatus {
  WAITING = "WAITING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const TICKET_STATUS_MAP = {
  [TicketStatus.WAITING]: "Chờ duyệt",
  [TicketStatus.APPROVED]: "Đã duyệt",
  [TicketStatus.REJECTED]: "Từ chối",
};
