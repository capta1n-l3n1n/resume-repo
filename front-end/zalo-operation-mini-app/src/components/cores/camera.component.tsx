import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import api, { FacingMode, PhotoFormat, PhotoQuality, ZMACamera } from "zmp-sdk";
import { Icon } from "zmp-ui";

const Camera = forwardRef((props, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraRef = useRef<ZMACamera | null>(null);
  const [facingModeState, setFacingMode] = useState<FacingMode>(
    FacingMode.FRONT,
  );

  const initCameraContext = async () => {
    console.log("init camera");
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log("Media component not ready");
      return;
    }
    if (!cameraRef.current) {
      cameraRef.current = api.createCameraContext({
        videoElement: videoElement,
        mediaConstraints: {
          width: 640,
          height: 480,
          facingMode: facingModeState,
          audio: false,
        },
      });
    } else {
      cameraRef.current?.updateMediaConstraints({
        facingMode: facingModeState,
      });
    }
    await cameraRef.current?.start();
  };

  useImperativeHandle(ref, () => ({
    takePhoto: async () => {
      if (cameraRef.current) {
        return await cameraRef.current?.takePhoto({
          quality: PhotoQuality.NORMAL,
          format: PhotoFormat.JPEG,
        });
      }
      return null;
    },
  }));

  const switchCamera = () => {
    if (facingModeState == FacingMode.BACK) {
      setFacingMode(FacingMode.FRONT);
    } else {
      setFacingMode(FacingMode.BACK);
    }
  };

  useEffect(() => {
    initCameraContext();
  }, [facingModeState]);

  return (
    <div className="relative w-full">
      <video
        style={{ width: "100vw", height: "auto" }}
        ref={videoRef}
        muted
        playsInline
        webkit-playsinline=""
      />
      <button
        onClick={() => switchCamera()}
        className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md"
      >
        <Icon icon="zi-auto"></Icon>
      </button>
    </div>
  );
});

export default Camera;
