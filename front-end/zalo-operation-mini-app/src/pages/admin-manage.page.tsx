import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Icon, Input, Modal, Page } from "zmp-ui";
import {
  approveTicket,
  getTicketApiForAdministration,
  rejectTicket,
} from "../@app/api/ticket.api";
import { TICKET_MAP } from "../@app/enums/ticket-type.enum";
import { DateHelper } from "../@app/helpers/date.helper";
import { StringHelper } from "../@app/helpers/string.helper";
import { UserHelper } from "../@app/helpers/user.helper";
import { ITicketItem } from "../@app/models/ticket.model";
import { notificationReState } from "../@app/state/notification.state";
import NoResult from "../components/cores/no-result.component";
import RenderIf from "../components/cores/render-if.component";

const AdminManage = () => {
  const [ticketsState, setTicketsState] = useState<ITicketItem[]>([]);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicketItem>();
  const [btnType, setBtnType] = useState<number | 0 | 1>(); // 0: approve; 1: reject
  const [inputContent, setInputContent] = useState<string>("Không đồng ý");
  const setNotification = useSetRecoilState(notificationReState);

  const initComponent = async () => {
    const userPhone = await UserHelper.getUserPhone();
    const tickets = await getTicketApiForAdministration(userPhone);
    setTicketsState(tickets);
  };

  const onButtonSelect = (item: ITicketItem, type: number) => {
    setDialogVisible(true);
    setSelectedTicket(item);
    setBtnType(type);
  };

  const approveOrReject = async () => {
    try {
      if (selectedTicket?.id && btnType == 0) {
        await approveTicket(selectedTicket.id);
        setNotification({
          type: 0,
          message: `Đã duyệt phiếu của ${selectedTicket.employee.name}`,
        });
      }
      if (selectedTicket?.id && btnType == 1) {
        await rejectTicket(selectedTicket.id, inputContent);
        setNotification({
          type: 0,
          message: `Đã từ chối phiếu của ${selectedTicket.employee.name}`,
        });
      }
      initComponent();
      setDialogVisible(false);
      setInputContent("Không đồng ý");
    } catch (error: any) {
      setNotification({ type: 1, message: error.message });
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  const buildItemTicket = (item: any) => {
    return (
      <div className="border-t border-gray-200 p-4" key={item?.id}>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{TICKET_MAP[item?.type]}</p>
          <div className="text-sm text-gray-500">
            {moment(item.createdAt).fromNow()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{item?.employee?.name}</p>
            <p className="text-gray-600">
              {item.content !== StringHelper.EMPTY
                ? item.content
                : StringHelper.DEFAULT_VAL}
            </p>
            <p className="text-gray-600">{item.store.name}</p>
          </div>

          <div className="flex space-x-2">
            <button
              className="text-green-500"
              onClick={() => onButtonSelect(item, 0)}
            >
              <Icon icon="zi-check-circle" />
            </button>
            <button
              className="text-red-500"
              onClick={() => onButtonSelect(item, 1)}
            >
              <Icon icon="zi-close-circle" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Page className="page mt-2 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-2xl font-bold">Quản lý phiếu</p>
      </div>
      <RenderIf
        condition={ticketsState.length > 0}
        ifTrue={ticketsState.map((item) => buildItemTicket(item))}
        ifFalse={<NoResult />}
      />
      <Modal
        className="relative"
        maskClosable={false}
        visible={dialogVisible}
        title="Xác nhận phiếu"
        unmountOnClose={true}
      >
        {selectedTicket && (
          <div>
            <div className="mb-5 border-b pb-2">
              <p>Tên: {selectedTicket.employee.name}</p>
              <p>SĐT: {selectedTicket.employee.phone}</p>
              <p>Văn phòng: {selectedTicket.store.name}</p>
            </div>
            <p>
              Nội dung:{" "}
              {selectedTicket.content !== StringHelper.DEFAULT_VAL
                ? selectedTicket.content
                : StringHelper.DEFAULT_VAL}
            </p>
            <p>
              Từ:{" "}
              {moment(selectedTicket.fromDate).format(
                DateHelper.FORMAT_DATE_TIME_VI,
              )}
            </p>
            <p>
              Đến:{" "}
              {moment(selectedTicket.toDate).format(
                DateHelper.FORMAT_DATE_TIME_VI,
              )}
            </p>
          </div>
        )}
        <RenderIf
          condition={btnType && btnType == 1}
          ifTrue={
            <div>
              <div className="border-t pt-4">
                <Input.TextArea
                  label="Lí do từ chối"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  onClick={() => setInputContent("")}
                  placeholder="Nhập lí do từ chối"
                />
              </div>
              <button
                className="mt-2 w-full rounded-md bg-red-500 p-2 text-white"
                onClick={() => approveOrReject()}
                disabled={StringHelper.isEmpty(inputContent)}
              >
                Từ chối
              </button>
            </div>
          }
          ifFalse={
            <button
              className="mt-2 w-full rounded-md bg-green-500 p-2 text-white"
              onClick={() => approveOrReject()}
            >
              Đồng ý
            </button>
          }
        />

        <div className="absolute right-2 top-2">
          <button
            onClick={() => {
              setDialogVisible(false);
              setInputContent("Không đồng ý");
            }}
          >
            <Icon size={18} icon="zi-close" />
          </button>
        </div>
      </Modal>
    </Page>
  );
};

export default AdminManage;
