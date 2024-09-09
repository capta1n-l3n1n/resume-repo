import { getEmployeeInfo } from "../api/employee.api";
import { getPhoneNumberZalo } from "../api/zalo-api";
import { localStorageKeys } from "../constants/local-storage-keys.constant";
import { getLocalStorage, setDataToStorage } from "../local-storage";
import { StringHelper } from "./string.helper";

export class UserHelper {
  public static async getUserPhone() {
    let userPhone = await getLocalStorage(localStorageKeys.USER_PHONE);
    if (StringHelper.isEmpty(userPhone)) {
      userPhone = await getPhoneNumberZalo();
      await setDataToStorage(localStorageKeys.USER_PHONE, userPhone);
    }
    return userPhone;
  }

  public static async getInfo() {
    const userPhone = await this.getUserPhone();
    return await getEmployeeInfo(userPhone);
  }

  public static extractAvatar = (info: any) => {
    if (!info || StringHelper.isEmpty(info.name)) {
      return null;
    }
    const lastName = info.name.split(StringHelper.SPACE).pop();
    return lastName ? lastName.charAt(0) : null;
  };
}
