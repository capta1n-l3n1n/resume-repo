import React, { useEffect, useState } from "react";
import {
  Icon,
  useNavigate,
  useTheme,
  Box,
  Avatar,
  Text,
  useSnackbar,
  Spinner,
} from "zmp-ui";
import {
  closeApp,
  followOA,
  getAccessToken,
  getPhoneNumber,
  getStorage,
  getUserInfo,
} from "zmp-sdk";
// import UserCard from "../components/user-card";
import { ModalFollow } from "./features/modalFollow";
import { useAppDispatch, useAppSelector } from "../components/app/hooks";
import {
  fetchUserByPhone,
  fetchUserByPhoneHRV,
  fetchUserInfoZalo,
  postFollowOA,
} from "./features/User/redux/action";
import actions from "./features/User/redux/type";
import { openPostFeed, openShareSheet, setStorage } from "zmp-sdk/apis";
import API_CONSTANTS from "../../assets-src/constants/api";
import { sendNotiOpenAPI } from "../components/openAPI/redux/action";
import FuntionBtn from "./features/FuntionBtn";
import { useLocation } from "react-router-dom";
import { postActivity } from "./features/common/redux/action";

const HomePage: React.FunctionComponent = () => {
  // const user = useRecoilValue<userInfo>(userState);

  const navigate = useNavigate();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [theme, setTheme] = useTheme();
  const [spinner, setSpinner] = useState(false);
  const [tokenState, setToken] = useState("");
  const [follow, setFollow] = useState(false);
  const [accessTokenState, setAccessToken] = useState("");
  const location = useLocation();
  // path=location.pathname

  const dispatch = useAppDispatch();
  const userInfoState: any = useAppSelector((state) => {
    console.log("state", state.user.userInfo);

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
  const getUserToken = (input: string) => {
    getPhoneNumber({
      success: async (data) => {
        let { token } = data;
        setSpinner(true);
        if (token) {
          setToken(token);
          await dispatch(fetchUserInfoZalo(token, accessTokenState));
          setUserInfoToStorage();
          if (userPoint?.name) {
            setUserInfoToStorage();
          }
          if (userPoint?.isFirstLogin) {
            dispatch(postActivity(userPoint?.phone ?? userNumber, "REGISTER"));
          }
          navigate(String(input));
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
  const handleRewardPointClick = () => {
    if (!userNumber || !userPoint?.phone) {
      getUserToken("/rewardPoint");
      return setUserInfoToStorage();
    }
    getStorage({
      keys: ["userNumber", "userPoint"],
      success: async (data) => {
        const { userNumber, userPoint } = data;
        await dispatch(fetchUserByPhone(userNumber ?? userPoint?.phone));
        await dispatch(fetchUserByPhoneHRV(userNumber ?? userPoint?.phone));

        return getUserToken("/rewardPoint");

        // if (userPoint?.phone) {
        //   await dispatch(fetchUserByPhone(userPoint?.phone));
        //   await dispatch(fetchUserByPhoneHRV(userPoint?.phone));
        //   return getUserToken("/rewardPoint");
        // }
      },
      fail: (error) => {
        if (userNumber || userPoint?.phone) {
          getData();
          getUserToken("/rewardPoint");
        }
      },
    });
  };

  const getData = () => {
    getStorage({
      keys: ["userNumber", "userPoint", "themeMode", "followOA"],
      success: async (data) => {
        const { userNumber, userPoint, themeMode, followOA } = data;
        if (followOA === "true") {
          setFollow(true);
        }
        await dispatch(fetchUserByPhone(userNumber ?? userPoint?.phone));
        await dispatch(fetchUserByPhoneHRV(userNumber ?? userPoint?.phone));
        if (themeMode === "light") {
          return setTheme({ mode: "dark" });
        }
        setTheme({ mode: "light" });
      },
      fail: (error) => {},
    });
  };
  const setUserInfoToStorage = () => {
    if (userNumber != "") {
      setStorage({
        data: {
          userNumber: userNumber,
        },
        success: (data) => {
          const { errorKeys } = data;
        },
        fail: (error) => {},
      });
    }
    if (userPoint?.name || userPoint?.phone) {
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
    setStorage({
      data: {
        userInfo: userInfoState,
      },
      success: (data) => {
        const { errorKeys } = data;
      },
      fail: (error) => {},
    });
  };
  //getUser Zalo basic info
  const getUser = () => {
    getUserInfo({
      avatarType: "small",
      success: (data) => {
        const { userInfo } = data;
        dispatch({ type: actions.SET_USER, payload: userInfo });
      },
      fail: (error) => {},
    });
  };
  //catch logout
  const handleLogActivity = async () => {
    closeApp({
      success: () => {
        // xử lý khi gọi api thành công
        console.log("logout thành công");
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };
  useEffect(() => {
    getData();
    getUserAccessToken();
    dispatch(fetchUserByPhone(userNumber));
    dispatch(fetchUserByPhone(userPoint?.phone));
    dispatch(fetchUserByPhoneHRV(userPoint?.phone));
    dispatch(fetchUserByPhoneHRV(userNumber));
    setUserInfoToStorage();
  }, [userNumber]);

  useEffect(() => {
    getUser();
    getData();
    dispatch(fetchUserByPhone(userNumber));
    dispatch(fetchUserByPhone(userPoint?.phone));
    dispatch(fetchUserByPhoneHRV(userPoint?.phone));
    dispatch(fetchUserByPhoneHRV(userNumber));

    setUserInfoToStorage();
    getStorage({
      keys: ["userNumber", "userPoint"],
      success: async (data) => {
        const { userNumber, userPoint } = data;
        if (!userPoint?.isFirstLogin) {
          dispatch(postActivity(userNumber ?? userPoint?.phone, "LOGIN"));
        }
      },
      fail: (error) => {},
    });
  }, []);
  useEffect(() => {
    {
      getStorage({
        keys: ["followOA"],
        success: (data) => {
          const { followOA } = data;
          if (followOA === "true") {
            setFollow(true);
          }
        },
        fail: (error) => {},
      });
    }
  });
  return (
    <>
      <div
        className="homePage h-auto relative"
        style={{
          padding: "16px",
          margin: "16px",
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{ background: theme !== "dark" ? "#FFFFFF" : "#141415" }}
          className="section-container"
        >
          <Box
            flex
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box>
              <Avatar
                online
                size={72}
                backgroundColor="PURPLE-BLUE"
                onClick={() => {
                  navigate("/user");
                }}
                src={userInfoState?.avatar}
              />
            </Box>

            <Box>
              <Text.Title size="small" className="text-base">
                Xin chào
                <p
                  style={{
                    color: API_CONSTANTS.ICONIC_COLOR,
                  }}
                  className="text-lg"
                >
                  {userInfoState?.name}
                </p>
              </Text.Title>
              {(userPoint && userPoint?.isFollow) || follow ? (
                <Text style={{ marginTop: ".5rem" }}>
                  <Icon className="text-green-800" icon="zi-shield-solid" />
                  <span className="font-semibold ml-1">
                    {API_CONSTANTS.NAME_SHOP}{" "}
                    <span className="italic font-light text-xs">
                      (Đã theo dõi)
                    </span>
                  </span>
                </Text>
              ) : (
                <Text style={{ marginTop: ".5rem" }}>
                  <Icon className="text-gray-400" icon="zi-shield-solid" />
                  <span className="font-semibold ml-1">
                    {API_CONSTANTS.NAME_SHOP} <br />
                    <div className="text-center">
                      <span className="italic font-light text-xs">
                        (Chưa theo dõi)
                      </span>
                    </div>
                  </span>
                </Text>
              )}
            </Box>
            {(userPoint && userPoint?.isFollow) || follow ? null : (
              <Box>
                <button
                  onClick={() => {
                    followOA({
                      id: API_CONSTANTS.ID_ZALO_OA,
                      success: async () => {
                        getStorage({
                          keys: ["userNumber", "userPoint"],
                          success: async (data) => {
                            const { userNumber, userPoint } = data;
                            dispatch(
                              postFollowOA(userNumber ?? userPoint?.phone)
                            );
                          },
                          fail: (error) => {},
                        });
                        dispatch(fetchUserByPhone(userPoint?.phone));
                        dispatch(fetchUserByPhoneHRV(userPoint?.phone));
                        setFollow(true);
                        openSnackbar({
                          duration: 1500,
                          position: "top",
                          text: "Theo dõi thành công",
                          type: "success",
                        });
                      },
                      fail: (err) => {
                        openSnackbar({
                          position: "top",
                          text: "Cập nhật phiên bản Zalo mới nhất hoặc xác thực số điện thoại",
                          type: "error",
                        });
                      },
                    });
                  }}
                >
                  <img
                    src="https://file.hstatic.net/200000219339/file/group_10065_92624589e1fe408aa307ec79687eb122.svg"
                    alt="follow_icon"
                  />
                </button>
              </Box>
            )}
          </Box>
          <div
            style={{
              background: theme !== "dark" ? "#DCDCDC" : "#000000",
              color: theme !== "dark" ? "#000000" : "#FFFFFF",
            }}
            className="py-1 mt-5 text-center rounded-lg relative cursor-pointer"
            onClick={() => {
              handleRewardPointClick();
            }}
          >
            <p className="absolute right-2 top-1/2 -translate-y-1/2">
              <Icon
                icon="zi-chevron-right"
                className="text-xl font-bold"
                style={{ color: API_CONSTANTS.ICONIC_COLOR }}
              />
            </p>
            <p>
              Tổng điểm đã tích lũy:{" "}
              <span className="text-red-700">
                {(
                  Number(userPoint?.points ?? 0) +
                  Number(userPointHRV?.total_point ?? 0)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </span>
            </p>

            <p>
              Hạng:{" "}
              <span className="text-red-700">
                {userPoint?.level ?? "Đang cập nhật..."}
              </span>
            </p>
          </div>
        </div>
        <>
          <FuntionBtn />
        </>
      </div>
      <>
        <ModalFollow />
      </>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 max-w-xs">
        <Spinner visible={spinner} logo={API_CONSTANTS.APP_MINI_LOGO} />
      </div>
    </>
  );
};

export default HomePage;
