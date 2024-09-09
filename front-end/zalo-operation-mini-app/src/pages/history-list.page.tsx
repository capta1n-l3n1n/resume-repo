import React, { useEffect, useState } from "react";
import { Select } from "zmp-ui";
import { getHistoryLogs } from "../@app/api/xyz-api";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { DateHelper } from "../@app/helpers/date.helper";
import { StringHelper } from "../@app/helpers/string.helper";
import { UserHelper } from "../@app/helpers/user.helper";
import { getLocalStorage } from "../@app/local-storage";
const { Option } = Select;

const HistoryList: React.FunctionComponent = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthOptions: any[] = [];
  for (let i = 0; i <= currentMonth; i++) {
    monthOptions.push({
      value: i,
      label: `${i + 1}${StringHelper.SLASH}${currentYear}`,
    });
  }
  const [monthSelected, setMonthSelected] = useState();
  const [daysArray, setDaysArray] = useState<any[]>([]);
  const [userPhone, setUserPhone] = useState<any>();
  const [historyLogs, setHistoryLogs] = useState<any>({});

  const onChangeMonth = async () => {
    if (!monthSelected) {
      return;
    }
    const daysInMonth = DateHelper.getTotalDaysInMonth(
      now.getFullYear(),
      monthSelected,
    );
    const firstDayOfMonth = DateHelper.getFirstDayOfMonth(
      now.getFullYear(),
      monthSelected,
    );
    const days: any[] = [];
    for (let x = 0; x < firstDayOfMonth; x++) {
      days.push({
        value: `${x}${StringHelper.SLASH}${monthSelected}`,
        label: "",
      });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const formatedDay = DateHelper.formatTimeUnit(day);
      const formatedMonth = DateHelper.formatTimeUnit(monthSelected + 1);
      days.push({
        value: `${formatedDay}${StringHelper.SLASH}${formatedMonth}`,
        label: day,
      });
    }
    setDaysArray(days);
    if (userPhone) {
      const res = await getHistoryLogs(
        userPhone,
        monthSelected + 1,
        currentYear,
      );
      setHistoryLogs(res[0].logs);
    }
  };

  const initComponent = async () => {
    console.log("Init history");
    const isAuthorized = await getLocalStorage(localStorageKeys.IS_AUTHORIZED);
    if (isAuthorized) {
      const userPhone = await UserHelper.getUserPhone();
      setUserPhone(userPhone);
    }
    setMonthSelected(monthOptions.at(-1)?.value);
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    onChangeMonth();
  }, [monthSelected, userPhone]);

  const buildItemLog = (day: any) => {
    const logInfo = historyLogs[day.value];
    let minLog = logInfo ? logInfo.minLog : StringHelper.EMPTY;
    let maxLog = logInfo ? logInfo.maxLog : StringHelper.EMPTY;
    return (
      <div className="h-20 rounded bg-gray-200 text-center" key={day.value}>
        <p className="text-2xl font-bold">{day.label}</p>
        <div className="text-teal-600">{minLog}</div>
        <div className="text-red-600">{maxLog}</div>
      </div>
    );
  };
  return (
    <div className="mt-2 bg-white">
      <div className="p-4">
        <p className="text-2xl font-bold">Lịch sử chấm công</p>
      </div>
      <div className="mx-4 mb-4">
        <div className="flex justify-around gap-3 align-middle">
          <Select
            placeholder="Chọn tháng"
            value={monthSelected}
            onChange={(event: any) => {
              setMonthSelected(event);
            }}
          >
            {monthOptions.map((i: any) => (
              <Option value={i.value} title={i.label} key={i} />
            ))}
          </Select>
          <div className="flex justify-center gap-2 align-middle">
            <div className="flex items-center text-sm">
              <span className="mr-2 block h-4 w-4 rounded-sm bg-teal-600"></span>
              Vào
            </div>
            <div className="flex items-center text-sm">
              <span className="mr-2 block h-4 w-4 rounded-sm bg-red-600"></span>
              Ra
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 border-t py-5 text-center">
        <div className="font-bold">CN</div>
        <div className="font-bold">T2</div>
        <div className="font-bold">T3</div>
        <div className="font-bold">T4</div>
        <div className="font-bold">T5</div>
        <div className="font-bold">T6</div>
        <div className="font-bold">T7</div>

        {daysArray.map((i: any) => buildItemLog(i))}
      </div>
    </div>
  );
};

export default HistoryList;
