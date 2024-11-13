import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getMemInfo, memberModify } from "../../api/memberApi";
import { useSelector } from "react-redux";
import { login } from "../../slices/loginSlice";

const MemberInfo = () => {
  const { moveToMyPage } = useCustomMove();
  const [profileImage, setProfileImage] = useState("/assets/imgs/meal.png");
  const [statusMessage, setStatusMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [refresh, setRefresh] = useState(true);
  const loginInfo = useSelector((state) => state.loginSlice);

  const memberInit = {
    id: "",
    password: "",
    email: "",
    birthDate: "",
    gender: "",
  };

  const [memberData, setMemberData] = useState({ ...memberInit });

  useEffect(() => {
    getMemInfo({ memId: loginInfo.memId }).then((data) => {
      const date = new Date(data.memBirth);
      setHeight(data.memHeight);
      setWeight(data.memWeight);
      setNickname(data.memNickname);
      setMemberData({
        id: loginInfo.memId,
        password: "",
        email: data.memEmail,
        birthDate: `${date.getFullYear()}.${String(
          date.getMonth() + 1
        ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
        gender: data.memSex,
      });
    });
  }, [refresh]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await memberModify(loginInfo.memId, {
      memNickname: nickname,
      memHeight: height,
      memWeight: weight,
      memStatMsg: statusMessage,
    }).then(() => {
      setRefresh(!refresh);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between m-7">
        <div className="flex text-start font-[Pretendard-Medium] text-3xl text-black">
          Edit My Profile
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

      <div className="bg-my-basic-green rounded-lg mx-7 my-5 shadow-lg shadow-gray-400 py-10">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer hover:bg-green-600 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <input
                id="profile-upload"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태 메시지
              </label>
              <textarea
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                placeholder="나를 표현하는 한 마디"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                rows="3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  닉네임
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  키 (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  몸무게 (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                />
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                기본 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(memberData).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      disabled
                      className="w-full p-3 bg-gray-200 border border-gray-300 rounded-md text-gray-600 cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
          >
            정보 수정 완료
          </button>
        </form>
      </div>
    </>
  );
};

export default MemberInfo;
