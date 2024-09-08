import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Page, Text, useTheme } from "zmp-ui";
import API_CONSTANTS from "../../../../../assets-src/constants/api";

const UserAttendance: React.FunctionComponent = () => {
  const [theme] = useTheme();
  return (
    <Page className="page text-center">
      <div className="section-container">
        <Text.Title>Ưu đãi điểm danh mỗi ngày</Text.Title>
        <button>
          <Text.Title
            className="shadow-md bg-white px-3 py-1 rounded-md"
            onClick={() => {}}
          >
            Điểm 0 {">"}{" "}
          </Text.Title>
        </button>
        <Box
          pt={5}
          className="gap-1"
          flex
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <div className="w-12">
            <div
              className="py-2 rounded-md"
              style={{
                background: theme !== "dark" ? "#DCDCDC" : "#FFFFFF",
                color:
                  theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
              }}
            >
              <p className="text-black">+100</p>
              <FontAwesomeIcon className="text-xl mt-2" icon={faCoins} />
            </div>
            <p className="text-xs opacity-80">Ngày 1</p>
          </div>

          <div className="w-12 ">
            <div
              className="py-2 rounded-md"
              style={{
                background: theme !== "dark" ? "#DCDCDC" : "#FFFFFF",
                color:
                  theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
              }}
            >
              <p className="text-black">+100</p>
              <FontAwesomeIcon className="text-xl mt-2" icon={faCoins} />
            </div>
            <p className="text-xs opacity-80">Ngày 1</p>
          </div>
          <div className="w-12">
            <div
              className="py-2 rounded-md"
              style={{
                background: theme !== "dark" ? "#DCDCDC" : "#FFFFFF",
                color:
                  theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
              }}
            >
              <p className="text-black">+100</p>
              <FontAwesomeIcon className="text-xl mt-2" icon={faCoins} />
            </div>
            <p className="text-xs opacity-80">Hôm nay</p>
          </div>

          <div className="w-12">
            <div
              className="py-2 rounded-md border-yellow-400 border "
              style={{
                background: theme !== "dark" ? "#DCDCDC" : "#FFFFFF",
                color:
                  theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
              }}
            >
              <p className="text-black">+100</p>
              <FontAwesomeIcon className="text-xl mt-2" icon={faCircleCheck} />
            </div>
            <p className="text-xs opacity-80">Hôm nay</p>
          </div>
        </Box>
        <div className="section-container">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: API_CONSTANTS.ICONIC_COLOR }}
            fullWidth
            size="medium"
          >
            Điểm danh
          </Button>

          {/* <Button disabled style={{ color: API_CONSTANTS.ICONIC_COLOR }} fullWidth size="medium">
            Đã điểm danh hôm nay
          </Button> */}
        </div>
      </div>
    </Page>
  );
};

export default UserAttendance;
