import { errorBCMessage } from "../constants/errror-messages.constant";
import { AppError } from "../models/app-error.model";

export class ApiHelper {
  public static handleResStatusData(data: any) {
    if (data.status == 1) {
      const errorCode = data.error.code;
      throw new AppError(
        errorBCMessage[errorCode] || `${errorBCMessage.default} - ${errorCode}`,
      );
    }
  }
}
