import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import {
  errorBCMessage,
  errorMessages,
} from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";

export const fetchStoreDW = async (): Promise<any[]> => {
  try {
    const { data } = await requestorBC.get(`${apiPath.GET_STORE_DW}`);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
