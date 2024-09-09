import { getAccessToken, getLocation, getPhoneNumber } from "zmp-sdk";
import { requestorZalo } from "../api-requestors";
import { apiPath } from "../constants/api-paths.constant";
import { errorMessages } from "../constants/errror-messages.constant";
import { AppError } from "../models/app-error.model";
import { IGps } from "../models/gps.model";
import { checkZaloCameraPermission } from "zmp-sdk/apis";

export const getPhoneNumberZalo = async (): Promise<String | undefined> => {
  try {
    const access_token = await getAccessToken();
    if (!access_token) {
      throw Error("Not get accessToken");
    }
    const { token } = await getPhoneNumber();
    if (!token) {
      throw Error("Not get token");
    }
    const res = await requestorZalo({
      baseURL: apiPath.ZALO_GET_INFO,
      method: "GET",
      headers: { code: token, access_token: access_token },
    });
    return "0" + res.data.data?.number?.slice(2);
  } catch (error) {
    throw new AppError(errorMessages.GET_PHONE_ZALO_ERR);
  }
};

export const getLocationZalo = async (): Promise<IGps> => {
  try {
    const access_token = await getAccessToken();
    if (!access_token) {
      throw Error("Not get accessToken");
    }
    const { token } = await getLocation();
    if (!token) {
      throw Error("Not get token");
    }
    const res = await requestorZalo({
      baseURL: apiPath.ZALO_GET_INFO,
      method: "GET",
      headers: { code: token, access_token: access_token },
    });
    return {
      latitude: +res.data.data.latitude,
      longitude: +res.data.data.longitude,
    };
  } catch (error) {
    throw new AppError(errorMessages.GET_LOCATION_ZALO_ERR);
  }
};

export const checkCameraPermission = async () => {
  let result = false;
  try {
    const { userAllow } = await checkZaloCameraPermission();
    result = userAllow;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
  return result;
};
