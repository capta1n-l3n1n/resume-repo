import { produce } from "immer";
import actions from "./type";

const initialState = {
  // userNumber: "",
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      // case actions.SET_USER_VOUCHER:
      //   draft.userVoucher = payload;
      //   break;

      default:
        return state;
    }
  });
};
export default reducer;
