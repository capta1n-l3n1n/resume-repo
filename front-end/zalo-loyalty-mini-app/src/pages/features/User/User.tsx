import React, { useEffect } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  useNavigate,
  useSnackbar,
  useTheme,
  Spinner,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import {
  getAccessToken,
  getPhoneNumber,
  getStorage,
  setStorage,
} from "zmp-sdk";
import { fetchUserByPhone, fetchUserInfoZalo } from "./redux/action";
import { useAppDispatch, useAppSelector } from "../../../components/app/hooks";
import SwitchTheme from "../../../components/switchTheme";
import { fetchOrdered } from "../TrackingItem/redux/action";
import API_CONSTANTS from "../../../../assets-src/constants/api";
import { postActivity } from "../common/redux/action";

const UserPage = () => {
  const [theme] = useTheme();
  const [spinner, setSpinner] = React.useState(false);
  const [accessTokenState, setAccessToken] = React.useState("");
  const [userNumberState, setUserNumberState] = React.useState("");

  // const user = useRecoilValue<userInfo>(userState);
  const userInfoState: any = useAppSelector((state) => {
    return state.user.userInfo;
  });
  const userNumber: any = useAppSelector((state) => {
    return state.user.userNumber;
  });
  const userPoint: any = useAppSelector((state) => {
    return state.user.userPoint;
  });
  const userPointHRV: any = useAppSelector((state) => {
    return state.user.userPointHRV;
  });

  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // set UserNumber to storage
  const setUserNumberStorage = (value: string) => {
    if (userNumber != "") {
      setStorage({
        data: {
          userNumber: value,
        },
        success: (data) => {
          const { errorKeys } = data;
        },
        fail: (error) => {},
      });
    }
    if (userPoint?.name) {
      setStorage({
        data: {
          userPoint: userPoint,
        },
        success: (data) => {
          const { errorKeys } = data;
        },
        fail: (error) => {},
      });
    }
  };

  //access token
  const getUserAccessToken = () => {
    getAccessToken({
      success: (accessToken) => {
        if (accessToken) {
          setAccessToken(accessToken);
        }
      },
      fail: (error) => {},
    });
  };
  //token/code
  const getUserToken = () => {
    getPhoneNumber({
      success: async (data) => {
        let { token } = data;
        setSpinner(true);
        if (token) {
          await dispatch(fetchUserInfoZalo(token, accessTokenState));
          dispatch(fetchUserByPhone(userNumber));
          setUserNumberStorage(userNumber);
          if (userPoint?.phone) {
            setUserNumberStorage(userPoint?.phone);
          }
          if (userPoint?.isFirstLogin) {
            dispatch(postActivity(userPoint?.phone ?? userNumber, "REGISTER"));
          }
          navigate("/trackingItem");
        }
        setSpinner(false);
      },
      fail: (error) => {
        openSnackbar({
          duration: 1500,
          position: "top",
          text: "Vui lòng cho phép truy cập số điện thoại để sử dụng tính năng này",
          type: "warning",
        });
      },
    });
  };

  const getData = () => {
    getStorage({
      keys: ["userNumber", "userPoint"],
      success: (data) => {
        const { userNumber, userPoint } = data;
        if (userNumber) {
          setUserNumberState(userNumber);
        }

        dispatch(fetchUserByPhone(userNumber));
        dispatch(fetchUserByPhone(userPoint?.phone));
      },
      fail: (error) => {},
    });
  };
  useEffect(() => {
    getData();
    dispatch(fetchUserByPhone(userNumber));
    dispatch(fetchUserByPhone(userPoint?.phone));
    setUserNumberStorage(userNumber);
  }, [userNumber]);
  useEffect(() => {
    getData();
    dispatch(fetchUserByPhone(userNumber));
    dispatch(fetchUserByPhone(userPoint?.phone));
    getUserAccessToken();
    setUserNumberStorage(userNumber);
  }, []);

  return (
    <Page className="page mt-5 relative">
      {/* <Header
        onBackClick={() => {
          navigate(-1);
        }}
        style={{ background: theme !== "dark" ? "#FFFFFF" : "#000000" }}
        title="Blucore"
      ></Header> */}
      <Box
        className="relative"
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Avatar story="default" size={96} online src={userInfoState?.avatar}>
            {userInfoState?.avatar}
          </Avatar>
        </Box>

        <div className="absolute top-0 left-0">
          <SwitchTheme />
        </div>
      </Box>
      <Box m={0} p={0} mt={4}>
        <div
          style={{ background: theme !== "dark" ? "#FFFFFF" : "#141415" }}
          className="section-container"
        >
          <List>
            <List.Item
              title="Tên"
              subTitle={
                userInfoState?.name != ""
                  ? userInfoState?.name
                  : userPoint?.name != ""
                  ? userPoint?.name
                  : userPointHRV?.name != ""
                  ? userPointHRV?.name
                  : "Đang cập nhật..."
              }
            />
            <List.Item
              title="SĐT"
              subTitle={
                userNumber
                  ? userNumber
                  : userNumberState
                  ? userNumberState
                  : "Vui lòng cho phép truy cập SĐT để định danh"
              }
            />
            <List.Item
              title="Ngày sinh"
              subTitle={userPoint?.birthday ?? "Không có dữ liệu"}
            />
            <List.Item
              title="Tuổi"
              subTitle={userPoint?.age ?? "Không có dữ liệu"}
            />
            <List.Item
              title="Giới tính"
              subTitle={
                userPoint?.gender == "No Info"
                  ? "Không có dữ liệu"
                  : userPoint?.gender
              }
            />
            <List.Item
              title="Địa chỉ"
              subTitle={userPoint?.address ?? "Không có dữ liệu"}
            />
            {/* <List.Item
              title="Tiện ích"
              subTitle="Theo dõi page để nhận thêm nhiều ưu đãi"
            >
              <Box
                mt={5}
                flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <button
                  className="w-3/6 text-xs"
                  onClick={async () => {
                    if (!userNumber || !userPoint?.phone) {
                      getUserToken();
                      dispatch(fetchUserByPhone(userNumber));
                      dispatch(fetchOrdered(userPoint?.phone));

                      return setUserNumberStorage(userNumber);
                    }
                    getStorage({
                      keys: ["userNumber", "userPoint"],
                      success: async (data) => {
                        const { userNumber, userPoint } = data;
                        setSpinner(true);
                        if (userNumber) {
                          await dispatch(fetchUserByPhone(userNumber));
                          setSpinner(false);
                          return navigate("/trackingItem");
                        }
                        if (userPoint?.phone) {
                          dispatch(fetchUserByPhone(userPoint?.phone));
                          dispatch(fetchOrdered(userPoint?.phone));
                          setSpinner(false);
                          return navigate("/trackingItem");
                        }
                        setSpinner(false);
                      },
                      fail: (error) => {
                        if (userNumber || userPoint?.phone) {
                          getUserToken();
                          dispatch(fetchUserByPhone(userNumber));
                          dispatch(fetchUserByPhone(userPoint?.phone));
                          navigate("/trackingItem");
                        }
                      },
                    });
                  }}
                >
                  <FontAwesomeIcon
                    className="text-xl w-6 h-6"
                    icon={faCartShopping}
                  />
                  <p> Đơn hàng đã đặt</p>
                </button>
                <button
                  className="text-xs w-3/6"
                  onClick={() => {
                    navigate("/userAttendance");
                  }}
                >
                  <Icon icon="zi-check-circle-solid"></Icon>
                  <p>Điểm danh</p>
                </button>
              </Box>
            </List.Item> */}
            <Button
              fullWidth
              style={{
                background: API_CONSTANTS.ICONIC_COLOR,
              }}
              onClick={async () => {
                if (!userNumber || !userPoint?.phone) {
                  getUserToken();

                  return setUserNumberStorage(userNumber);
                }
                getStorage({
                  keys: ["userNumber", "userPoint"],
                  success: async (data) => {
                    const { userNumber, userPoint } = data;
                    if (userNumber) {
                      await dispatch(fetchUserByPhone(userNumber));
                      return getUserToken();
                    }
                    if (userPoint?.phone || userPoint?.id) {
                      dispatch(fetchUserByPhone(userPoint?.phone));
                      dispatch(fetchOrdered(userPoint?.phone));
                      return getUserToken();
                    }
                  },
                  fail: (error) => {
                    if (userNumber || userPoint?.phone) {
                      getUserToken();
                      dispatch(fetchUserByPhone(userNumber));
                      dispatch(fetchUserByPhone(userPoint?.phone));
                    }
                  },
                });
              }}
            >
              Xem đơn hàng đã đặt
            </Button>
          </List>
        </div>
      </Box>
      <div className="absolute md:top-1/3 top-1/2 -translate-x-1/2 left-1/2">
        <Spinner visible={spinner} logo={API_CONSTANTS.APP_MINI_LOGO} />
      </div>
    </Page>
  );
};

export default UserPage;
