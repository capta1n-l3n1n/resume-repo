import { atom } from "recoil";

export const notificationReState = atom<NotificationModel>({
  key: "notification",
  default: { type: 0, message: undefined, imageData: undefined },
});

class NotificationModel {
  type: number | 0 | 1 = 0; // 0: success; 1: error
  message: string | undefined;
  imageData?: string | undefined;
}
