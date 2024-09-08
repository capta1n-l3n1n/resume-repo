import React, { useEffect } from "react";
import {
  Button,
  Page,
  Text,
  useNavigate,
  Box,
  useTheme,
  useSnackbar,
  Tabs,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../../components/app/hooks";
import { getStorage, openWebview } from "zmp-sdk";
import { fetchUserByPhone, fetchUserByPhoneHRV } from "../User/redux/action";
import moment from "moment";
import API_CONSTANTS from "../../../../assets-src/constants/api";

const RewardPoint: React.FunctionComponent = () => {
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [theme] = useTheme();
  const [showMore, setShowMore] = React.useState(false);
  const [showMoreHRV, setShowMoreHRV] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const settingApp: any = useAppSelector((state) => state.user.setting);
  console.log("userPoint", userPoint);

  const dataForDisplay =
    userPoint && userPoint?.rewardPointsHistory && showMore
      ? userPoint?.rewardPointsHistory
      : userPoint?.rewardPointsHistory?.slice(0, 5);
  const dataForDisplayHRV =
    userPointHRV && userPointHRV?.history_points && showMoreHRV
      ? userPointHRV?.history_points
      : userPointHRV?.history_points?.slice(0, 5);

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
  const getData = () => {
    getStorage({
      keys: ["userInfo", "userNumber", "userPoint"],
      success: async (data) => {
        const { userInfo, userNumber, userPoint } = data;
        if (userPoint?.phone) {
          await dispatch(fetchUserByPhoneHRV(userPoint?.phone));
          await dispatch(fetchUserByPhone(userPoint?.phone));
          return;
        }
        await dispatch(fetchUserByPhone(userNumber));
        await dispatch(fetchUserByPhoneHRV(userNumber));
        return;
      },
      fail: (error) => {},
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Page className="page">
      <div
        style={{
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <Text.Title className="text-center my-3" size="normal">
          Lịch sử điểm{" "}
        </Text.Title>
        <p>
          • Tích lũy website:{" "}
          <span className="text-red-700">
            {userPointHRV?.total_point?.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            }) ?? 0}
          </span>
        </p>
        <p>
          • Tích lũy cửa hàng:{" "}
          <span className="text-red-700">
            {userPoint?.points?.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            }) ?? 0}
          </span>
        </p>
        <Tabs>
          {/* TAB1 point web*/}
          <Tabs.Tab key="tab1" label="Trên website">
            <Box
              style={{
                background: theme !== "dark" ? "#2C2C2C" : "#a7a4a4",
                color: theme !== "dark" ? "#FFFFFF" : "#000000",
              }}
              className="rounded-tl-lg rounded-tr-lg text-base"
              pr={1}
              py={4}
              flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box pl={5} className="w-9/12 font-semibold">
                Chi tiết
              </Box>
              <Box textAlign="center" className="w-3/12 font-semibold">
                Biến động
              </Box>
            </Box>
            {userPointHRV && userPointHRV
              ? dataForDisplayHRV.map((items) => (
                  <Box
                    key={items.created_at}
                    py={4}
                    className="border-solid border-t-2"
                    flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box pl={5} className="w-7/12">
                      <p>
                        {items.event_type === "member/enable"
                          ? "Kích hoạt thành viên"
                          : items.event_type === "member/update_name"
                          ? "Cập nhật thông tin họ tên"
                          : items.event_type === "member/update_phone"
                          ? "Cập nhật thông tin sdt"
                          : items.event_type === "member/update_birthday"
                          ? "Cập nhật thông tin ngày sinh"
                          : items.event_type === "member/update_email"
                          ? "Cập nhật thông tin email"
                          : items.event_type === "member/update_behavior"
                          ? "Cập nhật thông tin thêm"
                          : items.event_type === "member/update_gender"
                          ? "Cập nhật giới tính"
                          : items.event_type === "member/rollcall"
                          ? "Điểm danh hằng ngày"
                          : items.event_type === "member/oafollow"
                          ? "Theo dõi trang OA"
                          : items.event_type === "member/mgm"
                          ? "Giới thiệu khách hàng"
                          : items.event_type === "order/paid"
                          ? "Thanh toán đơn hàng"
                          : items.event_type === "review/no_img_approved"
                          ? "Duyệt Đánh giá không image"
                          : items.event_type === "review/has_img_approved"
                          ? "Duyệt Đánh giá có image"
                          : items.event_type === "review/has_attributes"
                          ? "Duyệt Đánh giá có cung cấp thêm thông tin"
                          : items.event_type === "reward/coupon"
                          ? "Đổi coupon"
                          : items.event_type === "customer/total_point"
                          ? "Điểm tích lũy đầu kì"
                          : items.event_type === "customer/total_spent"
                          ? "Đồng bộ điểm chi tiêu"
                          : items.event_type}
                      </p>
                      <p>
                        {moment(items.created_at).format("DD/MM/YYYY - kk:mm")}
                      </p>
                    </Box>
                    <Box textAlign="center" className="w-3/12">
                      {items.point}
                    </Box>
                  </Box>
                ))
              : null}
            {!userPointHRV?.history_points && settingApp?.settings.show_buy ? (
              <div className="text-center mt-5 border-2 border-dashed py-3">
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
            ) : null}
            {/* showMore BTN  */}
            {dataForDisplayHRV?.length >= 5 ? (
              <div>
                <Button
                  style={{
                    background:
                      theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
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
              </div>
            ) : null}
          </Tabs.Tab>

          {/* TAB2 point off */}
          <Tabs.Tab key="tab2" label="Đổi tại cửa hàng">
            <Box
              style={{
                background: theme !== "dark" ? "#2C2C2C" : "#a7a4a4",
                color: theme !== "dark" ? "#FFFFFF" : "#000000",
              }}
              className="rounded-tl-lg rounded-tr-lg text-base"
              pr={1}
              py={4}
              flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box pl={5} className="w-9/12 font-semibold">
                Chi tiết
              </Box>
              <Box textAlign="center" className="w-3/12 font-semibold">
                Biến động
              </Box>
            </Box>
            {userPoint?.rewardPointsHistory && userPoint
              ? dataForDisplay.map((items) => (
                  <Box
                    key={items.created_at}
                    py={4}
                    className="border-solid border-t-2"
                    flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box pl={5} className="w-7/12">
                      <p>
                        {items.eventType === "Xuất"
                          ? "Mua hàng"
                          : items.eventType === "Nhập"
                          ? "Hoàn trả hàng"
                          : items.eventType === "Lỗi"}
                      </p>
                      <p>
                        {moment(items.created_at).format("DD/MM/YYYY - kk:mm")}
                      </p>
                    </Box>
                    <Box textAlign="center" className="w-3/12">
                      {items.points}
                    </Box>
                  </Box>
                ))
              : null}
            {!userPoint?.rewardPointsHistory &&
            settingApp?.settings.show_buy ? (
              <div className="text-center mt-5 border-2 border-dashed py-3">
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
            ) : null}
            {/* showMore BTN  */}
            {dataForDisplay?.length >= 5 ? (
              <div>
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
              </div>
            ) : null}
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
    </Page>
  );
};

export default RewardPoint;
