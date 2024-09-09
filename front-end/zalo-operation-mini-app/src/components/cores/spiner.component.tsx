import React from "react";
import "../../css/spiner.css";
import { appConfig } from "../../@app/constants/app-config.constant";

const Spinner = () => (
  <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-80">
    <img src={appConfig.APP_LOGO} className="h-auto w-24" alt="Logo" />
    <div className="mt-12 flex justify-center">
      <div
        className="mx-1 h-4 w-4 animate-bounce rounded-full bg-indigo-400"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="mx-1 h-4 w-4 animate-bounce rounded-full bg-indigo-400"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="mx-1 h-4 w-4 animate-bounce rounded-full bg-indigo-400"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  </div>
);

export default Spinner;
