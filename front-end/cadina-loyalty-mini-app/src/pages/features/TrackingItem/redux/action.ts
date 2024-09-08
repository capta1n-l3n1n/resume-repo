import actions from "./type";
import { apiPath } from "../../../../components/app/apiPath";
import requestorZalo, { requestor } from "../../../../components/app/api";

//get order by userId
export const fetchOrdered = (phone: number) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      baseURL: apiPath.GET_ORDER + String(phone),
    });

    next({ type: actions.SET_ORDER, payload: res.data.orders });
  } catch (error) {}
};
