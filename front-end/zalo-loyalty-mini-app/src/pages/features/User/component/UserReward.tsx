import React, { useEffect, useState } from "react";
import moment from "moment";
import QRCode from "qrcode.react";
import {
  Button,
  Text,
  useNavigate,
  List,
  Modal,
  useSnackbar,
  useTheme,
  Page,
  Box,
  Tabs,
} from "zmp-ui";
import { getStorage } from "zmp-sdk/apis";
import {
  fetchUserByPhone,
  fetchVoucher,
  fetchUserByPhoneHRV,
} from "../redux/action";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../components/app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import API_CONSTANTS from "../../../../../assets-src/constants/api";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { openWebview } from "zmp-sdk";

const UserReward: React.FunctionComponent = (props) => {
  //Copy QR code fn
  const [copied, setCopied] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);
  //end copy fn
  const [modalVisible, setModalVisible] = React.useState(false);
  const [theme] = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [showMore, setShowMore] = useState(false);
  const [showMoreHRV, setShowMoreHRV] = useState(false);
  const [modalData, setModalData]: any = useState(null);
  const [modalType, setModalType]: any = useState("HRV");

  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const userVoucher: any = useAppSelector((state) => state.user.userVoucher);
  console.log(userVoucher);

  const settingApp: any = useAppSelector((state) => state.user.setting);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataForDisplayHRV =
    userVoucher && showMoreHRV ? userVoucher : userVoucher?.slice(0, 5);
  console.log(dataForDisplayHRV);

  const dataForDisplay =
    userPoint && userPoint?.vouchers && showMore
      ? userPoint?.vouchers
      : userPoint?.vouchers?.slice(0, 5);
  console.log(dataForDisplay);

  const getData = () => {
    getStorage({
      keys: ["userInfo", "userNumber", "userPoint"],
      success: async (data) => {
        const { userInfo, userNumberStorage, userPoint } = data;
        await dispatch(fetchVoucher(userNumberStorage));
      },
      fail: (error) => {},
    });
  };
  const openUrlInWebview = (urlLink: string) => {
    openWebview({
      url:
        String(urlLink) +
        API_CONSTANTS.GOOGLEUTM +
        String(userPoint?.phone ?? userPointHRV?.phone),
      success: (res) => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
      },
    });
  };
  useEffect(() => {
    getData();
    dispatch(fetchUserByPhone(userPoint?.phone));
    dispatch(fetchUserByPhoneHRV(userPointHRV?.phone));
    dispatch(fetchVoucher(userPoint?.phone));
    dispatch(fetchVoucher(userPointHRV?.phone));
  }, []);
  return (
    <Page
      style={{
        background: theme !== "dark" ? "" : "#000000",
      }}
      className="page"
    >
      <div
        style={{
          padding: theme !== "dark" ? "16px" : "16px",
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <div className="text-center py-3">
          <Text.Title>Voucher của tôi</Text.Title>
        </div>

        <Tabs>
          {/* TAB1 voucher web HRV*/}
          <Tabs.Tab key="tab1" label="Dùng tại website">
            <List
              style={{
                padding: theme !== "dark" ? "16px" : "16px",
                background: theme !== "dark" ? "#FFFFFF" : "#141415",
              }}
              className="section-container"
            >
              {userVoucher && userVoucher?.length > 0 ? (
                dataForDisplayHRV
                  .filter((isUsedItem: any) => !isUsedItem.is_used)
                  .map((items: any) => (
                    <div
                      onClick={() => {
                        setShowModal(true);
                        setModalType("HRV");
                        return setModalData(items);
                      }}
                      className="h-32 flex items-center flex-row border-solid border-black border-t border-opacity-20"
                      key={items.code}
                    >
                      <div className="flex-none w-4/12 text-center ">
                        <img
                          className="w-20 h-20 mx-auto"
                          src={API_CONSTANTS.APP_MINI_LOGO}
                          alt="vouchers_logo"
                        />

                        <h1 className="font-semibold">{items.code}</h1>
                      </div>
                      <div className="flex-none w-8/12 pl-5">
                        <h1 className="font-semibold">
                          Giảm{" "}
                          {items.value.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })}{" "}
                          {items.discount_type === "percentage" ? "%" : "VNĐ"}
                        </h1>
                        <p className="italic">
                          HẾT HẠN:{" "}
                          {items?.ends_at
                            ? moment(items.ends_at).format("DD/MM/YYYY - kk:mm")
                            : "Không thời hạn"}
                        </p>
                        <p className="opacity-75">
                          Áp dụng cho hóa đơn từ{" "}
                          {items.minimum_order_amount.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                            }
                          )}{" "}
                          VNĐ
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center">
                  <p>Bạn chưa có voucher nào</p>
                </div>
              )}
              {/* btn show more  */}
              {dataForDisplayHRV && dataForDisplayHRV?.length >= 5 ? (
                <List.Item>
                  <Button
                    style={{
                      background:
                        theme !== "dark"
                          ? API_CONSTANTS.ICONIC_COLOR
                          : "#000000",
                      color: theme !== "dark" ? "#FFFFFF" : "#FFFFFF",
                    }}
                    fullWidth
                    type="neutral"
                    onClick={() => {
                      setShowMoreHRV(!showMoreHRV);
                    }}
                  >
                    {showMoreHRV ? "Hiển thị ít lại" : "Hiển thị thêm"}
                  </Button>
                </List.Item>
              ) : null}
            </List>
          </Tabs.Tab>

          {/* TAB2 voucher shop dw */}
          <Tabs.Tab key="tab2" label="Dùng tại cửa hàng">
            <List
              style={{
                padding: theme !== "dark" ? "16px" : "16px",
                background: theme !== "dark" ? "#FFFFFF" : "#141415",
              }}
              className="section-container"
            >
              {userPoint?.vouchers && userPoint?.vouchers?.length > 0 ? (
                dataForDisplay
                  .filter((isUsedItem: any) => !isUsedItem.isUsed)
                  .map((items: any) => (
                    <div
                      onClick={() => {
                        setShowModal(true);
                        setModalType("DW");
                        return setModalData(items);
                      }}
                      className="h-32 flex items-center flex-row border-solid border-black border-t border-opacity-20"
                      key={items.code}
                    >
                      <div className="flex-none w-4/12 text-center ">
                        <img
                          className="w-20 h-20 mx-auto"
                          src={API_CONSTANTS.APP_MINI_LOGO}
                          alt="vouchers_logo"
                        />

                        <h1 className="font-semibold">{items.code}</h1>
                      </div>
                      <div className="flex-none w-8/12 pl-5">
                        <h1 className="font-semibold">
                          Giảm{" "}
                          {items.value.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })}{" "}
                          {items.discountType === "percentage" ? "%" : "VNĐ"}
                        </h1>
                        <p className="italic">
                          HẾT HẠN:{" "}
                          {items?.endAt
                            ? moment(items.endAt).format("DD/MM/YYYY - kk:mm")
                            : "Không thời hạn"}{" "}
                        </p>
                        <p className="opacity-75">
                          Áp dụng cho hóa đơn từ{" "}
                          {items.minimumOrderAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })}{" "}
                          VNĐ
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center">
                  <p>Bạn chưa có voucher nào</p>
                </div>
              )}

              {/* btn show more  */}
              {dataForDisplay && dataForDisplay?.length >= 5 ? (
                <List.Item>
                  <Button
                    style={{
                      background:
                        theme !== "dark"
                          ? API_CONSTANTS.ICONIC_COLOR
                          : "#000000",
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
          </Tabs.Tab>
        </Tabs>
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

      {/* order dw warn  */}
      {!userPoint?.rewardPointsHistory && settingApp?.settings.show_buy ? (
        <div className="rounded-lg text-center mt-5 border-2 border-dashed py-3 bg-white">
          <h1 className="text-lg font-bold">Bạn chưa có đơn hàng!</h1>
          <h1 className="text-base opacity-75 mb-1">
            Bạn có muốn mua hàng không?
          </h1>
          <Button
            size="medium"
            style={{ backgroundColor: API_CONSTANTS.ICONIC_COLOR }}
            onClick={() => {
              try {
                openSnackbar({
                  duration: 2000,
                  text: `Đang chuyển hướng tới ${API_CONSTANTS.NAME_SHOP}...`,
                  type: "loading",
                  position: "top",
                });
                openUrlInWebview(API_CONSTANTS.WEBSITE_SALE_URL);
              } catch (error) {
                openSnackbar({
                  duration: 2000,
                  text: "Điều hướng không thành công",
                  type: "warning",
                  position: "top",
                });
              }
            }}
          >
            Đến mua hàng
          </Button>
          <p className="text-xs opacity-75 mt-1">
            Tích điểm, đổi thưởng, mở rộng tiện ích
          </p>
        </div>
      ) : null}
      {/* Modal reward detail */}
      <>
        <Modal
          className="relative"
          visible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          actions={[
            {
              style: { margin: "auto" },
              text: "Hủy",
              close: true,
              highLight: true,
              danger: true,
            },
          ]}
        >
          <div>
            <header className="text-center border-b-2 border-dashed">
              <h1 className="text-red-700">{API_CONSTANTS.NAME_SHOP}</h1>
              <h1 className="font-bold text-2xl mt-2 pb-5">
                {modalType == "HRV"
                  ? modalData?.discount_type === "percentage"
                    ? `Giảm ${modalData?.value} %`
                    : modalData?.discount_type === "fixed_amount"
                    ? `Giảm ${modalData?.value.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })} VNĐ`
                    : `Giảm ${modalData?.value.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })} phí vận chuyển`
                  : modalData?.discountType === "percentage"
                  ? `Giảm ${modalData?.value} %`
                  : modalData?.discountType === "fixed_amount"
                  ? `Giảm ${modalData?.value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })} VNĐ`
                  : `Giảm ${modalData?.value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })} phí vận chuyển`}
              </h1>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="absolute top-5 right-5"
              >
                <FontAwesomeIcon className="text-xl" icon={faXmark} />
              </button>
            </header>
            <div className="text-center mt-3">
              {/* QR code gen */}
              <QRCode
                className="mx-auto"
                id="qrcode"
                value={modalData?.code}
                size={258}
                level={"M"}
                includeMargin={true}
              />
            </div>
            <div className="text-center my-2">
              <input
                value={modalData?.code}
                id="myInput"
                disabled
                type="text"
                className="text-center mb-2 font-medium opacity-80 text-sm"
                style={{
                  background: theme !== "dark" ? "#FFFFFF" : "#000000",
                  color: theme !== "dark" ? "#000000" : "#FFFFFF",
                }}
              />
              <CopyToClipboard onCopy={onCopy} text={modalData?.code}>
                <Button
                  style={{
                    backgroundColor: API_CONSTANTS.ICONIC_COLOR,
                  }}
                  onClick={() => {
                    openSnackbar({
                      duration: 1500,
                      position: "top",
                      text: "Sao chép mã voucher thành công",
                      type: "success",
                    });
                  }}
                >
                  Sao chép{" "}
                  <FontAwesomeIcon className="text-base ml-2" icon={faCopy} />
                </Button>
              </CopyToClipboard>
            </div>

            <div className="opacity-75 mt-3 text-sm">
              <p>
                -Áp dụng cho hóa đơn tối thiểu{" "}
                {modalType == "HRV"
                  ? modalData?.minimum_order_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })
                  : modalData?.minimumOrderAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}{" "}
                VNĐ
              </p>
              {modalType == "HRV" ? (
                <p>
                  {modalData?.ends_at ? (
                    <p>
                      -Thời gian áp dụng:{" "}
                      {moment(modalData?.start_at).format("DD/MM/YYYY")} -{" "}
                      {moment(modalData?.ends_at).format("DD/MM/YYYY")}
                    </p>
                  ) : (
                    "Không thời hạn"
                  )}
                </p>
              ) : (
                <p>
                  {modalData?.endAt ? (
                    <p>
                      -Thời hạn sử dụng đến:{" "}
                      {moment(modalData?.endAt).format("DD/MM/YYYY")}
                    </p>
                  ) : (
                    "Không thời hạn"
                  )}
                </p>
              )}
              {modalType == "HRV" ? (
                <p>-Dùng {modalData?.usage_limit} lần</p>
              ) : null}
            </div>
          </div>
        </Modal>
      </>
    </Page>
  );
};

export default UserReward;
