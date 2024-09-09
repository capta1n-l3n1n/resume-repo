import axios from "axios";
import { appConfig } from "./constants/app-config.constant";

export const requestorZalo = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    secret_key: appConfig.APP_SECRET_KEY,
  },
});

export const requestorBC = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-app-id": appConfig.API_TENANT_APP,
    "x-tenant-id": appConfig.API_TENANT_ID,
  },
});
