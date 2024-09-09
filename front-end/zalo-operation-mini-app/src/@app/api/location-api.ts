import { requestorBC } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { ApiHelper } from "../helpers/api.helper";
import { AppError } from "../models/app-error.model";

export const fetchLocationDW = async (
  longitudeData: number,
  latitudeData: number,
): Promise<any[]> => {
  try {
    const { data } = await requestorBC.get(
      `${apiPath.GET_LOCATION_DW}lng=${longitudeData}&lat=${latitudeData}`,
    );
    ApiHelper.handleResStatusData(data);
    return data.data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(errorMessages.UNKNOWN_ERROR);
  }
};
