import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "zmp-ui";

const M_RateImg: React.FC<M_RateImgProps> = (props: any) => {
  const { show, hidden, data } = props;
  return (
    <>
      <Modal
        className="relative"
        visible={show}
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
          data.images?.map((itemModal) => (
            <div key={itemModal.id} className="mb-3 w-full">
              <img src={itemModal.src} alt="customer-review-images" />
            </div>
          ))}
        {data && (
          <div className="mb-3 w-full">
            <img src={data.video_url} alt="customer-review-video" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default M_RateImg;
