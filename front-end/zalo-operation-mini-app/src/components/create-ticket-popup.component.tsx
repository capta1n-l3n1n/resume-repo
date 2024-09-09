import React, { useEffect, useState } from "react";
import { DatePicker, Icon, Input, Modal, Select } from "zmp-ui";
import { createTicketApi } from "../@app/api/ticket.api";
import { TICKET_MAP, TicketType } from "../@app/enums/ticket-type.enum";
import { ObjectHelper } from "../@app/helpers/object.helper";
import { StringHelper } from "../@app/helpers/string.helper";
import { UserHelper } from "../@app/helpers/user.helper";
import { ITicket } from "../@app/models/ticket.model";
import Spinner from "./cores/spiner.component";
import TimePicker from "./cores/time-picker.component";
const { Option } = Select;

const CreateTicketPopup = ({ onClose }) => {
  const [tickettype, setTicketType] = useState(TicketType.LATE);
  const [popupVisible, setPopupVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const now = new Date().setHours(0, 0, 0);
  const [fromDate, setFromDate] = useState(new Date(now));
  const [fromTime, setFromTime] = useState();
  const [toDate, setToDate] = useState(new Date(now));
  const [toTime, setToTime] = useState();
  const [content, setContent] = useState<string>(StringHelper.EMPTY);

  const onCloseModal = () => {
    setPopupVisible(false);
    onClose(false);
  };

  const createTicket = async () => {
    let from = fromDate;
    let to = toDate;
    if (fromTime) {
      from = new Date(fromDate.setHours(fromTime["hour"], fromTime["min"]));
    }
    if (toTime) {
      to = new Date(fromDate.setHours(toTime["hour"], toTime["min"]));
    }
    if (from.getTime() > to.getTime()) {
      setHasError(true);
      return;
    }

    const userPhone = await UserHelper.getUserPhone();
    const body: any = {
      phone: userPhone,
      type: tickettype,
      content: content,
      fromDate: from,
      toDate: to,
    };
    createTicketApi(body);
    onClose(true);
  };

  useEffect(() => {}, [hasError]);
  return (
    <Modal
      maskClosable={false}
      visible={popupVisible}
      onClose={onCloseModal}
      unmountOnClose={true}
      title="Thêm phiếu"
    >
      <div className="relative">
        <div className="absolute -right-4 -top-14">
          <button onClick={() => onClose(false)} className="p-4">
            <Icon icon="zi-close" />
          </button>
        </div>
        <div className="flex flex-col justify-center align-middle">
          <p>Loại phiếu</p>
          <Select
            value={tickettype}
            onChange={(event: any) => {
              setTicketType(event);
            }}
          >
            {ObjectHelper.parseOptions(TICKET_MAP).map((i: any) => (
              <Option value={i.value} title={i.label} key={i} />
            ))}
          </Select>
          <p>Từ thời gian</p>
          <div className="flex gap-2">
            <div className="basis-2/3">
              <DatePicker
                mask
                maskClosable
                dateFormat="dd/mm/yyyy"
                title="Từ ngày"
                value={fromDate}
                key={fromDate?.getDate()}
                onChange={(value) => {
                  console.log(value.toISOString);
                  setFromDate(value);
                }}
              />
            </div>
            <div className="basis-1/3">
              <TimePicker
                onChangeTime={(value) => {
                  console.log(value.toISOString);
                  setFromTime(value);
                }}
              />
            </div>
          </div>
          <p>Đến thời gian</p>
          <div className="flex gap-2">
            <div className="basis-2/3">
              <DatePicker
                mask
                maskClosable
                dateFormat="dd/mm/yyyy"
                title="Đến ngày"
                startDate={fromDate}
                value={toDate}
                key={toDate?.getDate()}
                onChange={(value) => {
                  setToDate(value);
                }}
              />
            </div>
            <div className="basis-1/3">
              <TimePicker
                onChangeTime={(data) => {
                  setToTime(data);
                }}
              />
            </div>
          </div>
          {hasError && (
            <span className="text-sm font-bold italic text-red-500">
              Từ không được lớn hơn đến.
            </span>
          )}
          <p>
            Nội dung
            <span className="text-sm italic text-gray-400"> Option</span>
          </p>
          <Input.TextArea
            value={content}
            onChange={(event) => {
              setContent(event?.target?.value);
            }}
          />
        </div>
        <button
          className="my-2 w-full rounded-md bg-blue-500 p-2 text-white"
          onClick={() => createTicket()}
        >
          Gửi
        </button>
        <span className="text-sm italic text-gray-500">
          *Vui lòng kiểm tra kỹ thông tin trước khi gửi.
        </span>
        {isLoading && <Spinner />}
      </div>
    </Modal>
  );
};
export default CreateTicketPopup;
