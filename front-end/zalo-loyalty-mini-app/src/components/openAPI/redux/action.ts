import API_CONSTANTS from "../../../../assets-src/constants/api";
import { requestorOpenAPI } from "../../app/api";
import { apiPath } from "../../app/apiPath";
import actions from "./type";

//get db user by phone number
export const sendNotiOpenAPI = (userZaloId: string) => async (next) => {
  try {
    const res = await requestorOpenAPI({
      method: "POST",
      headers: {
        "X-User-Id": String(userZaloId),
        // "X-User-Id": "3361272833815132694"
      },
      data: {
        templateId: "00126fd75392bacce383",
        templateData: {
          buttonText: "Chi tiết đơn hàng",
          buttonUrl: `https://zalo.me/s/${API_CONSTANTS.ZALO_MINI_APP_ID}/`,
          title: "Yamishop - Xác nhận đơn hàng",
          contentTitle: "Xác nhận đơn hàng",
          contentDescription:
            "Chúng tôi đã nhận yêu cầu đặt hàng từ bạn. Thông tin chi tiết đơn hàng",
        },
      },
    });

    //   next({ type: actions.SET_USER_BY_PHONE, payload: res.data });
    // } catch (error) { }
  } catch (error) {
    console.log(error);
  }
};
