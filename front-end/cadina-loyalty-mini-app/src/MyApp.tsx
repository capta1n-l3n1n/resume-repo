import React, { StrictMode, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "./pages";
import UserPage from "./pages/features/User/User";
import BottomNavigationPage from "./components/bottomNav";
import { Provider } from "react-redux";
import store from "./components/app/store";
import RewardPoint from "./pages/features/Reward/RewardPoint";
import RewardEx from "./pages/features/Reward/RewardEx";
import UserReward from "./pages/features/User/component/UserReward";
import TrackingItem from "./pages/features/TrackingItem/TrackingItem";
import { login } from "zmp-sdk";
import UserAttendance from "./pages/features/User/component/UserAttendance";
import Rate from "./pages/features/Rate/Rate";
import RateOrder from "./pages/features/Rate/component/RateOrder";

const MyApp: React.FunctionComponent = () => {
  const handleLogin = () => {
    login({
      success: () => {},
      fail: () => {},
    });
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <StrictMode>
      <Provider store={store}>
        <RecoilRoot>
          <App>
            <SnackbarProvider>
              <ZMPRouter>
                <AnimationRoutes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route
                    path="/trackingitem"
                    element={<TrackingItem />}
                  ></Route>
                  <Route path="/user" element={<UserPage />}></Route>
                  <Route
                    path="/userAttendance"
                    element={<UserAttendance />}
                  ></Route>
                  <Route path="/userReward" element={<UserReward />}></Route>
                  <Route path="/rewardPoint" element={<RewardPoint />}></Route>
                  <Route path="/reward" element={<RewardEx />}></Route>
                  <Route path="/rate" element={<Rate />}></Route>
                  <Route path="/rateOrder" element={<RateOrder />}></Route>
                </AnimationRoutes>
                <BottomNavigationPage />
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </RecoilRoot>
      </Provider>
    </StrictMode>
  );
};

export default MyApp;
