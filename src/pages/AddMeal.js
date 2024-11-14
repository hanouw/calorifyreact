import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const Camera = ({ callBackFn }) => {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();
  const [open, setOpen] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    startCamera();
  }, [open, refresh]);

  const handleSaveButton = () => {
    setOpen(false);
    callBackFn({ image: image, imageFile: imageFile });
  };

  const startCamera = () => {
    // 카메라 접근 및 스트리밍 시작 (navigator와 getUserMedia 지원 확인)
    if (
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } }) // 모바일에서 후면 카메라 사용
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
          alert("카메라에 접근할 수 없습니다. 브라우저 설정을 확인해 주세요.");
        });
    } else {
      console.log("이 브라우저에서는 카메라 접근이 지원되지 않습니다.");
      alert("이 브라우저는 카메라 기능을 지원하지 않습니다.");
    }
  };

  // 사진 촬영
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");

      // 캔버스 크기를 비디오 크기로 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 캔버스에 비디오의 현재 프레임 그리기
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캔버스의 이미지를 data URL로 변환
      const dataURL = canvas.toDataURL("image/png");
      setImage(dataURL);

      // 캔버스의 이미지를 Blob으로 변환하여 File 객체로 저장
      canvas.toBlob((blob) => {
        const file = new File([blob], "captured_image.png", {
          type: "image/png",
        });
        setImageFile(file);
      }, "image/png");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-40">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center lg:items-center lg:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden max-h-[90vh] rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in lg:my-8 lg:w-full lg:max-w-lg data-[closed]:lg:translate-y-0 data-[closed]:lg:scale-95"
            >
              <div className="flex bg-white px-4 pb-4 pt-5 justify-center">
                {/* --------------------------------------- */}
                {image ? (
                  <div>
                    <img
                      src={image}
                      alt="Captured"
                      style={{ width: "100%", maxWidth: "400px" }}
                    />

                    <canvas ref={canvasRef} style={{ display: "none" }} />
                  </div>
                ) : (
                  <div>
                    <video
                      ref={videoRef}
                      style={{ width: "100%", maxWidth: "400px" }}
                      className="rounded-md"
                    />

                    <canvas ref={canvasRef} style={{ display: "none" }} />
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full">
                {image ? (
                  <button
                    type="button"
                    onClick={() => {
                      setRefresh(!refresh);
                      setImage(null);
                    }}
                    className="w-full rounded-md border-2 border-my-graph-orange mx-4 lg:mx-24 py-2 text-sm font-[Pretendard-SemiBold] text-my-graph-orange shadow-sm hover:text-white hover:bg-my-graph-orange"
                  >
                    다시 촬영하기
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => capturePhoto()}
                    className={`w-full rounded-md border-2 border-my-graph-orange mx-4 lg:mx-24 py-2 text-sm font-[Pretendard-SemiBold] text-my-graph-orange shadow-sm hover:text-white hover:bg-my-graph-orange`}
                  >
                    촬영
                  </button>
                )}
              </div>
              <div className="px-4 py-3 lg:flex lg:flex-row-reverse lg:px-6">
                <button
                  type="button"
                  onClick={() => handleSaveButton()}
                  className="inline-flex w-full justify-center rounded-md bg-my-basic-green px-3 py-2 text-sm font-[Pretendard-SemiBold] text-white shadow-sm hover:bg-my-graph-orange lg:ml-3 lg:w-auto"
                >
                  저장
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-[Pretendard-SemiBold] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 lg:ml-3 lg:mt-0 lg:w-auto"
                >
                  취소
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Camera;
