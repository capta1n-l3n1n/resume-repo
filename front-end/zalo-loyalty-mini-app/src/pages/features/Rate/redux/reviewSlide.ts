import { produce } from "immer";
import actions from "./type";

const initialState = {
    //   getOrder: [],
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        switch (type) {
            //   case actions.SET_ORDER:
            //     draft.getOrder = payload;
            //     break;

            default:
                return state;
        }
    });
};
export default reducer;
