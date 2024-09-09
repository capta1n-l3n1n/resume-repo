export enum TicketType {
  LATE = "LATE",
  UNPAID_LEAVE = "UNPAID_LEAVE",
  PAID_LEAVE = "PAID_LEAVE",
  TIMETRACKING = "TIME-TRACKING",
  WORK_OUT_SIDE = "WORK_OUT_SIDE",
}

export const TICKET_MAP = {
  [TicketType.LATE]: "Phiếu xin đi trễ",
  [TicketType.PAID_LEAVE]: "Phiếu xin nghỉ phép",
  [TicketType.UNPAID_LEAVE]: "Phiếu xin nghỉ không lương",
  [TicketType.TIMETRACKING]: "Phiếu quên chấm công",
  [TicketType.WORK_OUT_SIDE]: "Phiếu xin làm việc ngoài văn phòng",
};
