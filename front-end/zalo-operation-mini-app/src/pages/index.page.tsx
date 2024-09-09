import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, Input, Page, Select, Text } from "zmp-ui";
import { checkIn } from "../@app/api/xyz-api";
import { fetchStoreDW } from "../@app/api/store-api";
import { getLocationZalo } from "../@app/api/zalo-api";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { UserHelper } from "../@app/helpers/user.helper";
import { getLocalStorage, setDataToStorage } from "../@app/local-storage";
import { IEmployee } from "../@app/models/employee.model";
import { notificationReState } from "../@app/state/notification.state";
import Camera from "../components/cores/camera.component";
import Clock from "../components/cores/clock.component";
import Spinner from "../components/cores/spiner.component";
import OpenMap from "../components/maps/open-map.component";
import UserCard from "../components/user-card.component";
import { authorizeReState } from "../@app/state/authorize.state";
import { IStore } from "../@app/models/stores.model";
import { errorMessages } from "../@app/constants/errror-messages.constant";
const { Option } = Select;

const HomePage = () => {
  const cameraRef = useRef<any>(null);
  const [storeOptions, setStoreOptions] = useState<IStore[]>([]);
  const [storeSelected, setStoreSelected] = useState();
  const [employeeInfo, setEmployeeInfo] = useState<IEmployee | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [authorizeState, setAuthorizeState] = useRecoilState(authorizeReState);
  const [noteState, setNoteState] = useState();
  const setNotification = useSetRecoilState(notificationReState);

  const initComponent = async () => {
    console.log("init homepage");
    setIsLoading(true);
    try {
      const isAuthorized = await getLocalStorage(
        localStorageKeys.IS_AUTHORIZED,
      );
      setAuthorizeState(isAuthorized);
      const stores = await fetchStoreDW();
      setStoreOptions(stores);
      if (stores.length > 0) {
        setStoreSelected(stores[0].id);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeAuthorized = async () => {
    console.log("Change isAuthorizedState");

    if (authorizeState) {
      setIsLoading(true);
      try {
        await setDataToStorage(localStorageKeys.IS_AUTHORIZED, true);
        const info = await UserHelper.getInfo();
        setEmployeeInfo(info);
        setStoreSelected(info.storeId);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    onChangeAuthorized();
  }, [authorizeState]);

  const processCheckIn = async () => {
    setIsLoading(true);
    try {
      const phone = await getLocalStorage(localStorageKeys.USER_PHONE);
      const location = await getLocationZalo();
      let photo;
      if (cameraRef?.current) {
        photo = await cameraRef?.current.takePhoto();
      }
      if (!photo || !phone || !location) {
        setNotification({
          type: 1,
          message: errorMessages.UNKNOWN_ERROR,
        });
      }

      const body: any = {
        phone: phone,
        lng: location?.longitude,
        lat: location?.latitude,
        storeId: storeSelected,
        imageData: photo?.data,
        imageHeight: photo?.height,
        imageWidth: photo?.width,
        note: noteState,
      };
      let res: any = await checkIn(body);
      setNotification({
        type: 0,
        message: "Chấm công thành công!",
        imageData: res?.evidence?.photo || undefined,
      });
      setNoteState(undefined);
    } catch (error: any) {
      setNotification({ type: 1, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page className="page">
      <div className="section-container">
        <UserCard info={employeeInfo} />
      </div>
      <div className="section-container flex flex-col gap-5 text-center">
        <Text.Title size="xLarge">Điểm danh</Text.Title>
        <Clock />
        {authorizeState ? (
          <div>
            <OpenMap />
            <Camera ref={cameraRef} />
          </div>
        ) : null}
        <Select
          value={storeSelected}
          placeholder="Vui lòng chọn địa điểm làm việc"
          onChange={(event: any) => {
            setStoreSelected(event);
          }}
        >
          {storeOptions?.map((i: any) => (
            <Option value={i.id} title={i.name} key={i} />
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Ghi chú thêm"
          value={noteState}
          onChange={(event: any) => setNoteState(event?.target?.value)}
        />
        {authorizeState ? (
          <Button size="large" fullWidth onClick={processCheckIn}>
            Chấm công
          </Button>
        ) : (
          <Button
            size="large"
            fullWidth
            onClick={() => setAuthorizeState(true)}
          >
            Cấp quyền
          </Button>
        )}
        <span className="text-sm italic">
          *Yêu cầu truy cập số điện thoại, vị trí và camera!
        </span>
      </div>
      {isLoading && <Spinner />}
    </Page>
  );
};

export default HomePage;
