import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import { register } from "../../api/memberApi";

const initState = {
  memId: "",
  password: "",
  passwordConfirm: "",
  height: "",
  weight: "",
  memBirth: "",
  memEmail: "",
  memNickname: "",
};

const Signup = () => {
  const { moveToMain, moveToLogin } = useCustomMove();
  const loginInfo = useSelector((state) => state.loginSlice);

  const [loginParam, setLoginParam] = useState({ ...initState });

  useEffect(() => {
    if (loginInfo.memIdx) {
      moveToMain();
    }
  });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickSignup = () => {
    console.log(loginParam);
    register(loginParam).then((data) => {
      console.log(data);
      if (data.error == "ERROR_LOGIN") {
        alert("뭔가 틀림 잘못됐을수도");
      } else {
        moveToMain();
      }
    });
  };

  const inputClassName =
    "bg-my-text-background text-my-text-deepblack border border-gray-300 text-sm rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full px-5 py-3";
  const buttonClassName =
    "bg-my-basic-green text-white text-center w-full flex justify-center items-center border-black focus:ring-4 focus:outline-none font-[Pretendard-Regular] rounded-2xl text-sm px-5 py-3";

  return (
    <div className="font-[Pretendard-Regular]">
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-10">
        회원가입
      </div>
      <div className="sm:w-1/2 md:w-1/3 px-7 my-7">
        <input
          name="memId"
          type="textarea"
          value={loginParam.memId}
          onChange={handleChange}
          className={inputClassName}
          placeholder="아이디"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="password"
          type="password"
          value={loginParam.password}
          onChange={handleChange}
          className={inputClassName}
          placeholder="비밀번호"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="passwordConfirm"
          type="password"
          value={loginParam.passwordConfirm}
          onChange={handleChange}
          className={inputClassName}
          placeholder="비밀번호 확인"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="memNickname"
          type="textarea"
          value={loginParam.memNickname}
          onChange={handleChange}
          className={inputClassName}
          placeholder="닉네임"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="memBirth"
          type="date"
          value={loginParam.memBirth}
          onChange={handleChange}
          className={inputClassName}
          placeholder="생년월일"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="memEmail"
          type="email"
          value={loginParam.memEmail}
          onChange={handleChange}
          className={inputClassName}
          placeholder="이메일"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        {/* <input
          name="memSex"
          type="radio"
          value={loginParam.password}
          onChange={handleChange}
          className={inputClassName}
          placeholder="성별"
          required
        /> */}
        <select
          name="memSex"
          value={loginParam.height}
          onChange={handleChange}
          className={inputClassName}
          required
        >
          <option value="Male">남자</option>
          <option value="FeMale">여자</option>
        </select>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="height"
          type="textarea"
          value={loginParam.height}
          onChange={handleChange}
          className={inputClassName}
          placeholder="키"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-7 mb-4 my-7 rounded-xl">
        <input
          name="weight"
          type="textarea"
          value={loginParam.weight}
          onChange={handleChange}
          className={inputClassName}
          placeholder="몸무게"
          required
        />
      </div>
      <div className="mx-7 my-10 border">
        <button className={buttonClassName} onClick={handleClickSignup}>
          회원가입하기
        </button>
      </div>
      <div
        className="text-my-text-deepblack underline"
        onClick={() => moveToLogin()}
      >
        로그인하기
      </div>
    </div>
  );
};

export default Signup;
