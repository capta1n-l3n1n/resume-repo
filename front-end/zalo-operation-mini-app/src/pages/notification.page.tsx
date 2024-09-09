import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon, Page } from "zmp-ui";
import { getNotifications } from "../@app/api/notification.api";
import { UserHelper } from "../@app/helpers/user.helper";
import { INotificationItem } from "../@app/models/notification.model";
import RenderIf from "../components/cores/render-if.component";
import { localStorageKeys } from "../@app/constants/local-storage-keys.constant";
import { getLocalStorage } from "../@app/local-storage";

const NotificationPage = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [userPhone, setUserPhone] = useState<any>();

  const loadMoreNotifications = useCallback(async () => {
    setIsLoading(true);
    const userPhone = await UserHelper.getUserPhone();
    const notificationRes = await getNotifications(userPhone, offset);

    setTimeout(() => {
      if (notificationRes.items.length > 0) {
        setNotifications((prev) => [...prev, ...notificationRes.items]);
        setOffset((prev) => prev + notificationRes.limit ?? 0);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  }, [offset]);

  const toggleMessage = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const lastNotificationRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreNotifications();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMoreNotifications, isLoading],
  );

  const initComponent = async () => {
    console.log("Init ticket manager");
    const isAuthorized = await getLocalStorage(localStorageKeys.IS_AUTHORIZED);
    if (isAuthorized) {
      const userPhone = await UserHelper.getUserPhone();
      setUserPhone(userPhone);
      loadMoreNotifications();
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  return (
    <Page className="page mt-2 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-2xl font-bold">Thông báo</p>
        <button onClick={() => setOffset(0)} className="text-xl">
          <Icon icon="zi-retry-solid" />
        </button>
      </div>
      <div className="border-t border-gray-300">
        {notifications.map((item, index) => {
          const isExpanded = expandedIds.includes(item.id);

          return (
            <div
              onClick={() => toggleMessage(item.id)}
              ref={
                notifications.length === index + 1 ? lastNotificationRef : null
              }
              key={`${item.id}-${index}`}
              className="border-b border-gray-300 py-3"
            >
              <div className="text-lg font-semibold uppercase">
                <header>{item.sender}</header>
              </div>
              <div className="flex justify-between">
                <div
                  className={`notification-content ${isExpanded ? "expanded" : ""}`}
                >
                  {item.message}
                </div>
                <RenderIf
                  condition={item.message.length > 100}
                  ifTrue={
                    <div className="ml-2 self-center text-blue-500">
                      <RenderIf
                        condition={isExpanded}
                        ifTrue={<Icon icon="zi-chevron-up" />}
                        ifFalse={<Icon icon="zi-chevron-down" />}
                      />
                    </div>
                  }
                  ifFalse={null}
                />
              </div>
              <div className="flex flex-col justify-end text-right align-middle">
                <span className="text-gray-500">
                  {moment(item.createdAt).fromNow()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <RenderIf
        condition={isLoading}
        ifTrue={<p className="py-4 text-center">Đang tải thêm thông báo...</p>}
        ifFalse={
          <RenderIf
            condition={!hasMore}
            ifTrue={
              <p className="py-4 text-center">Không còn thông báo nào.</p>
            }
            ifFalse={
              <p className="py-4 text-center">
                <Icon icon="zi-chevron-double-down" />
                Kéo xuống tiếp để xem thêm thông báo.
              </p>
            }
          />
        }
      />
    </Page>
  );
};

export default NotificationPage;
