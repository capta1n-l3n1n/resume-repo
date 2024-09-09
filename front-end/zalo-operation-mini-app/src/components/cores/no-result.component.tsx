import React from "react";

const NoResult = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img
        className="w-40"
        src="https://file.hstatic.net/200000219339/file/empty-box.png"
      />
      <span>Không có kết quả</span>
    </div>
  );
};

export default NoResult;
