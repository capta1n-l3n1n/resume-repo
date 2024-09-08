import React from "react";
import { Text, useSnackbar, Modal } from "zmp-ui";
import API_CONSTANTS from "../../../assets-src/constants/api";

const ModalRegister: React.FunctionComponent = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  return (
    <Modal
      className="text-center"
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      actions={[
        {
          text: "Chấp nhận",
          highLight: true,
          close: false,
          onClick: () => {
            openSnackbar({
              duration: 2000,
              text: `Đang chuyển hướng tới ${API_CONSTANTS.NAME_SHOP}...`,
              type: "loading",
              position: "top",
            });

            parent.open(API_CONSTANTS.REGISTER_URL);
            setModalVisible(false);
          },
        },
        {
          text: "Hủy",
          close: true,
          highLight: true,
          danger: true,
        },
      ]}
    >
      <img
        className="mx-auto mb-5"
        src={API_CONSTANTS.APP_MINI_LOGO}
        alt="XYZ_logo"
      />
      <Text.Title className="mb-5">
        Chuyển hướng qua trang đăng ký thành viên XYZ
      </Text.Title>
      <Text className="mb-3">
        Để thuận tiện cho việc đăng ký, XYZ sẽ điều hướng bạn qua trang đăng ký
        thành viên
      </Text>
      <Text>
        Chọn{" "}
        <span className="font-semibold" style={{ color: "#006AF5" }}>
          Chấp nhận
        </span>{" "}
        để chuyển hướng
      </Text>
    </Modal>
  );
};

export default ModalRegister;
