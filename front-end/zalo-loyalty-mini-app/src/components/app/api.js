import axios from "axios";
import API_CONSTANTS from "../../../assets-src/constants/api";

const requestorZalo = axios.create({
  baseURL: API_CONSTANTS.ZALO_GET_NUMBER,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",

    secret_key: API_CONSTANTS.SECRET_KEY,
  },
});
export default requestorZalo;

// requestor.interceptors.request.use((req) => {
//   req.headers = {
//     ...req.headers,
//     // Authorization: ,
//   };

//   return req;
// });

export const requestor = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-app-id": "cadina-loyalty",
    "x-tenant-id": 210,
  },
});
export const requestorOpenAPI = axios.create({
  headers: {
    "X-Api-Key": `Bearer ${API_CONSTANTS.ZALO_API_KEY}`,
    "X-MiniApp-Id": API_CONSTANTS.ZALO_MINI_APP_ID,
    "Content-Type": "application/json",
    "Response-Type": "application/json",
  },
  baseURL: API_CONSTANTS.ZALO_NOTI_OPENAPI,
});
