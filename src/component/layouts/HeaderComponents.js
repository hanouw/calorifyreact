import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";

const HeaderComponents = ({ layout }) => {
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToMyPage, moveToMain, moveToLogin } = useCustomMove();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayCalory, setTodayCalory] = useState(30);
  const [isCalendar, setIsCalendar] = useState(false);
  const [days, setDays] = useState([]);
  const dow = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    console.log(loginInfo);
    if (!loginInfo.memId) {
      alert("로그인이 필요합니다");
      moveToLogin();
    }
    const today = currentDate.getDate();
    const dow = currentDate.getDay(); // 0 (일요일) ~ 6 (토요일)
    let newArr = [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    for (let i = 0; i < 7; i++) {
      newArr.push(new Date(year, month, today - dow + i));
    }

    setDays(newArr);
  }, [currentDate]);

  // 그 달이 몇일인지
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 이전달 계산
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonth;
    });
  };

  // 다음달 계산
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonth;
    });
  };

  // 날짜 클릭됨
  const dayClicked = (clickedDate) => {
    setCurrentDate(new Date(year, month, clickedDate));
    setIsCalendar(false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = new Date(year, month, 1).getDay(); // 0 = 일요일, 6 = 토요일

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div
      className={`shadow-lg transition-all duration-400 ease-in-out ${
        isCalendar && "h-screen"
      } ${
        layout === "basic"
          ? "h-[230px] bg-white shadow-gray-200"
          : "rounded-bl-[48px]"
      }`}
    >
      <div
        className={`bg-my-basic-green rounded-bl-[48px] p-7 transition-all duration-400 ease-in-out ${
          isCalendar ? "h-5/6" : "h-[164px]"
        } ${layout === "basic" ? "shadow-lg shadow-gray-400" : "shadow-md"}`}
      >
        {isCalendar ? (
          <div>
            <span
              className="flex text-start font-[Pretendard-Medium] text-3xl text-white"
              onClick={() => setIsCalendar(!isCalendar)}
            >
              Calorify
            </span>
            <div
              className="justify-center text-white text-xl font-[Pretendard-Bold] px-10 pt-10 pb-7"
              onClick={() => setIsCalendar(!isCalendar)}
            >
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </div>

            {/* 이전달 다음달 */}
            <div className="flex justify-between w-full pb-10 text-white">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handlePrevMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <button className="font-[Pretendard-Regular] select-none">
                  이전달
                </button>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleNextMonth}
              >
                <button className="font-[Pretendard-Regular] select-none">
                  다음달
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-3 w-full select-none">
              {/* 월화수목금토일 */}
              {dow.map((day) => (
                <div
                  key={day}
                  className="text-center font-[Pretendard-Medium] text-sm text-my-text-ligthgreen pb-5"
                >
                  {day}
                </div>
              ))}
              {/* 시작한 날 ...Array() 안에 작성 */}
              {[...Array(startDay)].map((_, index) => (
                <div key={`empty-${index}`} className="text-center"></div>
              ))}
              {dates.map((date) => (
                <div
                  className="grid justify-center place-items-center text-sm mb-10"
                  key={date}
                  onClick={() => dayClicked(date)}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 font-[Pretendard-Regular] text-sm text-white ${
                      currentDate.getDate() === date &&
                      "rounded-full border border-white"
                    }`}
                  >
                    {date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center pb-10">
              <span
                className="font-[Pretendard-Medium] text-3xl text-white w-full text-start"
                onClick={() => {
                  layout === "basic"
                    ? setIsCalendar(!isCalendar)
                    : moveToMain();
                }}
              >
                Calorify
              </span>
              <img
                src={process.env.PUBLIC_URL + "/assets/imgs/meal.png"}
                alt="Profile"
                className="max-w-10 rounded-full bg-white"
                onClick={moveToMyPage}
              />
            </div>

            <div className="flex font-[Pretendard-Regular] text-sm text-white justify-between items-center">
              {days.map((day) => (
                <div
                  key={day.getDate()}
                  className={`w-7 h-7 flex items-center justify-center ${
                    currentDate.getDate() === day.getDate() &&
                    "rounded-full border border-white"
                  }`}
                  onClick={() => {
                    layout === "basic" && setCurrentDate(day);
                  }}
                >
                  {day.getDate()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* 하단부 */}
      {layout === "basic" && (
        <div>
          <div className="flex items-center justify-between mx-10 pt-5">
            <span className="font-[Pretendard-Medium] text-my-text-deepblack text-sm">
              칼로리
            </span>
            <div className="relative rounded-xl border border-my-text-deepblack w-4/5 h-3 bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full bg-my-graph-orange rounded-l-xl"
                style={{ width: `${todayCalory}%` }}
              />
            </div>
          </div>
          <div className="flex pr-10 justify-end font-[Pretendard-Light] text-sm text-my-text-lightblack">
            2890 kcal
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderComponents;
