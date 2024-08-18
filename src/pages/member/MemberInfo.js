import React from "react";
import useCustomMove from "../../hooks/useCustomMove";


const MemberInfo = () => {
    const { moveToMain, moveToMyPage } = useCustomMove();

    return(
        <>
            <div className="flex items-center justify-between m-7 ">
                <div className="flex text-start font-[Pretendard-Medium] text-3xl text-black">
                    내 정보 수정
                </div>
                
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7 mr-1 cursor-pointer"
                    onClick={() => moveToMyPage()}
                >
                    <path
                        fillRule="evenodd"
                        d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Profile Card Area */}
            <div className="flex justify center">
                <div className="bg-my-basic-green rounded-lg w-full mx-7 my-5 shadow-lg shadow-gray-400 py-10">
                    <div className="flex justify-content-center items-center">
                        <img
                            src={process.env.PUBLIC_URL + "/assets/imgs/meal.png"}
                            alt="Profile"
                            className="w-25 rounded-full bg-white border-2"
                        />
                    </div>

                    <button type="button" class="py-2.5 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            프로필 사진 수정
                    </button>
                </div>
            </div>
        </>
    );
};

export default MemberInfo;