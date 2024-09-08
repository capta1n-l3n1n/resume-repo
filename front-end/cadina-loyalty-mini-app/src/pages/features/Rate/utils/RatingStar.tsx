import React from "react";
import { Icon } from "zmp-ui";
import API_CONSTANTS from "../../../../../assets-src/constants/api";

const RatingStar: React.FC<RatingStarProps> = (props: any) => {
  return (
    <>
      {props && props.ratingNumb == 1 ? (
        <>
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
        </>
      ) : props.ratingNumb == 2 ? (
        <>
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
        </>
      ) : props.ratingNumb == 3 ? (
        <>
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon icon="zi-star" size={16} />
          <Icon icon="zi-star" size={16} />
        </>
      ) : props.ratingNumb == 4 ? (
        <>
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon icon="zi-star" size={16} />
        </>
      ) : (
        <>
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
          <Icon
            style={{ color: API_CONSTANTS.ICONIC_COLOR }}
            icon="zi-star-solid"
            size={16}
          />
        </>
      )}
    </>
  );
};

export default RatingStar;
