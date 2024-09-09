import { atom } from "recoil";

export const toastMessageState = atom<string | undefined>({
  key: "toastMessage",
  default: undefined,
});
