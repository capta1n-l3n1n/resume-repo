import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSnackbar } from "zmp-ui";
import { toastMessageState } from "../../@app/state/toast-message.state";

const ToastMessage = (props: any) => {
  const [toastMessage, setToastMessage] = useRecoilState(toastMessageState);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    if (toastMessage) {
      openSnackbar({
        text: toastMessage,
        position: "top",
        type: props.props ?? "loading",

        action: {
          text: "Đóng",
          close: true,
        },
        duration: 5000,
      });
    }
    setToastMessage(undefined);
  }, [toastMessage]);

  return null;
};
export default ToastMessage;
