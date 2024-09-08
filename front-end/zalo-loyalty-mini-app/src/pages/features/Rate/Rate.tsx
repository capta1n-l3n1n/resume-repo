import React, { useEffect, useState } from "react";
import {
  Button,
  Page,
  Text,
  List,
  useSnackbar,
  Tabs,
  useTheme,
  Box,
  useNavigate,
  Icon,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../../components/app/hooks";
import { getStorage } from "zmp-sdk/apis";
import moment from "moment";
import { openWebview } from "zmp-sdk";
import { fetchOrdered } from "../TrackingItem/redux/action";
import { NoImg } from "../../../components/svg";
import RatingStar from "./utils/RatingStar";
import M_RateDetail from "./Modal/M_RateDetail";
import M_RateImg from "./Modal/M_RateImg";
import API_CONSTANTS from "../../../../assets-src/constants/api";

const Rate: React.FunctionComponent = (props) => {
  const [theme] = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showModalImg, setShowModalImg] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreUnRate, setShowMoreUnRate] = useState(false);
  const [modalData, setModalData]: any = useState(null);
  const [modalDataImg, setModalDataImg]: any = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const userOrder: any = useAppSelector((state) => state.trackingItem.getOrder);
  const settingApp: any = useAppSelector((state) => state.user.setting);
  console.log("userOrder", userOrder);

  const getData = () => {
    getStorage({
      keys: ["userPoint"],
      success: async (data) => {
        const { userPoint } = data;
        await dispatch(fetchOrdered(userPoint?.phone));
      },
      fail: (error) => {},
    });
  };
  const dataForRate =
    userOrder && showMore
      ? userOrder.filter(
          (itemFilter: any) =>
            itemFilter.status === "shipped" && itemFilter.product_reviews[0]
        )
      : userOrder
          .filter(
            (itemFilter: any) =>
              itemFilter.status === "shipped" && itemFilter.product_reviews[0]
          )
          ?.slice(0, 5);

  const dataForUnRate =
    userOrder && showMoreUnRate
      ? userOrder.filter(
          (itemFilter: any) =>
            itemFilter.status === "shipped" &&
            Number(moment(itemFilter.review_expired_at).valueOf()) >
              Number(Date.now()) &&
            !itemFilter.product_reviews[0]
        )
      : userOrder
          .filter(
            (itemFilter: any) =>
              itemFilter.status === "shipped" &&
              Number(moment(itemFilter.review_expired_at).valueOf()) >
                Number(Date.now()) &&
              !itemFilter.product_reviews[0]
          )
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
  useEffect(() => {
    getData();
    dispatch(fetchOrdered(userPoint?.phone));
  }, []);

  return (
    <Page className="page">
      <div
        style={{
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <Text.Title className="text-center">Đánh giá đơn hàng</Text.Title>
      </div>
      <Tabs>
        {/* TAB1 unRate */}
        <Tabs.Tab key="tab1" label="Chưa đánh giá">
          <List>
            {userOrder && dataForUnRate[0] ? (
              dataForUnRate.map((items: any) => (
                <List.Item
                  key={items.id}
                  style={{
                    background: theme !== "dark" ? "#FFFFFF" : "#141415",
                  }}
                  className="section-container"
                >
                  <div
                    onClick={() => {
                      setModalData(items);
                      setShowModal(true);
                    }}
                  >
                    <Box
                      flex
                      pb={2}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <p className="text-xs">{items.order_number}</p>
                      <p className="text-red-400">Đã hoàn thành</p>
                    </Box>
                    <Box
                      flex
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <div className="w-3/12 mr-2">
                        <div className="p-1 rounded-sm">
                          {items.line_items[0].image.src ? (
                            <img
                              className="rounded-sm"
                              src={items.line_items[0].image.src}
                              alt="item-img"
                            />
                          ) : (
                            <NoImg />
                          )}
                        </div>
                      </div>
                      <div className="w-6/12">
                        <span className="font-medium">
                          {items.line_items[0].name} |{" "}
                          <span style={{ color: API_CONSTANTS.ICONIC_COLOR }}>
                            x{items.line_items[0].quantity}
                          </span>
                        </span>
                      </div>
                      <div className="w-3/12 text-center">
                        <p>
                          {items.line_items[0].price.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                          })}
                          đ
                        </p>
                      </div>
                    </Box>
                    {items.line_items?.length > 1 ? (
                      <div className="text-center text-gray-600 text-sm">
                        <p>Xem thêm {items.line_items?.length - 1} sản phẩm</p>
                      </div>
                    ) : null}
                    <Box
                      pt={2}
                      mt={2}
                      className="border-t border-gray-100"
                      flex
                      flexDirection="row"
                      alignContent="center"
                      justifyContent="flex-end"
                    >
                      <div className="mr-2">
                        <img
                          className="w-4 rounded-full"
                          src={API_CONSTANTS.APP_MINI_LOGO}
                          alt="logo_mini"
                        />
                      </div>
                      <div>
                        <p>
                          {items.line_items?.length} sản phẩm | Thành tiền:{" "}
                          <span className="text-red-600">
                            {items.total_price.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                            })}
                            đ
                          </span>
                        </p>
                      </div>
                    </Box>
                  </div>
                  <Box
                    mt={5}
                    flex
                    flexDirection="row"
                    alignContent="center"
                    justifyContent="space-between"
                  >
                    <p className="w-8/12 text-xs text-gray-600">
                      Đánh giá sản phẩm trước{" "}
                      {moment(items.review_expired_at).format("DD-MM-yyyy")}
                    </p>
                    <button
                      onClick={() => {
                        navigate("/rateOrder", { state: items });
                      }}
                      className="w-4/12 py-2 ml-3 rounded-sm text-white "
                      style={{
                        background:
                          theme !== "dark"
                            ? API_CONSTANTS.ICONIC_COLOR
                            : "#000000",
                        color: theme !== "dark" ? "#FFFFFF" : "#FFFFFF",
                      }}
                    >
                      Đánh giá
                    </button>
                  </Box>
                </List.Item>
              ))
            ) : (
              <div className="my-5 text-center">
                <p>Không có đơn hàng cần đánh giá</p>
              </div>
            )}

            {/* show more button  */}
            {dataForUnRate?.length >= 5 ? (
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
                    setShowMoreUnRate(!showMoreUnRate);
                  }}
                >
                  {showMoreUnRate ? "Hiển thị ít lại" : "Hiển thị thêm"}
                </Button>
              </List.Item>
            ) : null}
          </List>
        </Tabs.Tab>

        {/* TAB2 rated */}
        <Tabs.Tab key="tab2" label="Đã đánh giá">
          <List>
            {userOrder && dataForRate[0] ? (
              dataForRate.map((items: any) => (
                <List.Item
                  key={items.id}
                  style={{
                    background: theme !== "dark" ? "#FFFFFF" : "#141415",
                  }}
                  className="section-container"
                  onClick={() => {
                    setModalData(items);
                  }}
                >
                  <div>
                    {items.product_reviews.map((itemReview) => (
                      <div key={itemReview.id} className="pb-2 mb-2">
                        <div
                          onClick={() => {
                            setShowModal(true);
                          }}
                        >
                          <p className="font-semibold">
                            {itemReview.order_number}
                          </p>
                          <RatingStar ratingNumb={itemReview?.star_number} />
                          <h1 className="text-base">
                            {itemReview.product_name}
                          </h1>
                          <p>Nội dung: {itemReview.content_review}</p>
                        </div>
                        <div>
                          <Box
                            flex
                            flexDirection="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            mt={2}
                            onClick={() => {
                              setModalDataImg(itemReview);
                              setShowModalImg(true);
                            }}
                          >
                            {itemReview.images.map((itemImg) => (
                              <div
                                key={itemImg.id}
                                className="mr-1 w-16 h-16 rounded-lg overflow-hidden"
                              >
                                <img
                                  role="presentation"
                                  className="object-cover w-full h-full"
                                  src={itemImg.src}
                                  alt="customer-review-img"
                                />
                              </div>
                            ))}
                            {itemReview?.video_url ? (
                              <div className="border rounded-sm text-red-600">
                                <Icon icon="zi-play" size={60} />
                              </div>
                            ) : null}
                          </Box>
                        </div>
                        <div className="text-xs">
                          <p>
                            {moment(itemReview.created_at).format(
                              "DD-MM-yyyy | hh:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </List.Item>
              ))
            ) : (
              <div className="my-5 text-center">
                <p>Bạn chưa có đơn hàng nào</p>
              </div>
            )}

            {/* show more button  */}
            {userOrder?.length > 5 ? (
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
      </Tabs>
      {!userOrder && userOrder?.length == 0 && settingApp?.settings.show_buy ? (
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
            navigate("/");
          }}
        >
          Quay lại
        </Button>
      </div>
      {/* Modal rate detail  */}
      <>
        <M_RateDetail
          show={showModal}
          hidden={() => setShowModal(false)}
          data={modalData}
        />
      </>
      {/* Modal rate show img  */}
      <>
        <M_RateImg
          show={showModalImg}
          hidden={() => setShowModalImg(false)}
          data={modalDataImg}
        />
      </>
    </Page>
  );
};

export default Rate;
