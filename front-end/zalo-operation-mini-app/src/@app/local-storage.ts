import { getStorage, setStorage } from "zmp-sdk/apis";
import { localStorageKeys } from "./constants/local-storage-keys.constant";

export const getLocalStorage = async (key?: string) => {
  try {
    const res = await getStorage({
      keys: Object.values(localStorageKeys),
    });
    if (key) {
      return res[key];
    }
    return res;
  } catch (error) {
    console.log("getLocalStorage fail");
  }
};

export const setDataToStorage = async (key: any, val: any) => {
  try {
    const { errorKeys } = await setStorage({
      data: { [key]: val },
    });
    console.log("errorKeys", errorKeys);
  } catch (error) {
    console.log("setDataToStorage has error", error);
  }
};
