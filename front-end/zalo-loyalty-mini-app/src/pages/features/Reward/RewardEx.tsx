import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
  Button,
  Text,
  useNavigate,
  List,
  Modal,
  useSnackbar,
  useTheme,
  Box,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../../components/app/hooks";
import { fetchVoucherInfo, setVoucherCode } from "./redux/action";
import { getStorage } from "zmp-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import API_CONSTANTS from "../../../../assets-src/constants/api";
import { fetchUserByPhone, fetchUserByPhoneHRV } from "../User/redux/action";

const Reward: React.FunctionComponent = (props) => {
  const [theme] = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();

  const [showMore, setShowMore] = React.useState(false);
  const [modalData, setModalData]: any = useState(null);

  const vouchers: any = useAppSelector((state) => state.reward.vouchers);

  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const dataForDisplay =
    vouchers?.length > 0 && showMore ? vouchers : vouchers?.slice(0, 5);
  const getData = () => {
    getStorage({
      keys: ["userInfo", "userNumber", "userPoint"],
      success: async (data) => {
        const { userInfo, userNumberStorage, userPoint } = data;
        console.log(data);
        if (userNumberStorage) {
          await dispatch(setVoucherCode(userNumberStorage, modalData?.id));
          await dispatch(fetchUserByPhoneHRV(userPointHRV?.phone));
          await dispatch(fetchUserByPhone(userPoint?.phone));
          return;
        }
        await dispatch(setVoucherCode(userPointHRV?.phone, modalData?.id));
        await dispatch(fetchUserByPhoneHRV(userPointHRV?.phone));
        await dispatch(fetchUserByPhone(userPoint?.phone));
        return;
      },
      fail: (error) => {},
    });
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVoucherInfo());
  }, []);
  useEffect(() => {
    dispatch(fetchUserByPhone(userPoint?.phone));
  }, [userPoint?.total_point]);
  useEffect(() => {
    dispatch(fetchUserByPhoneHRV(userPointHRV?.phone));
  }, [userPointHRV?.total_point]);

  return (
    <div className="page">
      <div
        style={{
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <div className="py-3">
          <Text.Title>Tổng điểm tích lũy</Text.Title>
          <p>
            • Tích lũy website (Đổi tại đây):{" "}
            <span className="text-red-700">
              {userPointHRV?.total_point ?? 0}
            </span>
          </p>
          <p>
            • Tích lũy cửa hàng (Đổi tại cửa hàng):{" "}
            <span className="text-red-700">{userPoint?.points ?? 0}</span>
          </p>
        </div>
        <List
          className="section-container"
          style={{
            padding: theme !== "dark" ? "16px" : "#16px",
            background: theme !== "dark" ? "#FFFFFF" : "#141415",
          }}
        >
          {vouchers && vouchers?.length > 0 ? (
            vouchers.map((items: any) => (
              <Box
                flex
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
                className="border-solid border-black border-t border-opacity-20"
                key={items.id}
                onClick={() => {
                  setShowModal(true);
                  setModalData(items);
                }}
              >
                <Box py={5} pl={2} className="w-9/12">
                  <h1 className="text-xs">{API_CONSTANTS.NAME_SHOP}</h1>
                  <p className="font-semibold">{items.name}</p>
                  <p className="opacity-75">
                    Áp dụng cho hóa đơn từ{" "}
                    {items.min_amount_order_apply.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}{" "}
                    VNĐ
                  </p>
                </Box>
                <Box className="w-3/12 text-center">
                  <Button
                    style={{
                      background:
                        theme !== "dark"
                          ? API_CONSTANTS.ICONIC_COLOR
                          : "#FFFFFF",
                      color: theme !== "dark" ? "#FFFFFF" : "#000000",
                    }}
                    variant="primary"
                    type="highlight"
                    size="small"
                    onClick={() => {
                      setShowModal(true);
                      setModalData(items);
                    }}
                  >
                    {items.exchange_point.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
                  </Button>
                  <p className="font-semibold mt-1">Điểm</p>
                </Box>
              </Box>
            ))
          ) : (
            <div className="text-center">
              <p>Chưa có voucher nào để đổi</p>
            </div>
          )}
          {/* btn show more  */}
          {dataForDisplay?.length >= 5 ? (
            <List.Item>
              <Button
                style={{
                  background:
                    theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
                  color: theme !== "dark" ? "#FFFFFF" : "#FFFFFF",
                }}
                fullWidth
                type="neutral"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Hiển thị ít lại" : "Hiển thị thêm"}
              </Button>
            </List.Item>
          ) : null}
        </List>
      </div>
      <div>
        <Button
          style={{
            background: theme !== "dark" ? "#DCDCDC" : "#a7a4a4",
            color: theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
          }}
          variant="secondary"
          fullWidth
          onClick={() => {
            navigate(-1);
          }}
        >
          Quay lại
        </Button>
      </div>

      {/* confirm get voucher modal  */}
      <>
        <Modal
          className="relative"
          visible={showModal}
          title={modalData?.name}
          onClose={() => {
            setShowModal(false);
          }}
          actions={[
            {
              text: "Đổi",
              highLight: true,
              close: false,
              onClick: () => {
                try {
                  if (
                    userPointHRV &&
                    userPointHRV?.total_point > modalData?.exchange_point
                    // userPoint &&
                    // userPoint?.total_point > modalData?.exchange_point
                  ) {
                    getData();
                    openSnackbar({
                      duration: 1500,
                      position: "top",
                      text: "Lấy voucher thành công",
                      type: "success",
                    });
                    return setShowModal(false);
                  }
                  openSnackbar({
                    duration: 3000,
                    position: "top",
                    text: "Không đủ điều kiện để đổi",
                    type: "warning",
                  });
                } catch (error) {
                  openSnackbar({
                    duration: 3000,
                    text: "Đã có lỗi xảy ra",
                    type: "error",
                    position: "top",
                  });
                }
              },
            },
            {
              text: "Hủy",
              close: true,
              highLight: true,
              danger: true,
            },
          ]}
          description={modalData?.description}
        >
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="absolute top-3 right-4"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="mt-5">
            <p>
              Được giảm{" "}
              {modalData?.discount_value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
              {modalData?.discount_type === "percentage" ? "%" : "VNĐ"} trên hóa
              đơn
            </p>
            <p className="italic">Hiệu lực: {modalData?.life_time} ngày</p>
            <p className="mt-2">
              Ngày bắt đầu:{" "}
              {moment(modalData?.start_at).format("DD/MM/YYYY - kk:mm")}
            </p>
            <p>
              Ngày kết thúc:{" "}
              {moment(modalData?.end_at).format("DD/MM/YYYY - kk:mm")}
            </p>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default Reward;
