import React, { useEffect, useState, useCallback } from "react";
import { followOA, getStorage } from "zmp-sdk";
import { Page, Button, Text, Modal, Box, Checkbox, useSnackbar } from "zmp-ui";
import { getUserInfo, setStorage } from "zmp-sdk/apis";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import actions from "./User/redux/type";
import API_CONSTANTS from "../../../assets-src/constants/api";
import { postFollowOA } from "./User/redux/action";

export const ModalFollow: React.FunctionComponent = () => {
  const [passState, setPassState] = useState(false);
  const [followState, setFollowState] = useState(false);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const userPoint: any = useAppSelector((state) => state.user.userPoint);
  const dispatch = useAppDispatch();
  const showPopup = () => {
    getStorage({
      keys: ["followOA", "passOA", "userPoint"],
      success: (data) => {
        const { followOA, passOA, userPoint } = data;
        console.log("data", data);

        if (followOA === "true") {
          setFollowState(true);
        }
        if (passOA === "true") {
          return setPassState(true);
        }

        setPassState(false);
      },
      fail: (error) => {},
    });
  };
  const setUserPassStorage = (valueFollow: string, valuePass: string) => {
    setStorage({
      data: {
        followOA: valueFollow,
        passOA: valuePass,
      },
      success: (data) => {
        const { errorKeys } = data;
      },
      fail: (error) => {},
    });
  };

  //followOA
  const follow = () => {
    followOA({
      id: API_CONSTANTS.ID_ZALO_OA,
      success: () => {
        setUserPassStorage("true", "true");
        setFollowState(true);
        setPassState(true);
        getStorage({
          keys: ["userNumber", "userPoint"],
          success: async (data) => {
            const { userNumber, userPoint } = data;
            dispatch(postFollowOA(userNumber ?? userPoint?.phone));
          },
          fail: (error) => {},
        });
        openSnackbar({
          duration: 1500,
          position: "top",
          text: "Theo dõi thành công",
          type: "success",
        });
      },
      fail: (err) => {},
    });
  };
  useEffect(() => {
    showPopup();
  }, []);
  return (
    <>
      {userPoint?.isFollow || followState || passState ? null : (
        <div className="h-full w-full absolute -top-20 md:-top-56">
          <div className="relative mx-auto">
            <img
              className="mx-auto w-full h-auto bg-black bg-opacity-80"
              src="https://file.hstatic.net/200000219339/file/follow_modal_7f6dedb7586140bb9097ccecda7f9285.png"
              alt="follow_modal"
            />
            <div className="absolute bottom-72 left-1/2 -translate-x-1/2 md:bottom-96 text-center">
              <button
                onClick={() => {
                  follow();
                  showPopup();
                }}
                className="py-4 px-7 rounded-full font-bold md:text-4xl md:py-10 md:px-16"
                style={{
                  backgroundColor: API_CONSTANTS.ICONIC_COLOR,
                }}
              >
                Quan Tâm
              </button>
            </div>
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
              <Button
                type="neutral"
                variant="tertiary"
                onClick={() => {
                  setUserPassStorage("false", "true");
                  showPopup();
                  setPassState(true);
                  openSnackbar({
                    duration: 1500,
                    position: "top",
                    text: "Đã bỏ qua thông báo",
                    type: "success",
                  });
                }}
              >
                <p
                  className="font-bold md:text-xl"
                  style={{ color: API_CONSTANTS.ICONIC_COLOR }}
                >
                  Bỏ qua
                </p>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
