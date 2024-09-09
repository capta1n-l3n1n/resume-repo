import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { notificationReState } from "../../@app/state/notification.state";
import { Modal } from "zmp-ui";

const NotificationPopup = (props: any) => {
  const notification = useRecoilValue(notificationReState);
  const [dialogVisible, setDialogVisible] = useState(false);
  const errorIcon = "https://file.hstatic.net/200000219339/file/alert.png";
  const errorBtnClass = "w-full rounded-md bg-red-500 p-2 text-white";
  const successIcon =
    "https://file.hstatic.net/200000219339/file/alert-success-icon.png";
  const successBtnClass = "w-full rounded-md bg-green-500 p-2 text-white";

  useEffect(() => {
    if (notification.message) {
      setDialogVisible(true);
    }
  }, [notification]);

  return (
    <Modal onClose={() => setDialogVisible(false)} visible={dialogVisible}>
      <div className="flex flex-col justify-center gap-3 align-middle">
        <div className="flex justify-center align-middle">
          <img
            src={notification?.type == 0 ? successIcon : errorIcon}
            width="44"
            height="38"
          />
        </div>
        <p className="text-lg">{notification?.message}</p>
        {notification?.imageData && <img src={notification?.imageData} />}
        <button
          className={notification?.type == 0 ? successBtnClass : errorBtnClass}
          onClick={() => setDialogVisible(false)}
        >
          Đóng
        </button>
      </div>
    </Modal>
  );
};
export default NotificationPopup;
