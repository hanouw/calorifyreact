import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomMove from "../hooks/useCustomMove";
import { getMeal } from "../api/mealApi";
import { useDate } from "../layouts/DateContext";
import { useSelector } from "react-redux";

const Main = () => {
  const { moveToDetail, moveToAdd } = useCustomMove();
  const { date, calChange, cal, calClean } = useDate();
  const loginInfo = useSelector((state) => state.loginSlice);

  const [mealList, setMealList] = useState([]);

  const formatDate = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식으로 출력
    });
  };

  const getSumCal = (meal) => {
    return meal.reduce((sum, data) => sum + parseFloat(data.calCal), 0);
  };

  useEffect(() => {
    console.log(date);
    // calClean();
    getMeal({ memId: loginInfo.memId, date: date }).then((data) => {
      console.log(data);
      setMealList(data.RESULT);

      let totalCal = 0;
      for (let i = 0; i < data.RESULT.length; i++) {
        for (let j = 0; j < data.RESULT[i].length; j++) {
          totalCal += parseFloat(data.RESULT[i][j].calCal);
        }
      }
      calChange(totalCal);
    });
  }, [date]);
  return (
    <BasicLayout>
      <div className="fixed flex w-14 h-14 bottom-5 right-5 rounded-full justify-center items-center bg-my-basic-green">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="size-6"
          onClick={() => moveToAdd()}
        >
          <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
          <path
            fillRule="evenodd"
            d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-start font-[Pretendard-Medium] text-lg text-my-basic-green pl-10 my-3">
        식단
      </div>
      {mealList.map((meal, index) => (
        <div
          key={index}
          className="grid items-center px-10 mb-4 pb-4 border-b-2"
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => moveToDetail({ meal })}
          >
            {/* 첫 번째 칸: image와 title */}
            <div className="relative">
              <div className="w-40 h-36 overflow-hidden rounded-3xl">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/saved/${meal[0].calImgStored}`
                  }
                  alt="description"
                  className="w-full h-full object-cover"
                />
              </div>
              <img
                src={process.env.PUBLIC_URL + "/assets/imgs/imgbggreen.png"}
                alt="background green"
                className="absolute bottom-0 bg-opacity-70 flex items-center justify-center rounded-b-3xl opacity-80"
              />
              <span className="absolute bottom-3 w-7/12 text-white font-[Pretendard-Bold]">
                {/* {meal[0].title} */}
                식사 {index + 1}
              </span>
            </div>

            {/* 두 번째 칸: 칼로리와 태그 */}
            <div className="ml-5 font-[Pretendard-Medium] text-my-text-deepblack h-36 w-full">
              <div className="text-end top-0 text-my-text-ligthgreen mb-4">
                {formatDate(new Date(meal[0].calDate))}
              </div>
              <div className="text-start text-sm">
                칼로리: {getSumCal(meal)}kcal
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {meal.map((food, index) => (
                  <div
                    key={index + "번째 음식"}
                    className="bg-my-text-background text-xs rounded-lg w-fit px-2"
                  >
                    # {food.calFoodName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </BasicLayout>
  );
};

export default Main;
