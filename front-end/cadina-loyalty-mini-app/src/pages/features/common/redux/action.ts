import { apiPath } from "../../../../components/app/apiPath";
import { requestor } from "../../../../components/app/api";
import { getSystemInfo } from "zmp-sdk";

export const postActivity =
  (phone: string, activity: string, voucherCode?: any) => async () => {
    try {
      const { platform } = getSystemInfo();
      await requestor({
        method: "POST",
        baseURL: apiPath.GET_SET_ACTIVITY,
        data: {
          phone,
          activity,
          evidence: {
            platform,
          },
          voucherCode,
        },
      });
    } catch (error) {}
  };
