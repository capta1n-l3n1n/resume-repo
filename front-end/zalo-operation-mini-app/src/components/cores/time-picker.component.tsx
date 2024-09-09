import React from "react";
import { Picker } from "zmp-ui";
import { DateHelper } from "../../@app/helpers/date.helper";
import { StringHelper } from "../../@app/helpers/string.helper";

const TimePicker = ({ onChangeTime }) => {
  const handleChange = (data) => {
    const hour = data.hour ? data.hour.value : 0;
    const min = data.min ? data.min.value : 0;
    onChangeTime({ hour, min });
  };
  return (
    <Picker
      title="Chọn giờ"
      mask
      maskClosable
      onChange={(e) => handleChange(e)}
      formatPickedValueDisplay={(data) => {
        if (!data || !data.hour || !data.min) return "00:00";
        return `${data.hour.displayName}:${data.min.displayName}`;
      }}
      defaultValue={{ hour: 0, min: 0 }}
      data={[
        {
          options: DateHelper.genHourOptions(),
          name: "hour",
        },
        {
          options: DateHelper.genMinuteOptions(),
          name: "min",
        },
      ]}
    />
  );
};
export default TimePicker;
