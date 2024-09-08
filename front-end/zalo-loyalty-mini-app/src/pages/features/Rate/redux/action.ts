import { apiPath } from "../../../../components/app/apiPath";
import { requestor } from "../../../../components/app/api";

//set review by phone
export const postReview =
  (data: ReviewDto, phone: number | string) => async () => {
    try {
      const res = await requestor({
        method: "POST",
        baseURL: apiPath.SET_REVIEW + String(phone),
        data,
      });
    } catch (error) {}
  };
