import React, { useState } from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";
import { getFoodData, getYolo } from "../api/foodApi";
import { useSelector } from "react-redux";
import { saveMeal } from "../api/mealApi";
import useCustomMove from "../hooks/useCustomMove";
import { useDate } from "../layouts/DateContext";

const AddMeal = () => {
  // 페이지 이동
  const { moveToMain } = useCustomMove();
  // 이미지 미리보기 파일
  const [images, setImages] = useState();
  // 이미지 실제 파일
  const [imageFiles, setImageFiles] = useState([]);
  // 음식 정보
  const [data, setData] = useState([]);
  // 로그인 정보
  const loginInfo = useSelector((state) => state.loginSlice);

  // Main.js 헤더에서 가져온 날짜
  const { date } = useDate();
  const [saveDate, setSaveDate] = useState(date);

  // 시간 계산
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const handleFileChange = (e) => {
    // 파일 저장
    const file = e.target.files[0];
    setImageFiles(file);

    // getName();
    getCalClicked();

    // 미리보기 이미지
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const temp = reader.result;
      setImages(temp);
    };
  };

  const getCalClicked = async () => {
    const foods = ["김치", "볶음밥", "피자"];
    setData([]);
    for (let i = 0; i < 3; i++) {
      const result = await getFoodData(foods[i]);
      setData((prevData) => [...prevData, ...result.body.items]);
    }
  };

  const getName = async () => {
    const result = await getYolo(imageFiles).then(() => {
      getCalClicked();
    });
    setImages(result.image);
  };

  const handleSaveClicked = async () => {
    if (imageFiles == null) {
      alert("이미지 넣으세요");
    } else {
      await saveMeal({
        imageFile: imageFiles,
        mealData: data,
        loginInfo: loginInfo.memId,
        date: saveDate,
      }).then((result) => {
        console.log(result);
        moveToMain();
      });
    }
  };

  const handleDateChange = (e) => {
    setSaveDate(e.target.value);
  };
  return (
    <NoCalBasicLayout>
      <div className="my-5">
        <div className="flex text-my-basic-green text-start pl-10 font-[Pretendard-Medium] text-xl">
          사진등록
        </div>

        <div>
          <input
            className="font-[Pretendard-Light] border-2 rounded-lg p-1 my-5"
            type="datetime-local"
            defaultValue={`${date}T${hours}:${minutes}`}
            onChange={handleDateChange}
          />
        </div>

        <div className="relative pb-10 overflow-x-scroll">
          <div className="flex justify-center space-x-4">
            <div className="w-52 h-52 overflow-hidden rounded-3xl border p-1 inline-block">
              <img
                src={
                  images
                    ? images
                    : process.env.PUBLIC_URL + "/assets/imgs/diet.png"
                }
                alt={`Uploaded image`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-my-text-ligthgreen font-[Pretendard-Regular] text-sm pb-5 px-10">
          <div
            className="flex justify-center items-center w-32 h-10 gap-2 bg-my-basic-green text-white rounded-2xl"
            onClick={() => alert("카메라 열기")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>사진 촬영</span>
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Custom Button */}
          <div
            className="flex justify-center items-center w-32 h-10 gap-2 bg-my-basic-green text-white rounded-2xl cursor-pointer"
            onClick={() => document.getElementById("file-input").click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            <span>앨범에서 선택</span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border w-full"></div>

      {/* 칼로리바 */}
      {data.map((info, index) => (
        <div
          className="border border-gray-200 bg-my-text-background rounded-lg m-4 text-start"
          key={index}
        >
          <div className="flex justify-between mb-2 text-xs font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3 px-4 items-center">
            <div className="font-[Pretendard-Bold] text-xl">
              {info.DESC_KOR}
            </div>
            <div className="text-end">
              <div className="text-my-text-deepblack">
                1회 제공량: {info.SERVING_WT} g
              </div>
              <div className="text-my-text-deepblack">
                {info.NUTR_CONT1} kcal
              </div>
            </div>
          </div>
          <div className="flex justify-between font-[Pretendard-Regular] px-7 py-3">
            <div className="flex flex-col items-center py-1">
              <div className="text-center">탄수화물</div>
              <span className="text-center">
                {info.NUTR_CONT2 !== "N/A" ? info.NUTR_CONT2 : "0"} g
              </span>
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="text-center">단백질</div>
              <span className="text-center">
                {info.NUTR_CONT3 !== "N/A" ? info.NUTR_CONT3 : "0"} g
              </span>
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="text-center">지방</div>
              <span className="text-center">
                {info.NUTR_CONT4 !== "N/A" ? info.NUTR_CONT4 : "0"} g
              </span>
            </div>
            <div className="flex flex-col items-center py-1">
              <div className="text-center">당류</div>
              <span className="text-center">
                {info.NUTR_CONT5 !== "N/A" ? info.NUTR_CONT5 : "0"} g
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="mb-20"></div>
      <div
        className="fixed flex bg-my-basic-green h-16 w-full bottom-0 text-white justify-center items-center font-[Pretendard-Regular] text-xl rounded-t-lg"
        onClick={() => handleSaveClicked()}
      >
        확인 및 등록
      </div>
    </NoCalBasicLayout>
  );
};

export default AddMeal;
