import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";

export const getAppSetting = async (): Promise<any> => {
  try {
    const { data } = await requestorBC.get(`${apiPath.GET_APP_SETTING}`);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
