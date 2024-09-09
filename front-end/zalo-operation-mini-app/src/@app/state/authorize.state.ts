import { atom } from "recoil";

export const authorizeReState = atom<boolean>({
  key: "isAuthorize",
  default: false,
});
