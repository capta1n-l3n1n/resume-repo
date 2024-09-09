import moment from "moment";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Icon, Select, Tabs } from "zmp-ui";
import { getTicketApi } from "../@app/api/ticket.api";
import {
  TICKET_STATUS_MAP,
  TicketStatus,
} from "../@app/enums/ticket-status.enum";
import { TICKET_MAP } from "../@app/enums/ticket-type.enum";
import { DateHelper } from "../@app/helpers/date.helper";
import { ObjectHelper } from "../@app/helpers/object.helper";
import { StringHelper } from "../@app/helpers/string.helper";
import { IOption } from "../@app/models/option.model";
import CreateTicketPopup from "../components/create-ticket-popup.component";
import NoResult from "../components/cores/no-result.component";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { UserHelper } from "../@app/helpers/user.helper";
import { getLocalStorage } from "../@app/local-storage";
import RenderIf from "../components/cores/render-if.component";

const { Option } = Select;

const TicketManagerPage: React.FunctionComponent = () => {
  const ticketOptions: IOption[] = ObjectHelper.parseOptions(TICKET_MAP);
  ticketOptions.unshift({
    value: StringHelper.DEFAULT_VAL,
    label: "Tất cả",
    key: StringHelper.DEFAULT_VAL,
  });

  const [ticketSelected, setTicketSelected] = useState<any>(
    StringHelper.DEFAULT_VAL,
  );
  const [showPopup, setShowPopup] = useState(false);
  const [ticketItems, setTicketItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offsetState, setOffset] = useState(0);
  const [tabSelected, setTabSelected] = useState<any>(TicketStatus.WAITING);
  const [isLoading, setIsLoading] = useState(false);
  const [userPhone, setUserPhone] = useState<any>();
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreData = useCallback(
    async (resetOffset = false) => {
      try {
        setIsLoading(true);
        let offset = offsetState;
        let list = ticketItems;
        if (resetOffset) {
          list = [];
          offset = 0;
        }

        const ticketType =
          ticketSelected == StringHelper.DEFAULT_VAL
            ? undefined
            : ticketSelected;
        const { limit, items, total } = await getTicketApi(
          offset,
          ticketType,
          tabSelected,
          userPhone,
        );
        setTicketItems([...list, ...items]);

        setTimeout(() => {
          setOffset(offset + limit);
          setHasMore(offset + limit < total);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading more data:", error);
        setIsLoading(false);
      }
    },
    [offsetState, ticketItems, ticketSelected, tabSelected],
  );

  const lastTicketRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMoreData, isLoading],
  );

  const onCloseModal = (reloadData = false) => {
    setShowPopup(false);
    if (reloadData) {
      setTicketSelected(StringHelper.DEFAULT_VAL);
      setTabSelected(TicketStatus.WAITING);
      loadMoreData(true);
    }
  };

  const initComponent = async () => {
    console.log("Init ticket manager");
    const isAuthorized = await getLocalStorage(localStorageKeys.IS_AUTHORIZED);
    if (isAuthorized) {
      const userPhone = await UserHelper.getUserPhone();
      setUserPhone(userPhone);
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    loadMoreData(true);
  }, [tabSelected]);

  useEffect(() => {
    if (TicketStatus.WAITING !== tabSelected) {
      setTabSelected(TicketStatus.WAITING);
    } else {
      loadMoreData(true);
    }
  }, [ticketSelected]);

  const buildItemTicket = (itemTicket: any) => {
    const createdAt = itemTicket?.createdAt
      ? moment(itemTicket?.createdAt).format(DateHelper.FORMAT_DATE_VI)
      : StringHelper.DEFAULT_VAL;
    const fromDate = itemTicket?.fromDate
      ? moment(itemTicket?.fromDate).format(DateHelper.FORMAT_DATE_TIME_VI)
      : StringHelper.DEFAULT_VAL;
    const toDate = itemTicket?.toDate
      ? moment(itemTicket?.toDate).format(DateHelper.FORMAT_DATE_TIME_VI)
      : StringHelper.DEFAULT_VAL;
    const approvedDate = [
      TicketStatus.APPROVED,
      TicketStatus.REJECTED,
    ].includes(itemTicket?.status)
      ? moment(itemTicket?.updatedAt).format(DateHelper.FORMAT_DATE_VI)
      : StringHelper.DEFAULT_VAL;

    return (
      <div
        className="h-30 m-4 border-t border-gray-200 p-4"
        key={itemTicket?.id}
      >
        <div className="flex flex-row justify-between gap-2">
          <span className="text-lg font-bold">
            {TICKET_MAP[itemTicket?.type]}
          </span>
          <span className="text-sm italic text-gray-400">{createdAt}</span>
        </div>
        <p>
          <Icon icon="zi-calendar"></Icon>
          {fromDate} - {toDate}
        </p>
        <p>{itemTicket?.content || StringHelper.SPACE}</p>
        <div className="text-end">
          <span className="font-bold">Ngày duyệt:</span> {approvedDate}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-12">
      <div className="mt-2 bg-white">
        <div className="p-4">
          <p className="text-2xl font-bold">Phiếu của tôi</p>
        </div>
        <div className="mx-4">
          <div className="flex justify-around gap-3 align-middle">
            <Select
              placeholder="Chọn loại phiếu"
              value={ticketSelected}
              onChange={(e: any) => {
                setTicketSelected(e);
              }}
            >
              {ticketOptions.map((i: any) => (
                <Option value={i.value} title={i.label} key={i.k} />
              ))}
            </Select>
          </div>
        </div>
        <Tabs
          onChange={(e: any) => {
            setTabSelected(e);
          }}
          activeKey={tabSelected}
        >
          {Object.keys(TICKET_STATUS_MAP).map((k) => (
            <Tabs.Tab key={k} label={TICKET_STATUS_MAP[k]}></Tabs.Tab>
          ))}
        </Tabs>
        <RenderIf
          condition={!isLoading}
          ifTrue={
            <RenderIf
              condition={ticketItems.length > 0}
              ifTrue={ticketItems.map((item, index) => {
                if (ticketItems.length === index + 1) {
                  return (
                    <div ref={lastTicketRef} key={item.id}>
                      {buildItemTicket(item)}
                    </div>
                  );
                } else {
                  return <div key={item.id}>{buildItemTicket(item)}</div>;
                }
              })}
              ifFalse={<NoResult />}
            />
          }
          ifFalse={
            <div className="flex justify-center py-5 align-middle">
              <p>Đang tải thêm phiếu...</p>
            </div>
          }
        />
      </div>
      <div className="fixed bottom-20 right-2">
        <button
          className="flex h-12 w-12 justify-center rounded-full bg-blue-500 align-middle text-2xl font-bold text-white shadow-md"
          onClick={() => setShowPopup(true)}
        >
          <Icon icon="zi-plus" className="self-center" />
        </button>
      </div>
      <RenderIf
        condition={showPopup}
        ifTrue={<CreateTicketPopup onClose={onCloseModal} />}
        ifFalse={null}
      />
    </div>
  );
};

export default TicketManagerPage;
