import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { appConfig } from "../constants/app-config.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";

export const getNotifications = async (
  receiver: string,
  offset: number,
): Promise<any> => {
  try {
    const url = `${apiPath.GET_NOTIFICATION.replace(":receiver", receiver)}?offset=${offset}&limit=${appConfig.ITEM_SIZE}&sort=createdAt,desc`;
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const getTotalUnread = async (receiver: string): Promise<any> => {
  try {
    const url = `${apiPath.GET_NOTIFICATION_TOTAL_UNREAD.replace(":receiver", receiver)}`;
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const updateAllNotifications = async (
  receiver: string,
): Promise<any[]> => {
  try {
    const url = apiPath.PUT_NOTIFICATION_READED.replace(":receiver", receiver);
    const { data } = await requestorBC.put(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
