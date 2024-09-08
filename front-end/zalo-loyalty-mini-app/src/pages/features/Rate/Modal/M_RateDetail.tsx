import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, useTheme } from "zmp-ui";
import { NoImg } from "../../../../components/svg";

const M_RateDetail: React.FC<M_RateDetail> = (props) => {
  const { show, hidden, data } = props;
  const [theme] = useTheme();

  return (
    <>
      <Modal
        className="relative"
        visible={show}
        title={`ID Đơn hàng: ${data?.id}`}
        description={`Mã đơn hàng: ${data?.order_number}`}
        onClose={() => {
          hidden();
        }}
        actions={[
          {
            style: { margin: "auto" },
            text: "Hủy",
            close: true,
            highLight: true,
            danger: true,
          },
        ]}
      >
        <button
          onClick={() => {
            hidden();
          }}
          className="absolute top-3 right-4"
        >
          <FontAwesomeIcon className="text-base" icon={faXmark} />
        </button>
        {data &&
          data.line_items.map((orderItem: any) => (
            <div
              key={orderItem.id}
              className="rounded-md p-3 mt-5 flex flex-row justify-center items-center bg-gray-100"
            >
              <div className="w-2/6 mx-auto mr-3">
                {!orderItem.image ? (
                  <NoImg />
                ) : (
                  <img
                    className="rounded-sm"
                    src={orderItem.image.src}
                    alt="orderItemIMG"
                  />
                )}
              </div>
              <div className="w-4/6">
                <p>
                  <span className="font-semibold">Tên sản phẩm:</span>{" "}
                  {orderItem.name}
                </p>
                <p>
                  <span className="font-semibold">Mã sản phẩm:</span>{" "}
                  {orderItem.product_id}
                </p>
                <p>
                  <span className="font-semibold">Số lượng:</span>{" "}
                  {orderItem.quantity}
                </p>
                <p>
                  <span className="font-semibold">Giá:</span>{" "}
                  {orderItem.price.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  })}
                  đ
                </p>
              </div>
            </div>
          ))}
      </Modal>
    </>
  );
};

export default M_RateDetail;
