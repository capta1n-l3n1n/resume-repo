import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";
import { IxyzRequest } from "../models/xyz-request.model";

export const checkIn = async (body: IxyzRequest) => {
  try {
    const { data } = await requestorBC.post(apiPath.POST_CHECK_IN, body);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};

export const getHistoryLogs = async (
  phone: string,
  month: number,
  year: number,
) => {
  try {
    let url = `${apiPath.GET_HISTORY_LOGS}month=${month}&year=${year}&phone=${phone}`;
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
