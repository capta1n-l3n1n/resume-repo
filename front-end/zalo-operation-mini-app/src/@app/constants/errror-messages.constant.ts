export const errorMessages = {
  GET_LOCATION_ZALO_ERR: "Không thể lấy dữ liệu vị trí từ zalo.",
  GET_PHONE_ZALO_ERR: "Không thể lấy số điện thoại từ zalo.",
  GET_STORE_ERR: "Không thể lấy danh sách cửa hàng.",

  ZALO_ERROR: "Đã có lỗi xảy ra từ zalo. Vui lòng thử lại sau.",
  UNKNOWN_ERROR: "Đã có lỗi xảy ra. Vui lòng liên hệ xyz.",
};

export const errorBCMessage = {
  "300004": "Vị trí của bạn trên 50m. Bạn không thể chấm công.",
  default: errorMessages.UNKNOWN_ERROR,
};
