import { produce } from "immer";
import actions from "./type";

const initialState = {
  userNumber: "",
  userInfo: null,
  userPoint: null,
  userVoucher: [],
  setting: null,
  userPointHRV: null,
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_USER:
        draft.userInfo = payload;
        break;

      case actions.SET_USER_ZALO:
        draft.userNumber = payload;
        break;

      case actions.SET_USER_BY_PHONE:
        draft.userPoint = payload;
        break;

      case actions.SET_USER_VOUCHER:
        draft.userVoucher = payload;
        break;

      case actions.SET_SETTING:
        draft.setting = payload;
        break;
      case actions.SET_USER_BY_PHONE_HRV:
        draft.userPointHRV = payload;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
