import actions from "./type";
import { apiPath } from "../../../../components/app/apiPath";
import { Header } from "zmp-ui";
import { object } from "prop-types";
import { useEffect, useState } from "react";
import api, { getStorage } from "zmp-sdk";
import { getAccessToken, setStorage } from "zmp-sdk/apis";
import requestorZalo, { requestor } from "../../../../components/app/api";
import API_CONSTANTS from "../../../../../assets-src/constants/api";
import { postActivity } from "../../common/redux/action";

//get voucher info
export const fetchVoucherInfo = () => async (next) => {
  try {
    const res = await requestor({
      method: "POST",
      baseURL: apiPath.GET_VOUCHER_INFO,
    });

    next({ type: actions.SET_VOUCHER, payload: res.data.campaigns });
  } catch (error) {}
};
export const setVoucherCode =
  (phoneNumber: string | number, voucherId: number) => async (next) => {
    try {
      const res = await requestor({
        method: "POST",
        baseURL:
          apiPath.SET_VOUCHER_CODE +
          String(voucherId) +
          "/exchange.json?phone=" +
          String(phoneNumber),
      });
      postActivity(String(phoneNumber), "REDEEM_VOUCHER", res.data.coupon);
      // next({ type: actions.SET_VOUCHER, payload: res.data.campaigns });
    } catch (error) {}
  };
