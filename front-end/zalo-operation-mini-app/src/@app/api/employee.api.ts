import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";

export const getEmployeeInfo = async (phone: string) => {
  try {
    const url = apiPath.GET_EMPLOYEE_INFO.replace(":phone", phone);
    const { data } = await requestorBC.get(url);
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
