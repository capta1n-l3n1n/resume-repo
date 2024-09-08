import { produce } from "immer";
import actions from "./type";

const initialState = {
  vouchers: [],
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actions.SET_VOUCHER:
        draft.vouchers = payload;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
