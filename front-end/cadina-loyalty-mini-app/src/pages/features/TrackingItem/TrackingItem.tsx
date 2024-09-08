import React, { useEffect, useState } from "react";
import {
  Button,
  Page,
  Text,
  useNavigate,
  List,
  Modal,
  useSnackbar,
  Tabs,
  useTheme,
  Box,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../../components/app/hooks";
import { fetchOrdered } from "./redux/action";
import { getStorage } from "zmp-sdk/apis";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { openWebview } from "zmp-sdk";
import "./css/TrackingItemCss.css";
import API_CONSTANTS from "../../../../assets-src/constants/api";

const TrackingItem: React.FunctionComponent = (props) => {
  const [theme] = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreUnconfirmed, setShowMoreUnconfirmed] = useState(false);
  const [showMoreShipped, setShowMoreShipped] = useState(false);
  const [modalData, setModalData]: any = useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const userOrder: any = useAppSelector((state) => state.trackingItem.getOrder);
  const settingApp: any = useAppSelector((state) => state.user.setting);
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const getData = () => {
  //   getStorage({
  //     keys: ["userInfo", "userNumber", "userPoint"],
  //     success: (data) => {
  //       const { userInfo, userNumberStorage, userPoint } = data;
  //       dispatch(fetchOrdered(userPoint?.id));
  //     },
  //     fail: (error) => {},
  //   });
  // };
  const dataForDisplay =
    userPoint && showMore
      ? userPoint?.billArray
      : userPoint?.billArray?.slice(0, 5);
  const dataForUnConfirmed =
    userOrder && showMoreUnconfirmed
      ? userOrder.filter(
          (itemStatus: any) => itemStatus.status === "unconfirmed"
        )
      : userOrder
          .filter((itemStatus: any) => itemStatus.status === "unconfirmed")
          ?.slice(0, 5);
  const dataForShipped =
    userOrder && showMoreShipped
      ? userOrder.filter((itemStatus: any) => itemStatus.status === "shipped")
      : userOrder
          .filter((itemStatus: any) => itemStatus.status === "shipped")
          ?.slice(0, 5);
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
  // useEffect(() => {
  //   dispatch(fetchOrdered(userPoint?.id));
  // });
  // useEffect(() => {
  //   getData();
  //   dispatch(fetchOrdered(userPoint?.id));
  // }, []);

  return (
    <Page className="page">
      <div
        style={{
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <Text.Title className="text-center">Đơn hàng đã đặt</Text.Title>
      </div>
      <Tabs>
        {/* TAB1 All */}
        <Tabs.Tab key="tab1" label="Đã hoàn tất">
          <List>
            {userPoint && userPoint.billArray?.length > 0 ? (
              dataForDisplay.map((items: any) => (
                <List.Item
                  key={items.id}
                  style={{
                    background: theme !== "dark" ? "#FFFFFF" : "#141415",
                  }}
                  className="section-container"
                  onClick={() => {
                    setModalData(items);
                    setShowModal(true);
                  }}
                >
                  <Box
                    flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <div className="w-5/12">
                      <p className="font-bold">ID đơn hàng:</p>
                      <p className="italic">{items.id}</p>
                      <p className="font-bold">Mã đơn hàng:</p>
                      <p className="italic">
                        {items?.orderId ?? "Đang cập nhật..."}
                      </p>
                    </div>
                    <div className="w-7/12">
                      <div className="mb-1">
                        Tình trạng:{" "}
                        {items.typeName === "Xuất" ? (
                          <span className="text-red-600">Đã hoàn thành</span>
                        ) : items.typeName === "Nhập" ? (
                          <span className="text-blue-500">Hoàn trả</span>
                        ) : (
                          <span>...</span>
                        )}
                      </div>
                      <p className="mb-2">
                        Đặt lúc:{" "}
                        {moment(items.createdDate).format("DD/MM/YYYY - kk:mm")}
                      </p>
                      <p className="font-bold italic">
                        Tổng tiền:{" "}
                        {items.totalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                        })}{" "}
                        VNĐ
                      </p>
                    </div>
                  </Box>
                </List.Item>
              ))
            ) : (
              <div className="my-5 text-center">
                <p>Bạn chưa có đơn hàng nào</p>
              </div>
            )}

            {/* show more button  */}
            {userOrder?.length >= 5 ? (
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
        </Tabs.Tab>

        {/* TAB2 pending */}
        {/* <Tabs.Tab key="tab2" label="Chờ xử lí">
          <List>
            {userOrder &&
            dataForUnConfirmed.filter(
              (itemStatus: any) => itemStatus.status === "unconfirmed"
            )?.length > 0 ? (
              dataForUnConfirmed.map((items: any) => (
                <List.Item
                  key={items.id}
                  style={{
                    background: theme !== "dark" ? "#FFFFFF" : "#141415",
                  }}
                  className="section-container"
                  onClick={() => {
                    setModalData(items);
                    setShowModal(true);
                  }}
                >
                  <Box
                    flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    {" "}
                    <div className="w-5/12">
                      <h1 className="text-lg">
                        <span className="font-bold">ID đơn hàng:</span>{" "}
                        {items.id}
                      </h1>
                      <p className="text-base">
                        <span className="font-bold">Mã đơn hàng:</span>{" "}
                        <span className="italic">{items.order_number}</span>
                      </p>
                    </div>
                    <div className="w-7/12">
                      <p className="mb-2">Tình trạng: Chờ xử lí</p>
                      <p className="mb-2">
                        Đặt lúc:{" "}
                        {moment(items.created_at).format("DD/MM/YYYY - kk:mm")}
                      </p>
                      <p className="font-bold italic">
                        Tổng tiền:{" "}
                        {items.total_price.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                        })}{" "}
                        VNĐ
                      </p>
                    </div>
                  </Box>
                </List.Item>
              ))
            ) : (
              <div className="my-5 text-center">
                <p>Không có đơn hàng đang xử lí</p>
              </div>
            )}

            {dataForUnConfirmed?.length >= 5 ? (
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
                    setShowMoreUnconfirmed(!showMoreUnconfirmed);
                  }}
                >
                  {showMoreUnconfirmed ? "Hiển thị ít lại" : "Hiển thị thêm"}
                </Button>
              </List.Item>
            ) : null}
          </List>
        </Tabs.Tab> */}

        {/* TAB3  */}
        {/* <Tabs.Tab key="tab3" label="Đã giao">
          <List>
            {userOrder &&
            dataForShipped.filter(
              (itemStatus: any) => itemStatus.status === "shipped"
            )?.length > 0 ? (
              dataForShipped.map((items: any) => (
                <List.Item
                  key={items.id}
                  style={{
                    background: theme !== "dark" ? "#FFFFFF" : "#141415",
                  }}
                  className="section-container"
                  onClick={() => {
                    setModalData(items);
                    setShowModal(true);
                  }}
                >
                  <Box
                    flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <div className="w-5/12">
                      <h1 className="text-lg">
                        <span className="font-bold">ID đơn hàng:</span>{" "}
                        {items.id}
                      </h1>
                      <p className="text-base">
                        <span className="font-bold">Mã đơn hàng:</span>{" "}
                        <span className="italic">{items.order_number}</span>
                      </p>
                    </div>
                    <div className="w-7/12">
                      <p className="mb-2">Tình trạng: Đã giao</p>
                      <p className="mb-2">
                        Đặt lúc:{" "}
                        {moment(items.created_at).format("DD/MM/YYYY - kk:mm")}
                      </p>
                      <p className="font-bold italic">
                        Tổng tiền:{" "}
                        {items.total_price.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                        })}{" "}
                        VNĐ
                      </p>
                    </div>
                  </Box>
                </List.Item>
              ))
            ) : (
              <div className="mt-5 text-center">
                <p>Không có đơn hàng đã giao</p>
              </div>
            )}

            {dataForShipped?.length >= 5 ? (
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
                    setShowMoreShipped(!showMoreShipped);
                  }}
                >
                  {showMoreShipped ? "Hiển thị ít lại" : "Hiển thị thêm"}
                </Button>
              </List.Item>
            ) : null}
          </List>
        </Tabs.Tab> */}
      </Tabs>
      {/* {!userPoint.rewardPointsHistory && settingApp?.settings.show_buy ? (
        <div
          style={{
            background: theme !== "dark" ? "#FFFFFF" : "#000000",
            color: theme !== "dark" ? "#000000" : "#FFFFFF",
          }}
          className="rounded-lg text-center mt-5 border-2 border-dashed py-3"
        >
          <h1 className="text-lg font-bold">Bạn chưa có đơn hàng!</h1>
          <h1 className="text-base opacity-75 mb-1">
            Bạn có muốn mua hàng không?
          </h1>
          <Button
            size="medium"
            style={{ backgroundColor: API_CONSTANTS.ICONIC_COLOR }}
            onClick={async () => {
              // setModalVisible(true);
              try {
                await openSnackbar({
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
      ) : null} */}
      {/* back button */}
      <div className="my-3">
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

      {/* modal order detail  */}
      {/* <>
        <Modal
          className="relative"
          visible={showModal}
          title={`ID Đơn hàng: ${modalData?.id}`}
          description={`Mã đơn hàng: ${modalData?.orderId}`}
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
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="absolute top-3 right-4"
          >
            <FontAwesomeIcon className="text-base" icon={faXmark} />
          </button>
          {modalData ? (
            <>
              <p>ngon </p>
            </>
          ) : null}
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
            Mua hàng
          </Button>
        </Modal>
      </> */}
    </Page>
  );
};

export default TrackingItem;
