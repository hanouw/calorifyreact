import React from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useSelector } from "react-redux";
import { useState } from "react";

const MyPage = () => {
  const { moveToMain, moveToMyPage, moveToMemInfo } = useCustomMove();
  const [profileImage, setProfileImage] = useState("/assets/imgs/meal.png");
  const [statusMessage, setStatusMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const { execLogout } = useCustomLogin();
  const loginInfo = useSelector((state) => state.loginSlice);
  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
    }
  };

  // 이 부분은 실제 데이터로 대체해야 합니다
  const memberData = {
    id: "user123",
    password: "********",
    email: "user@example.com",
    birthDate: "1990-01-01",
    gender: "남성",
    joinDate: "2023-01-01",
  };

  return (
    <>
      {/* Nav Bar */}
      <div className="grid grid-cols-5 justify-between items-center m-7 ">
        <div className="justify-self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 "
            onClick={() => moveToMain()}
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div className="col-span-3 text-center font-[Pretendard-Medium] text-3xl text-black">
          MY PAGE
        </div>
      </div>

      {/* Profile Card Area */}
      <div className="flex justify-center">
        <div className="bg-my-basic-green rounded-lg w-full mx-7 my-3 shadow-lg shadow-gray-400 py-5">
          <div className="grid grid-cols-6">
            <div className="col-start-2 col-span-4 justify-self-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/imgs/meal.png"}
                alt="Profile"
                className="w-16 rounded-full bg-white border-2"
              />
            </div>

            <div className="col-start-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-baseline mx-6 my-5">
            <span className="text-white">{loginInfo.nickName}</span>
            <span className="text-white text-xs">173cm 62kg</span>
          </div>

          <div className="flex justify-center font-[Pretendard-Medium] text-base text-my-text-deepblack px-5">
            <div
              className="bg-white rounded-2xl px-12 py-1.5  cursor-pointer text-xs"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
          <div>Calorify</div>
        </div>
      </div>

      {/* 기본정보 */}
      <div className="flex items-center justify-center m-8 ">
        <div className="flex text-start font-[Pretendard-Medium] text-xl text-my-basic-green">
          기본정보
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2">
        <div className="ml-8 bg-my-basic-green"></div>
        <div className="col-span-8 justify-start content-start bg-black">
          <div className="text-white">ID</div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
