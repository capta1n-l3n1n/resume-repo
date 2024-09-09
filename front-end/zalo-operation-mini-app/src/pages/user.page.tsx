import React, { useEffect, useState } from "react";
import { clearStorage } from "zmp-sdk";
import {
  Avatar,
  Box,
  Button,
  Icon,
  List,
  Page,
  Text,
  useNavigate,
} from "zmp-ui";
import { UserHelper } from "../@app/helpers/user.helper";
import { getLocationZalo } from "../@app/api/zalo-api";
import { fetchLocationDW } from "../@app/api/location-api";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { getLocalStorage } from "../@app/local-storage";
import OpenMap from "../components/maps/open-map.component";
import RenderIf from "../components/cores/render-if.component";

const UserPage = () => {
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState<any>();
  const [isAuthorizedState, setIsAuthorized] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<any>();
  const [positionStr, setPositionStr] = useState<any>();

  const initComponent = async () => {
    console.log("init UserPage");
    const isAuthorized = await getLocalStorage(localStorageKeys.IS_AUTHORIZED);
    setIsAuthorized(isAuthorized);
  };

  const onChangeAuthorized = async () => {
    console.log("Load employee info");
    if (isAuthorizedState) {
      const info = await UserHelper.getInfo();
      setEmployeeInfo(info);
      const location = await getLocationZalo();
      const addr = await fetchLocationDW(location.longitude, location.latitude);
      setPositionStr(`${location.latitude} - ${location.longitude}`);
      setCurrentAddress(addr);
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    onChangeAuthorized();
  }, [isAuthorizedState]);

  return (
    <Page className="page">
      <RenderIf
        condition={isAuthorizedState}
        ifTrue={
          <div className="section-container">
            <RenderIf
              condition={employeeInfo && employeeInfo.positionLevel > 1}
              ifTrue={
                <div className="flex justify-end align-middle text-red-600 underline underline-offset-4">
                  <button onClick={() => navigate("/admin-manage")}>
                    <Icon size={18} icon="zi-leave" />
                    Quản trị
                  </button>
                </div>
              }
              ifFalse={null}
            />
            <Box
              flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Avatar story="default" size={96} online>
                  {UserHelper.extractAvatar(employeeInfo) || "S"}
                </Avatar>
              </Box>
              <Box mt={4}>
                <Text.Title>{employeeInfo?.name || "xyz"}</Text.Title>
              </Box>
            </Box>
            <Box mt={2}>
              <List>
                <List.Item
                  title="Số điện thoại"
                  subTitle={employeeInfo?.phone || "..."}
                />
                <List.Item
                  title="Vị trí hiện tại"
                  subTitle={positionStr || "..."}
                />
                <List.Item
                  title="Địa chỉ hiện tại"
                  subTitle={currentAddress || "..."}
                />
              </List>
            </Box>
            <OpenMap />
          </div>
        }
        ifFalse={
          <div>
            <Button
              size="large"
              fullWidth
              onClick={() => setIsAuthorized(true)}
            >
              Cấp quyền
            </Button>
            <span className="text-sm italic">
              *Yêu cầu truy cập số điện thoại, vị trí
            </span>
          </div>
        }
      />
      <Button
        fullWidth
        variant="secondary"
        type="danger"
        onClick={async () => {
          try {
            await clearStorage({});
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Clear cache
      </Button>
    </Page>
  );
};

export default UserPage;
