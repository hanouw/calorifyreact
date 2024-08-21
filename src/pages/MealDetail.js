import React, { useEffect, useState } from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";
import { useLocation } from "react-router-dom";

const MealDetail = () => {
  const [totalCal, setTotalCal] = useState();
  const [modifyClick, setModifyClick] = useState([]);
  const location = useLocation();
  const mealList = location.state?.mealList?.meal || [];

  const modifyClicked = (index) => {
    setModifyClick((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
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
          <text className="text-xl">식사</text>
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
      <div className="border-gray-200 border w-full"></div>
      {Array.isArray(mealList) && mealList.length > 0 ? (
        mealList.map((meal, index) => (
          <div key={index}>
            <span className="bg-black font-[Pretendard-Medium] text-sm"></span>
            <div className="flex">
              <div
                className="relative overflow-hidden m-4 rounded-lg"
                onClick={() => modifyClicked(index)}
              >
                {/* 영양성분 내용 */}
                <div className="flex-grow border border-gray-200 bg-my-text-background text-start rounded-lg">
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
              </div>

              {/* 수정 및 삭제 버튼 */}
              <div className="flex border transition-all duration-400 ease-in-out">
                <button
                  className={`bg-green-500 text-white overflow-hidden ${
                    modifyClick[index] ? "w-0" : "w-32"
                  }`}
                >
                  수정{modifyClick[index] + ""}
                </button>
                <button className="bg-gray-500 text-white p-4">삭제</button>
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
