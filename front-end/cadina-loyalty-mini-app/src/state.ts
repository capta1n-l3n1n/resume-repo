import { atom } from "recoil";
import { userInfo } from "zmp-sdk";

export const userState = atom<userInfo>({
  key: "user",
  default: {
    zalo_id: "Guest",
    name: "XYZ user",
    avatar: "XYZ",
  },
});
