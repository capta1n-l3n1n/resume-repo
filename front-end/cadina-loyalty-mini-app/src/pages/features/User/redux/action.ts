import actions from "./type";
import { apiPath } from "../../../../components/app/apiPath";
import requestorZalo, { requestor } from "../../../../components/app/api";
import API_CONSTANTS from "../../../../../assets-src/constants/api";

//get db user by phone number
export const fetchUserByPhoneHRV = (phoneNumber: string) => async (next) => {
  try {
    const res = await requestor({
      method: "POST",
      baseURL: apiPath.GET_USER_POINT_HRV + String(phoneNumber),
    });

    next({ type: actions.SET_USER_BY_PHONE_HRV, payload: res.data });
  } catch (error) {}
};
export const fetchUserByPhone =
  (phoneNumber: number | string) => async (next) => {
    try {
      console.log(phoneNumber);

      if (phoneNumber) {
        const res = await requestor({
          method: "GET",
          baseURL: apiPath.GET_USER_POINT + String(phoneNumber),
        });
        console.log("fetchUserByPhone", res.data.data);

        next({ type: actions.SET_USER_BY_PHONE, payload: res.data.data });
      }
      return;
    } catch (error) {}
  };

export const fetchUserInfoZalo =
  (code: string, access_token: string) => async (next) => {
    try {
      const res = await requestorZalo({
        method: "GET",
        headers: { code: code, access_token: access_token },
      });
      if (res.data.data?.number) {
        let newValue = "0" + res.data.data?.number?.slice(2);
        next({ type: actions.SET_USER_ZALO, payload: newValue });
      }
    } catch (error) {}
  };

export const fetchVoucher = (phone: string | number) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      baseURL: apiPath.GET_VOUCHER_USER + String(phone),
    });
    next({ type: actions.SET_USER_VOUCHER, payload: res.data.coupons });
  } catch (error) {}
};

// export const postFollowOA = async (userId: number) => {
//   try {
//     const res = await requestor({
//       method: "POST",
//       baseURL: apiPath.SET_FOLLOW_OA + String(userId) + "/oa/follow.json",
//     });
//   } catch (error) {}
// };
export const postFollowOA = (phone: string | number) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      baseURL: apiPath.SET_FOLLOW_OA + String(phone),
    });
    console.log("postFollow", res);
  } catch (error) {}
};

export const fetchAppSetting = (v: number) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      baseURL: apiPath.SET_SETTING + String(v),
    });

    next({ type: actions.SET_SETTING, payload: res.data });
  } catch (error) {}
};

// export const fetchUserAttendance = (userId: number) => async (next) => {
//   try {
//     const res = await requestor({
//       method: "GET",
//       baseURL: apiPath.GET_VOUCHER + String(userId) + "/rewards.json",
//     });
//     next({ type: actions.SET_USER_VOUCHER, payload: res.data.coupons });
//   } catch (error) {}
// };
