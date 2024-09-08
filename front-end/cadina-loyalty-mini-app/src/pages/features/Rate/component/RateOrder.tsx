import React, { useMemo, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../components/app/hooks";
import {
  Avatar,
  Box,
  Button,
  Icon,
  Page,
  Spinner,
  Text,
  useSnackbar,
  useTheme,
} from "zmp-ui";
import "../../../../../css/RateOrder.css";
import { NoImg } from "../../../../components/svg";
import clsx from "clsx";
import { chooseImage, getStorage, openMediaPicker } from "zmp-sdk/apis";
import API_CONSTANTS from "../../../../../assets-src/constants/api";
import { apiPath } from "../../../../components/app/apiPath";
import { postReview } from "../redux/action";

const RateOrder: React.FC = () => {
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [rateValue, setRateValue]: any = useState([]);
  const [theme] = useTheme();
  const [spinner, setSpinner] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userPointHRV: any = useAppSelector((state) => state.user.userPointHRV);
  console.log("userPointHRV", userPointHRV);
  console.log("rateValue", rateValue);

  //get data from storage
  const getData = async (dataRate) => {
    console.log("dataRate", dataRate);
    await dispatch(postReview(dataRate, userPointHRV?.phone));
  };
  const order = location.state;
  console.log(order);

  if (!rateValue[0]) {
    for (let i = 0; i < order.line_items.length; i++) {
      rateValue.push({
        index: i,
        rating: 5,
        comment: "Tuyệt vời",
        productId: "",
        variantId: "",
        productName: "",
        contentReview: "Chất lượng tuyệt vời",
        imgSrc: [],
        videoUrl: "",
      });
    }
  }

  const handlepickVideo = (index) => {
    openMediaPicker({
      type: "zcamera_video",
      serverUploadUrl: apiPath.SET_UPDATE_VIDEO,
      maxItemSize: 10000,
      maxSelectItem: 1,
      success: (res) => {
        const { data } = res;
        const result = JSON.parse(data);
        console.log("data", data);
        console.log("result", result);

        openSnackbar({
          text: "Đang tải video lên...",
          type: "loading",
          duration: 1500,
          position: "top",
        });
        setRateValue(
          rateValue.filter((item) =>
            item.index == index ? (item.videoUrl = result.data.urls[0]) : item
          )
        );
      },
      fail: (error) => {
        openSnackbar({
          text: "Video dung lượng quá lớn hoặc quá nhỏ (tối thiểu 3s)",
          type: "error",
          duration: 1500,
          position: "top",
        });
      },
    });
  };
  const handleChooseImage = (index: number) => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 3,
      success: ({ filePaths, tempFiles }) => {
        console.log("tempFiles", tempFiles);
        console.log("filePaths", filePaths);

        openSnackbar({
          text: "Đang tải ảnh lên...",
          type: "loading",
          duration: 1500,
          position: "top",
        });

        setRateValue(
          rateValue.filter((item) =>
            item.index == index
              ? tempFiles.map((url) => {
                  if (item.imgSrc.length >= 3) {
                    return openSnackbar({
                      text: "Tối đa 3 hình",
                      type: "warning",
                      duration: 2000,
                      position: "top",
                    });
                  }
                  return item.imgSrc.push({ src: url.path });
                })
              : item
          )
        );
      },
      fail: (error) => {
        openSnackbar({
          text: "Tối đa 3 hình!",
          type: "error",
          duration: 2000,
          position: "top",
        });
      },
    });
  };
  const handleMapReviewData = async () => {
    setSpinner(true);

    await rateValue.map((items) => {
      const data = {
        order_id: order.id,
        order_number: order.order_number,
        product_id: items.productId,
        variant_id: items.variantId,
        product_name: items.productName,
        customer_id: "",
        customer_name: "",
        star_number: items.rating,
        title_review: items.comment,
        content_review: items.contentReview,
        images: items.imgSrc,
        video_url: items.videoUrl,
        attributes: [],
        approved: false,
        published: false,
      };
      getData(data);
    });
    setTimeout(() => {
      setSpinner(false);
      navigate("/rate");
    }, 1000);
  };

  return (
    <Page className="page">
      <div
        style={{
          background: theme !== "dark" ? "#FFFFFF" : "#141415",
        }}
        className="section-container"
      >
        <Text.Title className="text-center">Đánh giá sản phẩm</Text.Title>
      </div>
      <div className="section-container">
        {order &&
          order.line_items.map((items, index) => {
            console.log("items", items);

            const rate = (stars: number) => {
              const starElements = document.querySelectorAll(`.star-${index}`);
              for (let i = 0; i < starElements.length; i++) {
                if (i < stars) {
                  starElements[i].classList.add("star-active");
                } else {
                  starElements[i].classList.remove("star-active");
                }
              }
            };
            const handleRateValue = () => {
              setRateValue(
                rateValue.filter((item) =>
                  item.index == index
                    ? ((item.productId = items.product_id),
                      (item.variantId = items.variant_id),
                      (item.productName = items.name))
                    : item
                )
              );
              console.log("rateValue", rateValue);
            };
            useEffect(() => {
              handleRateValue();
            }, []);
            return (
              <div key={items.id}>
                <div className="flex justify-center align-middle gap-2">
                  <div className="basis-3/12 w-3/12">
                    {items.image.src ? (
                      <img
                        className="rounded-sm"
                        src={items.image.src}
                        alt="product-img"
                      />
                    ) : (
                      <NoImg />
                    )}
                  </div>
                  <div className="basis-9/12 w-9/12">
                    <p className="font-semibold">{items.name}</p>
                    <p>
                      {items.price.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })}
                      {"đ "} |{" "}
                      <span className="text-red-600">x{items.quantity}</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-start align-middle gap-2 mt-2">
                  <div className="font-semibold w-4/12 mr-1">
                    <h1>Chất lượng</h1>
                  </div>
                  {/* star rate */}
                  <div className="flex justify-start align-middle w-5/12">
                    <div
                      className={`star-${index} star-active`}
                      onClick={() => {
                        setRateValue(
                          rateValue.filter((item) =>
                            item.index == index
                              ? ((item.rating = 1), (item.comment = "Tệ"))
                              : item
                          )
                        );
                        rate(rateValue[index].rating);
                      }}
                    >
                      <Icon icon="zi-star-solid" />
                    </div>
                    <div
                      className={`star-${index} star-active`}
                      onClick={() => {
                        setRateValue(
                          rateValue.filter((item) =>
                            item.index == index
                              ? ((item.rating = 2),
                                (item.comment = "Không tốt"))
                              : item
                          )
                        );
                        rate(rateValue[index].rating);
                      }}
                    >
                      <Icon icon="zi-star-solid" />
                    </div>
                    <div
                      className={`star-${index} star-active`}
                      onClick={() => {
                        setRateValue(
                          rateValue.filter((item) =>
                            item.index == index
                              ? ((item.rating = 3),
                                (item.comment = "Bình thường"))
                              : item
                          )
                        );
                        rate(rateValue[index].rating);
                      }}
                    >
                      <Icon icon="zi-star-solid" />
                    </div>
                    <div
                      className={`star-${index} star-active`}
                      onClick={() => {
                        setRateValue(
                          rateValue.filter((item) =>
                            item.index == index
                              ? ((item.rating = 4), (item.comment = "Hài lòng"))
                              : item
                          )
                        );
                        rate(rateValue[index].rating);
                      }}
                    >
                      <Icon icon="zi-star-solid" />
                    </div>
                    <div
                      className={`star-${index} star-active`}
                      onClick={() => {
                        setRateValue(
                          rateValue.filter((item) =>
                            item.index == index
                              ? ((item.rating = 5),
                                (item.comment = "Tuyệt vời"))
                              : item
                          )
                        );
                        rate(rateValue[index].rating);
                      }}
                    >
                      <Icon icon="zi-star-solid" />
                    </div>
                  </div>
                  {/* <StarRating rating={5} /> */}
                  <div className="w-3/12">
                    <span
                      className="text-xs"
                      style={
                        rateValue[index]?.rating >= 4
                          ? { color: API_CONSTANTS.ICONIC_COLOR }
                          : { color: "black" }
                      }
                    >
                      {rateValue[index]?.comment}
                    </span>
                  </div>
                </div>
                <div className="mt-1">
                  <Text size="xxxSmall">
                    *Thêm ảnh hoặc video để nhận thêm 2500 điểm
                  </Text>
                </div>
                <Box
                  mt={2}
                  mb={3}
                  flex
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <button
                    onClick={() => {
                      handleChooseImage(index);
                    }}
                    className="p-2 md:w-56 w-1/2 mr-1"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: API_CONSTANTS.ICONIC_COLOR,
                    }}
                  >
                    <Icon icon="zi-camera" />
                    <p>Thêm Hình ảnh</p>
                  </button>
                  <button
                    onClick={() => {
                      handlepickVideo(index);
                    }}
                    className="p-2 md:w-56 w-1/2 ml-1"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: API_CONSTANTS.ICONIC_COLOR,
                    }}
                  >
                    <Icon icon="zi-video" />
                    <p>Thêm Video</p>
                  </button>
                </Box>
                <div className="flex justify-center align-middle">
                  <div className="basis-1/2">
                    {rateValue
                      .filter((item) => item.index == index && item.imgSrc[0])
                      .map((item) => (
                        <div className="flex" key={item.index}>
                          <Avatar.Group horizontal maxCounter={3}>
                            {item.imgSrc.map((item) => (
                              <Avatar key={item.src} src={item.src} />
                            ))}
                          </Avatar.Group>
                          <button
                            className="text-red-600"
                            onClick={() => setRateValue((item.imgSrc = []))}
                          >
                            <Icon icon="zi-delete" />
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="basis-1/2">
                    {rateValue
                      .filter(
                        (item) => item.index == index && item.videoUrl !== ""
                      )
                      .map((item) => (
                        <div className="flex text-red-600" key={item.index}>
                          <a
                            href={item.videoUrl}
                            className="border border-red-600 rounded-md"
                          >
                            <Icon icon="zi-play" size={48} />
                          </a>
                          <button
                            className="text-red-600"
                            onClick={() => setRateValue((item.videoUrl = ""))}
                          >
                            <Icon icon="zi-delete" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <textarea
                    required
                    defaultValue={"Chất lượng tuyệt vời"}
                    placeholder="Vui lòng đánh giá chất lượng sản phẩm"
                    onChange={(e) => {
                      setRateValue(
                        rateValue.filter((item) =>
                          item.index == index
                            ? (item.contentReview = e.target.value)
                            : item
                        )
                      );
                    }}
                    className="w-full bg-gray-100 border-2 p-2 mt-2"
                    name=""
                    cols={5}
                    rows={4}
                  />
                </div>
              </div>
            );
          })}
        <div className="my-5">
          <Button
            fullWidth
            style={{
              backgroundColor: API_CONSTANTS.ICONIC_COLOR,
              marginBottom: 10,
            }}
            onClick={() => {
              // setSpinner(true);
              handleMapReviewData();
              // setTimeout(() => {
              //   setSpinner(false);
              //   navigate("/rate");
              // }, 1000);
            }}
          >
            ĐÁNH GIÁ
          </Button>
          <br />
          {/* back button */}
          <Button
            style={{
              background: theme !== "dark" ? "#DCDCDC" : "#a7a4a4",
              color: theme !== "dark" ? API_CONSTANTS.ICONIC_COLOR : "#000000",
            }}
            variant="secondary"
            fullWidth
            onClick={() => {
              navigate("/rate");
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Spinner visible={spinner} logo={API_CONSTANTS.APP_MINI_LOGO} />
      </div>
    </Page>
  );
};

export default RateOrder;
