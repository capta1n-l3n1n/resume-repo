import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Sheet,
  Text,
  Box,
  Icon,
  useSnackbar,
  useTheme,
  Spinner,
  BottomNavigation,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getPhoneNumber,
  getStorage,
  setStorage,
} from "zmp-sdk/apis";
import { fetchUserByPhone, fetchUserInfoZalo } from "./User/redux/action";
import { clearStorage, openWebview } from "zmp-sdk";
import API_CONSTANTS from "../../../assets-src/constants/api";
import { postActivity } from "./common/redux/action";

const FuntionBtn: React.FunctionComponent = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tokenState, setToken] = useState("");
  const [accessTokenState, setAccessToken] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [theme] = useTheme();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
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
  const settingApp: any = useAppSelector((state) => state.user.setting);

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
  const handleVerifyClick = (url: string) => {
    if (!userNumber || !userPoint?.phone) {
      getUserToken(url);
      return setUserNumberStorage(userNumber);
    }
    getStorage({
      keys: ["userNumber", "userPoint"],
      success: (data) => {
        const { userNumber, userPoint } = data;
        if (userNumber) {
          // getData();
          dispatch(fetchUserByPhone(userNumber));
          return getUserToken(url);
        }
        if (userPoint?.phone) {
          dispatch(fetchUserByPhone(userPoint?.phone));
          return getUserToken(url);
        }
      },
      fail: (error) => {
        if (userNumber || userPoint?.phone) {
          getData();
          getUserToken(url);
        }
      },
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
          setUserNumberStorage(userPoint?.phone ?? userNumber);
          // if (userPoint?.phone) {
          //   setUserNumberStorage(userPoint?.phone);
          // }
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
    if (userPoint?.phone) {
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
  //get data from storage
  const getData = () => {
    getStorage({
      keys: ["userNumber", "userPoint"],
      success: (data) => {
        const { userNumber, userPoint } = data;

        dispatch(fetchUserByPhone(userNumber));
        dispatch(fetchUserByPhone(userPoint?.phone));
      },
      fail: (error) => {},
    });
  };
  //get phone number client
  // const getUserNumber = async () => {
  //   // getUserToken();
  //   setUserNumberStorage(userNumber);
  //   if (userPoint) {
  //     setUserNumberStorage(userPoint?.phone);
  //   }
  // };
  useEffect(() => {
    getData();
    getUserAccessToken();
    dispatch(fetchUserByPhone(userNumber));
    dispatch(fetchUserByPhone(userPoint?.phone));
    setUserNumberStorage(userNumber);
  }, [userNumber]);
  useEffect(() => {
    getData();
    setUserNumberStorage(userNumber);
  }, []);

  return (
    <div className="relative md:py-20">
      <Box
        flex
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        mb={10}
      >
        <Box
          className="text-center"
          onClick={() => {
            handleVerifyClick("/reward");
          }}
        >
          <button>
            <Icon icon="zi-favorite-list"></Icon>
            <p>Đổi thưởng</p>
          </button>
        </Box>
        <Box
          className="text-center"
          onClick={() => {
            handleVerifyClick("/userReward");
          }}
        >
          <button>
            <Icon icon="zi-user-circle"></Icon>
            <p>Ưu đãi của tôi</p>
          </button>
        </Box>
      </Box>
      <Box
        flex
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        pb={10}
        pt={5}
      >
        <Box
          className="text-center"
          onClick={() => {
            handleVerifyClick("/trackingItem");
          }}
        >
          <button>
            <Icon icon="zi-list-1"></Icon>
            <p>Theo dõi đơn hàng</p>
          </button>
        </Box>
        <Box
          onClick={async () => {
            handleVerifyClick("/rate");
          }}
          className="text-center"
        >
          <button>
            <Icon icon="zi-heart"></Icon>
            <p>Đánh giá đơn hàng</p>
          </button>
        </Box>
      </Box>
      {settingApp && settingApp.settings.show_buy ? (
        <Box
          flex
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          pb={10}
          pt={5}
        >
          <Box
            className="text-center"
            onClick={() => {
              try {
                openSnackbar({
                  icon: true,
                  duration: 2000,
                  text: `Đang chuyển hướng tới ${API_CONSTANTS.NAME_SHOP}...`,
                  type: "loading",
                  position: "top",
                });
                openUrlInWebview(API_CONSTANTS.WEBSITE_STORE);
              } catch (error) {
                openSnackbar({
                  duration: 2000,
                  text: "Điều hướng không thành công",
                  type: "warning",
                  position: "top",
                });
              }
              // setTimeout(() => {
              //   navigate("/");
              // }, 1000);
            }}
          >
            <button>
              <Icon icon="zi-location"></Icon>
              <p>Hệ thống cửa hàng</p>
            </button>
          </Box>
          <Box
            onClick={() => {
              try {
                openSnackbar({
                  icon: true,
                  duration: 2000,
                  text: `Đang chuyển hướng tới ${API_CONSTANTS.NAME_SHOP}...`,
                  type: "loading",
                  position: "top",
                });
                openUrlInWebview(API_CONSTANTS.WEBSITE_TERM);
              } catch (error) {
                openSnackbar({
                  duration: 2000,
                  text: "Điều hướng không thành công",
                  type: "warning",
                  position: "top",
                });
              }
              // setTimeout(() => {
              //   navigate("/");
              // }, 1000);
            }}
            className="text-center"
          >
            <button>
              <Icon icon="zi-help-circle"></Icon>
              <p>Chính sách bán hàng</p>
            </button>
          </Box>
        </Box>
      ) : null}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-xs">
        <Spinner visible={spinner} logo={API_CONSTANTS.APP_MINI_LOGO} />
      </div>
      {/* 
      <Button
        onClick={() => {
          clearStorage({
            success: () => {
              // xử lý khi gọi api thành công
            },
            fail: (error) => {
              // xử lý khi gọi api thất bại
            },
          });
        }}
      >
        Del cache (for testing)
      </Button> */}
    </div>
  );
};
export default FuntionBtn;
