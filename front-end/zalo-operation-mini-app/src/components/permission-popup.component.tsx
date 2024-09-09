import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ZMACamera } from "zmp-sdk";
import { Modal } from "zmp-ui";
import { getLocationZalo, getPhoneNumberZalo } from "../@app/api/zalo-api";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { setDataToStorage } from "../@app/local-storage";
import { authorizeReState } from "../@app/state/authorize.state";
import { toastMessageState } from "../@app/state/toast-message.state";

const PermissionPopup = () => {
  const cameraRef = useRef<ZMACamera | null>(null);
  const setAuthorizeState = useSetRecoilState(authorizeReState);
  const [dialogVisible, setDialogVisible] = useState(true);
  const setToastMessage = useSetRecoilState(toastMessageState);

  const processPermission = async () => {
    try {
      setToastMessage("Đang cấp quyền...");
      const phone = await getPhoneNumberZalo();
      await setDataToStorage(localStorageKeys.USER_PHONE, phone);
      await getLocationZalo();
      const camera = cameraRef.current;
      await camera?.start();
      await setDataToStorage(localStorageKeys.IS_AUTHORIZED, true);
      await setAuthorizeState(true);
      setDialogVisible(false);
    } catch (err) {
      setToastMessage("Không thể cấp quyền. Vui lòng thử lại!!!");
    }
  };

  return (
    <Modal visible={dialogVisible}>
      <div className="hidden"></div>
      <div className="flex flex-col justify-center gap-3 align-middle">
        <div className="flex justify-center align-middle">
          <img
            src="https://file.hstatic.net/200000219339/file/shield_a2b277e2f16c45149243eab29857a440.png"
            width="44"
            height="38"
          />
        </div>
        <p className="text-lg">Vui lòng cung cấp quyền truy cập từ Zalo:</p>
        <p className="text-lg">
          - Quyền lấy thông tin số diện thoại nhầm xác định người dùng
          check-in/out
        </p>
        <p className="text-lg">
          - Quyền lấy thông tin vị trí nhằm xác định khoảng cách cho phép thực
          hiện check-in/out
        </p>
        <p className="text-lg">
          - Quyền sử dụng camera để chụp ảnh khi thực hiện check-in/out
        </p>
        <button
          className="w-full rounded-md bg-yellow-500 p-2 text-white"
          onClick={() => processPermission()}
        >
          Đồng ý
        </button>
      </div>
    </Modal>
  );
};
export default PermissionPopup;
