import React, { StrictMode, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { getAppSetting } from "../../@app/api/app-setting.api";
import { localStorageKeys } from "../../@app/constants/local-storage-keys.constant";
import { getLocalStorage } from "../../@app/local-storage";
import HomePage from "../../pages/index.page";
import UserPage from "../../pages/user.page";
import TicketManagerPage from "../../pages/ticket-manager.page";
import PermissionPopup from "../permission-popup.component";
import BottomNav from "./bottom-nav.component";
import NotificationPopup from "./notification-popup.component";
import ToastMessage from "./toast-message.component";
import HistoryList from "../../pages/history-list.page";
import NotificationPage from "../../pages/notification.page";
import AdminManage from "../../pages/admin-manage.page";

const MyApp = () => {
  const [showPermisionPopup, setShowPermisionPopup] = useState(false);

  const initComponent = async () => {
    const { setting } = await getAppSetting();
    const isAuthorized = await getLocalStorage(localStorageKeys.IS_AUTHORIZED);
    console.log(
      `isAuthorized: ${isAuthorized} - setting: ${setting.openPermissionPopup}`,
    );
    if (!setting.openPermissionPopup || isAuthorized) {
      return;
    }
    setShowPermisionPopup(true);
  };

  useEffect(() => {
    initComponent();
  }, [showPermisionPopup]);

  return (
    <RecoilRoot>
      <App>
        {showPermisionPopup && <PermissionPopup />}
        <SnackbarProvider>
          <NotificationPopup />
          <ToastMessage />
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/user" element={<UserPage></UserPage>}></Route>
              <Route
                path="/history-list"
                element={<HistoryList></HistoryList>}
              ></Route>
              <Route
                path="/ticket-manager"
                element={<TicketManagerPage></TicketManagerPage>}
              ></Route>
              <Route
                path="/notification"
                element={<NotificationPage></NotificationPage>}
              ></Route>
              <Route
                path="/admin-manage"
                element={<AdminManage></AdminManage>}
              ></Route>
            </AnimationRoutes>
            <BottomNav />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
