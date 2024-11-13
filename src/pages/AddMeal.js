import React, { useEffect, useState } from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";
import { getFoodData, getYolo } from "../api/foodApi";
import { useSelector } from "react-redux";
import { saveMeal } from "../api/mealApi";
import useCustomMove from "../hooks/useCustomMove";
import { useDate } from "../layouts/DateContext";
import Camera from "../component/common/Camera";
import Spinner from "../hooks/spinner.js";

const AddMeal = () => {
  // 페이지 이동
  const { moveToMain } = useCustomMove();
  // 이미지 미리보기 파일
  const [images, setImages] = useState(null);
  // 이미지 실제 파일
  const [imageFiles, setImageFiles] = useState(null);
  // 음식 정보
  const [data, setData] = useState([]);
  // 카메라 여부
  const [isCameraOn, setIsCameraOn] = useState(false);
  // 로그인 정보
  const loginInfo = useSelector((state) => state.loginSlice);
  // 수정 열기
  const [isModifyOpen, setIsModifyOpen] = useState([]);
  // 새로고침
  const [refresh, setRefresh] = useState(false);
  // 로딩
  const [loading, setLoading] = useState(false);

  // Main.js 헤더에서 가져온 날짜
  const { date } = useDate();
  // 시간 계산
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const [saveDate, setSaveDate] = useState(date + "T" + hours + ":" + minutes);

  useEffect(() => {
    let bool = [];
    for (let i = 0; i < data.length; i++) {
      bool.push(false);
    }
    setIsModifyOpen(bool);
  }, [data]);

  const handleFileChange = (e) => {
    try {
      // 파일 저장
      const file = e.target.files[0];
      setImageFiles(file);

      //console.log(file);

      // 미리보기 이미지
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const temp = reader.result;
        setImages(temp);
      };

      // getName();
      getName(file);
    } catch {
      //console.log("이미지 선택 안함");
    }
  };

  const handleCameraData = async ({ image, imageFile }) => {
    setIsCameraOn(!isCameraOn);
    setImages(image);
    setImageFiles(imageFile);
    getName(imageFile);
    // const foods = getName(imageFile);
    // // setData([]);
    // // for (let i = 0; i < foods.length; i++) {
    // //   const result = await getFoodData(foods[i]);
    // //   if (result.body) {
    // //     setData((prevData) => [...prevData, ...result.body.items]);
    // //   }
    // // }
  };

  const modifyClicked = (index) => {
    setIsModifyOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleDelete = (index) => {
    data.splice(index, 1);
    isModifyOpen[index] = false;
    setRefresh({ ...!refresh });
  };

  const getCalClicked = async (data) => {
    try {
      //console.log(data);
      const foods = data;
      setData([]);
      for (let i = 0; i < foods.length; i++) {
        const result = await getFoodData(foods[i]);
        setData((prevData) => [...prevData, ...result.body.items]);
      }
    } catch {
    }
  };

  const getName = async (data) => {
    let result;
    setLoading(true);
    try {
      result = await getYolo(data).then((returnData) => {
        //console.log(returnData);
        getCalClicked(returnData.food_classes).then(() => {
          setLoading(false);
        });
        return returnData;
      });
    } catch {
      getCalClicked(["밥"]).then(() => {
        setLoading(false);
      });
    }

    return result;
  };

  const handleSaveClicked = async () => {
    if (imageFiles == null || images == null) {
      alert("이미지 넣으세요");
    } else {
      //console.log({
        imageFile: imageFiles,
        mealData: data,
        loginInfo: loginInfo.memId,
        date: saveDate,
      });
      await saveMeal({
        imageFile: imageFiles,
        mealData: data,
        loginInfo: loginInfo.memId,
        date: saveDate,
      }).then((result) => {
        //console.log(result);
        window.location.href = "http://3.39.76.255:3000/main";
      });
    }
  };

  const handleDateChange = (e) => {
    setSaveDate(e.target.value);
  };
  return (
    <NoCalBasicLayout>
      {loading && (
        <div className="fixed w-full h-full inset-0 bg-gray-200 bg-opacity-55 z-40 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {isCameraOn && <Camera callBackFn={handleCameraData} />}
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
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-my-text-ligthgreen font-[Pretendard-Regular] text-sm pb-5 px-10 cursor-pointer">
          <div
            className="flex justify-center items-center w-32 h-10 gap-2 bg-my-basic-green text-white rounded-2xl"
            onClick={() => setIsCameraOn(!isCameraOn)}
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

      {/* 칼로리 */}
      {data.map((meal, index) => (
        <div key={index} className="relative m-4">
          {/* 영양성분 내용 */}
          <div
            className={`relative transition-transform duration-500 ${
              isModifyOpen[index]
                ? "-translate-x-60 z-30"
                : "translate-x-0 z-30"
            } bg-my-text-background rounded-lg cursor-pointer flex-grow border border-gray-200`}
            onClick={() => modifyClicked(index)}
          >
            <div className="flex justify-between mb-2 text-xs font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3 px-4 items-center">
              <div className="font-[Pretendard-Bold] text-xl">
                {meal.DESC_KOR}
              </div>
              <div className="text-end">
                <div className="text-my-text-deepblack">
                  1회 제공량: {meal.SERVING_WT} g
                </div>
                <div className="text-my-text-deepblack">
                  {meal.NUTR_CONT1} kcal
                </div>
              </div>
            </div>
            <div className="flex justify-between font-[Pretendard-Regular] px-7 py-3">
              <div className="flex flex-col items-center py-1">
                <div className="text-center">탄수화물</div>
                <span className="text-center">
                  {meal.NUTR_CONT2 !== "N/A" ? meal.NUTR_CONT2 : "0"} g
                </span>
              </div>
              <div className="flex flex-col items-center py-1">
                <div className="text-center">단백질</div>
                <span className="text-center">
                  {meal.NUTR_CONT3 !== "N/A" ? meal.NUTR_CONT3 : "0"} g
                </span>
              </div>
              <div className="flex flex-col items-center py-1">
                <div className="text-center">지방</div>
                <span className="text-center">
                  {meal.NUTR_CONT4 !== "N/A" ? meal.NUTR_CONT4 : "0"} g
                </span>
              </div>
              <div className="flex flex-col items-center py-1">
                <div className="text-center">당류</div>
                <span className="text-center">
                  {meal.NUTR_CONT5 !== "N/A" ? meal.NUTR_CONT5 : "0"} g
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full flex ">
            {/* 수정 버튼 */}
            <div className="relative top-0 right-0 h-full flex transition-transform duration-500">
              <div className="bg-green-500 text-white flex justify-center items-center translate-x-6 w-36 rounded-lg z-20 pl-[24px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </div>
            </div>

            {/* 삭제 버튼 */}
            <div
              className="flex bg-gray-500 text-white w-36 rounded-lg items-center justify-center pl-[24px]"
              onClick={() => handleDelete(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}

      <div className="mb-20"></div>
      <div
        className="fixed flex z-50 bg-my-basic-green h-16 w-full bottom-0 text-white justify-center items-center font-[Pretendard-Regular] text-xl rounded-t-lg"
        onClick={() => handleSaveClicked()}
      >
        확인 및 등록
      </div>
    </NoCalBasicLayout>
  );
};

export default AddMeal;
