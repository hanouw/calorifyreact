import React from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const MyPage = () => {
  const { moveToMain, moveToLogin } = useCustomMove();
  const { execLogout } = useCustomLogin();
  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
    }
  };
  return (
    <>
      <div className="flex items-center justify-between m-7">
        <div className="flex text-start font-[Pretendard-Medium] text-3xl text-black">
          MY PAGE
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7 mr-1"
          onClick={() => moveToMain()}
        >
          <path
            fillRule="evenodd"
            d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Profile Card Area */}
      <div className="flex justify-center">
        <div className="bg-my-basic-green rounded-lg w-full mx-7 my-5 shadow-lg shadow-gray-400 py-10">
          <div className="flex justify-between items-center px-7 pb-7">
            <img
              src={process.env.PUBLIC_URL + "/assets/imgs/meal.png"}
              alt="Profile"
              className="w-14 rounded-full bg-white border-2"
            />
            <div className="font-[Pretendard-Regular] text-base text-white">
              밥먹는 무지
              <span className="text-xs"> 님</span>
            </div>
          </div>
          <div className="flex justify-between font-[Pretendard-Medium] text-base text-my-text-deepblack px-5">
            <div className="bg-white rounded-2xl px-7 py-1">정보수정</div>
            <div
              className="bg-white rounded-2xl px-7 py-1"
              onClick={handleLogout}
            >
              로그아웃
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-red-50" onClick={() => moveToLogin()}>
        로그인페이지로이동
      </div>
    </>
  );
};

export default MyPage;
