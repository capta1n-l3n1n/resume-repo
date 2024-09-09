import React, { useEffect, useState } from "react";
import { DateHelper } from "../../@app/helpers/date.helper";

const Clock: React.FunctionComponent<any> = (props) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = DateHelper.formatTimeUnit(time.getHours());
  const minutes = DateHelper.formatTimeUnit(time.getMinutes());
  const seconds = DateHelper.formatTimeUnit(time.getSeconds());
  const date = DateHelper.formatTimeUnit(time.getDate());
  const month = DateHelper.formatTimeUnit(time.getMonth() + 1);
  const year = time.getFullYear();
  const day = () => {
    return DateHelper.dayNames[time.getDay()];
  };

  return (
    <div className="text-center">
      <p className="text-lg">{`${day()}, ngày ${date} tháng ${month}, ${year}`}</p>
      <p className="mt-4 text-[50px] font-bold text-blue-500">{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Clock;
