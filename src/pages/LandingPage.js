import React from "react";
import useCustomMove from "../hooks/useCustomMove";



const LandingPage = () => {
  const { moveToMain } = useCustomMove();

  return (
    <>
      <div className="w-full fixed">
        <div className="flex items-center justify-end bg-my-basic-green rounded-bl-[48px] shadow-gray-400 shadow-md h-[90px]">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="size-9 mr-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg> */}
        </div>
      </div>

      <div className="py-32">
        <div className="flex items-center justify-center">
          <div className="pt-20 text-my-basic-green text-5xl font-semibold">
            Calorify
          </div>
          <div className="pt-28 text-lg font-semibold">에 오신 것을</div>
        </div>
        <div className="pl-28 text-3xl font-bold">환영합니다.</div>

        <div className="flex items-center justify-center pt-10">
          <button
            className="py-2 px-7 text-white bg-my-basic-green rounded-xl shadow-gray-400 shadow-md"
            onClick={() => moveToMain()}
          >
            회원가입하고 시작하기
          </button>
        </div>
      </div>

      {/* <div className="bg-my-deep-green">

          <img
            src={"assets/imgs/showcaseimage/LandingPage1.png"}
            alt="LanddingPage1"
            className=" object-cover"
          />

      </div> */}
    </>
  );
};

export default LandingPage;
