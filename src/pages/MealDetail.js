import React, { useEffect, useState } from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";
import { useLocation } from "react-router-dom";
import { deleteMeal } from "../api/mealApi";
import { useSelector } from "react-redux";

const MealDetail = () => {
  const [totalCal, setTotalCal] = useState();
  const [modifyClick, setModifyClick] = useState([]);
  const loginInfo = useSelector((state) => state.loginSlice);
  const location = useLocation();
  const mealList = location.state?.mealList?.meal || [];

  console.log(mealList);

  const modifyClicked = (index) => {
    setModifyClick((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleDelete = (meal) => {
    console.log(meal.calDate, meal.calMealNum, loginInfo.memId);
    deleteMeal({
      calDateData: meal.calDate,
      calMealNumData: meal.calMealNum,
      memIdData: loginInfo.memId,
    });
  };

  useEffect(() => {
    let bool = [];
    for (let i = 0; i < mealList.length; i++) {
      bool.push(false);
    }
    setModifyClick(bool);

    let temp = 0;
    for (let i = 0; i < mealList.length; i++) {
      temp += parseFloat(mealList[i].calCal);
    }
    setTotalCal(temp);
  }, []);

  return (
    <NoCalBasicLayout>
      <div className="my-5">
        <div className="flex justify-between px-5 text-my-basic-green font-[Pretendard-Medium] text-sm">
          <span className="text-xl">식사</span>
        </div>
        <div className="flex justify-between px-5 text-my-basic-green font-[Pretendard-Medium] text-sm">
          <span className="text-sm text-my-text-ligthgreen">
            {new Date(mealList[0].calDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="text-my-text-lightblack">총 {totalCal}kcal</div>
        </div>
      </div>

      <div className="relative flex justify-center pb-5">
        <div className="w-52 h-52 overflow-hidden rounded-3xl">
          <img
            src={
              process.env.PUBLIC_URL +
              "/assets/saved/" +
              mealList[0].calImgStored
            }
            alt={mealList[0].calFoodName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border w-full bg-black"></div>

      {Array.isArray(mealList) && mealList.length > 0 ? (
        mealList.map((meal, index) => (
          <div key={index} className="relative m-4">
            {/* 영양성분 내용 */}
            <div
              className={`relative transition-transform duration-500 ${
                modifyClick[index]
                  ? "-translate-x-60 z-30"
                  : "translate-x-0 z-30"
              } bg-my-text-background rounded-lg cursor-pointer flex-grow border border-gray-200`}
              onClick={() => modifyClicked(index)}
            >
              <div className="flex justify-between mb-2 font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3">
                <div>영양성분: {meal.calFoodName}</div>
                <div>{meal.calCal} kcal</div>
              </div>

              <div className="font-[Pretendard-Light] px-7 py-3">
                <div className="flex justify-between py-1">
                  <span>탄수화물</span>
                  <span>{meal.calCarb} g</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>단백질</span>
                  <span>{meal.calProt} g</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>지방</span>
                  <span>{meal.calFat} g</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>식이섬유</span>
                  <span>{meal.calFib || "NA"} g</span>
                </div>
              </div>
            </div>

            {/* 수정 버튼 */}
            <div className="absolute top-0 right-0 h-full flex ">
              <div className="relative top-0 right-0 h-full flex transition-transform duration-500">
                <div className="bg-green-500 text-white flex justify-center items-center translate-x-6 w-36 rounded-lg z-20 pl-[24px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </div>
              </div>

              {/* 삭제 버튼 */}
              <div
                className="flex bg-gray-500 text-white w-36 rounded-lg items-center justify-center pl-[24px]"
                onClick={() => handleDelete(meal)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>식사 데이터가 없습니다.</div>
      )}
    </NoCalBasicLayout>
  );
};

export default MealDetail;
