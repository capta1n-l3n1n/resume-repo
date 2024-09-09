import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { appConfig } from "../constants/app-config.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketType } from "../enums/ticket-type.enum";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";
import { ITicket } from "../models/ticket.model";

export const createTicketApi = async (body: ITicket) => {
  try {
    const { data } = await requestorBC.post(apiPath.POST_TICKET, body);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const getTicketApi = async (
  offset: number = 0,
  type?: TicketType,
  status: TicketStatus = TicketStatus.WAITING,
  phone?: string,
) => {
  try {
    let url = `${apiPath.GET_TICKET}offset=${offset}&limit=${appConfig.ITEM_SIZE}&status=${status}&sort=createdAt,asc`;
    if (type) {
      url += `&type=${type}`;
    }
    if (phone) {
      url += `&phone=${phone}`;
    }
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const getTicketApiForAdministration = async (phone: string) => {
  try {
    let url = `${apiPath.GET_TICKET_FOR_ADMIN.replace(":phone", phone)}`;
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const approveTicket = async (id: string) => {
  try {
    const url = apiPath.APPROVE_TICKET.replace(":ticketId", id);
    const { data } = await requestorBC.put(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
export const rejectTicket = async (id: string, body: any) => {
  try {
    const url = apiPath.REJECT_TICKET.replace(":ticketId", id);
    const { data } = await requestorBC.put(url, { reason: body });
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
