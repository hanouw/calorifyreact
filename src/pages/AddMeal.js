import React from "react";
import NoCalBasicLayout from "../layouts/NoCalBasicLayout";

const AddMeal = () => {
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
          사진등록
        </div>

        <div className="relative flex justify-center py-10">
          <div className="w-52 h-52 overflow-hidden rounded-3xl">
            <img
              src={meal.image}
              alt="description"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-my-text-ligthgreen font-[Pretendard-Regular] text-sm pb-5 px-10">
          <div className="flex justify-center items-center w-32 h-10 gap-2 bg-my-basic-green text-white rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
              <path
                fill-rule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>사진 촬영</span>
          </div>
          <div className="flex justify-center items-center w-32 h-10 gap-2 bg-my-basic-green text-white rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>앨범에서 선택</span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-gray-200 border w-full"></div>

      {/* 칼로리바 */}
      <div className="border border-gray-200 bg-my-text-background rounded-lg m-4 text-start">
        <div className="mb-2 font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3">
          갈비탕 <span>{meal.cal} kcal</span>
        </div>
        <div className="flex justify-between font-[Pretendard-Light] px-7 py-3 ">
          <div className=" py-1">
            <div>탄수화물</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>단백질</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>지방</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>식이섬유</div>
            <span>48.8 g</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 bg-my-text-background rounded-lg m-4 text-start">
        <div className="mb-2 font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3">
          갈비탕 <span>{meal.cal} kcal</span>
        </div>
        <div className="flex justify-between font-[Pretendard-Light] px-7 py-3 ">
          <div className=" py-1">
            <div>탄수화물</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>단백질</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>지방</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>식이섬유</div>
            <span>48.8 g</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 bg-my-text-background rounded-lg m-4 text-start">
        <div className="mb-2 font-[Pretendard-Medium] border-b-2 border-gray-300 w-full p-3">
          갈비탕 <span>{meal.cal} kcal</span>
        </div>
        <div className="flex justify-between font-[Pretendard-Light] px-7 py-3 ">
          <div className=" py-1">
            <div>탄수화물</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>단백질</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>지방</div>
            <span>48.8 g</span>
          </div>
          <div className=" py-1">
            <div>식이섬유</div>
            <span>48.8 g</span>
          </div>
        </div>
      </div>
      <div className="mb-20"></div>
      <div className="fixed flex bg-my-basic-green h-16 w-full bottom-0 text-white justify-center items-center font-[Pretendard-Regular] text-xl rounded-t-lg">
        확인 및 등록
      </div>
    </NoCalBasicLayout>
  );
};

export default AddMeal;
