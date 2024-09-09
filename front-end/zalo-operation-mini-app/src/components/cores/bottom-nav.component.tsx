import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BottomNavigation, Icon, Page, useNavigate } from "zmp-ui";
import { UserHelper } from "../../@app/helpers/user.helper";
import {
  getTotalUnread,
  updateAllNotifications,
} from "../../@app/api/notification.api";
import { localStorageKeys } from "../../@app/constants/local-storage-keys.constant";
import { getLocalStorage } from "../../@app/local-storage";
import RenderIf from "./render-if.component";
import { StringHelper } from "../../@app/helpers/string.helper";

const BottomNav = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  const [totalUnred, setTotalUnred] = useState<number>(0);

  const loadTotalUnred = async () => {
    let userPhone = await getLocalStorage(localStorageKeys.USER_PHONE);
    if (!StringHelper.isEmpty(userPhone)) {
      const { total } = await getTotalUnread(userPhone);
      setTotalUnred(total);
    }
  };

  const updateReadAll = async () => {
    let userPhone = await getLocalStorage(localStorageKeys.USER_PHONE);
    if (!StringHelper.isEmpty(userPhone)) {
      await updateAllNotifications(userPhone);
    }
  };

  useEffect(() => {
    loadTotalUnred();
    setInterval(() => {
      loadTotalUnred();
    }, 60000);
  }, []);

  return (
    <BottomNavigation
      fixed
      activeKey={location.pathname}
      onChange={(key) => setActiveTab(key)}
    >
      <BottomNavigation.Item
        key="/history-list"
        label="Lịch sử"
        icon={<Icon icon="zi-clock-1" />} // Hủy interval khi component bị unmount để tránh rò rỉ bộ nhớ
        activeIcon={<Icon icon="zi-clock-1-solid" />}
        onClick={() => navigate("/history-list")}
      />

      <BottomNavigation.Item
        key="/ticket-manager"
        label="Phiếu của tôi"
        icon={<Icon icon="zi-list-1" />}
        activeIcon={<Icon icon="zi-list-1" />}
        onClick={() => navigate("/ticket-manager")}
      />
      <BottomNavigation.Item
        key="/"
        label="HOME"
        icon={<Icon icon="zi-home" />}
        activeIcon={<Icon icon="zi-home" />}
        onClick={() => navigate("/")}
      />
      <BottomNavigation.Item
        key="/notification"
        label="Thông báo"
        icon={
          <div className="relative">
            <Icon icon="zi-notif-ring" />
            <RenderIf
              condition={totalUnred > 0}
              ifTrue={
                <span className="absolute -right-3 -top-1 rounded-full bg-red-500 bg-opacity-90 px-2 text-[10px] text-white">
                  {totalUnred}
                </span>
              }
              ifFalse={null}
            />
          </div>
        }
        activeIcon={<Icon icon="zi-notif" />}
        onClick={() => {
          navigate("/notification");
          updateReadAll();
        }}
      />
      <BottomNavigation.Item
        key="/user"
        label="Tôi"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user-solid" />}
        onClick={() => navigate("/user")}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
