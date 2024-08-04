import React from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";

const MealDetail = () => {
  const meal = {
    mealId: 1,
    image: process.env.PUBLIC_URL + "/assets/imgs/exdata/meal_01.jpg",
    title: "아침",
    time: "09:18",
    cal: 400,
    tag: ["시리얼", "우유"],
  };
  return (
    <NoCalBasicLayout>
      <div className="my-5">
        <div className="flex text-my-basic-green text-start pl-10 font-[Pretendard-Medium] text-xl">
          {meal.title}
        </div>
        <div className="flex justify-between px-10 text-my-text-ligthgreen font-[Pretendard-Medium] text-sm pb-5">
          <span>{meal.time}</span>
          <span>{meal.cal} kcal</span>
        </div>
        <div className="relative flex justify-center">
          <div className="w-52 h-52 overflow-hidden rounded-3xl">
            <img
              src={meal.image}
              alt="description"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <span className="font-[Pretendard-Medium] text-sm">{meal.tag[0]}</span>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border w-full"></div>

      {/* 칼로리바 */}
      <div className="flex items-center justify-between mx-10 pt-5">
        <span className="font-[Pretendard-Medium] text-my-text-deepblack text-sm">
          칼로리
        </span>
        <div className="relative rounded-xl border border-my-text-deepblack w-4/5 h-3 bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-my-graph-orange rounded-l-xl"
            style={{ width: `30%` }}
          />
        </div>
      </div>
      <div className="flex pr-10 justify-end font-[Pretendard-Light] text-sm text-my-text-lightblack pb-5">
        2890 kcal
      </div>
      <div className="border border-gray-200 bg-my-text-background rounded-lg m-4 text-start">
        <div className="mb-2 font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3">
          영양성분
        </div>
        <div className="font-[Pretendard-Light] px-7 py-3">
          <div className="flex justify-between py-1">
            <span>탄수화물</span>
            <span>48.8 g</span>
          </div>
          <div className="flex justify-between py-1">
            <span>단백질</span>
            <span>48.8 g</span>
          </div>
          <div className="flex justify-between py-1">
            <span>지방</span>
            <span>48.8 g</span>
          </div>
          <div className="flex justify-between py-1">
            <span>식이섬유</span>
            <span>48.8 g</span>
          </div>
        </div>
      </div>
    </NoCalBasicLayout>
  );
};

export default MealDetail;
