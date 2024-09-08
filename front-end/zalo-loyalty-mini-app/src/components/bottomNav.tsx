import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { openChat } from "zmp-sdk/apis";
import { BottomNavigation, Icon, useNavigate, useSnackbar } from "zmp-ui";
import API_CONSTANTS from "../../assets-src/constants/api";
import { openWebview } from "zmp-sdk";
import "./css/bottomNavCss.css";
import {
  fetchUserByPhone,
  fetchAppSetting,
} from "../pages/features/User/redux/action";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useLocation } from "react-router-dom";
import { postActivity } from "../pages/features/common/redux/action";

const BottomNavigationPage: React.FunctionComponent = () => {
  const location = useLocation();

  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState("/");
  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  const settingApp: any = useAppSelector((state) => state.user.setting);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
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
    dispatch(fetchUserByPhone(userPoint?.phone));
    dispatch(fetchAppSetting(API_CONSTANTS.APPV));
  }, []);
  return (
    <div className="bottomNav">
      <BottomNavigation
        id={activeTab}
        defaultActiveKey="/"
        fixed
        activeKey={`${
          activeTab === "mes" || activeTab === "contact" || activeTab === "buy"
            ? activeTab
            : location.pathname
        }`}
        onChange={(key) => {
          setActiveTab(key);
        }}
      >
        {/* contact  */}
        <BottomNavigation.Item
          onClick={() => {
            dispatch(
              postActivity(
                userPoint?.phone ?? userPointHRV?.phone,
                "CLICK_CALL"
              )
            );
            parent.open(`tel:${API_CONSTANTS.PHONE_SHOP}`);
            setActiveTab("contact");
            setTimeout(() => {
              setActiveTab("/");
              navigate("/");
            }, 1000);
          }}
          key="contact"
          label={<p>Tổng đài</p>}
          icon={<Icon icon="zi-call" />}
          activeIcon={<Icon icon="zi-call-solid" />}
        />

        {/* chatOA  */}
        <BottomNavigation.Item
          onClick={() => {
            dispatch(
              postActivity(
                userPoint?.phone ?? userPointHRV?.phone,
                "CLICK_CHAT"
              )
            );
            openChat({
              message: "",
              type: "oa",
              id: API_CONSTANTS.ID_ZALO_OA,
              success: () => {
                setActiveTab("mes");
                setTimeout(() => {
                  setActiveTab("/");
                  navigate("/");
                }, 1000);
              },
              fail: (err) => {},
            });
          }}
          key="mes"
          label={<p>Tin nhắn</p>}
          icon={<Icon icon="zi-chat" />}
          activeIcon={<Icon icon="zi-chat-solid" />}
        />

        {/* HOME  */}
        <BottomNavigation.Item
          onClick={() => {
            navigate("/");
          }}
          label={<p className="font-semibold">HOME</p>}
          key="/"
          icon={<Icon className="h-6 w-6" icon="zi-home" />}
        />

        {/* website  */}
        {settingApp && settingApp.settings.show_buy ? (
          <BottomNavigation.Item
            onClick={() => {
              // setModalVisible(true);
              setActiveTab("buy");
              try {
                openSnackbar({
                  icon: true,
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
              setTimeout(() => {
                setActiveTab("index");
                navigate("/");
              }, 1000);
            }}
            label="Mua hàng"
            key="buy"
            icon={
              <FontAwesomeIcon
                className="text-xl mt-0.5 jiggle-animation"
                icon={faCartShopping}
              />
            }
          />
        ) : null}

        {/* user  */}
        <BottomNavigation.Item
          onClick={() => {
            navigate("/user");
          }}
          key="/user"
          label="Cá nhân"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNavigationPage;
