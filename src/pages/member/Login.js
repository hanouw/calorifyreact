import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";

const initState = {
  memId: "",
  password: "",
};

const LoginPage = () => {
  const { execLogin } = useCustomLogin();
  const { moveToMain, moveToSignup } = useCustomMove();
  const loginInfo = useSelector((state) => state.loginSlice);

  const [loginParam, setLoginParam] = useState({ ...initState });

  useEffect(() => {
    if (loginInfo.memId) {
      moveToMain();
    }
  });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = () => {
    execLogin(loginParam).then((data) => {
      //console.log(data);
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
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-36 mb-12">
        로그인
      </div>
      <div className="w-full px-7 my-7">
        <input
          name="memId"
          type="text"
          value={loginParam.memId}
          onChange={handleChange}
          className={inputClassName}
          placeholder="아이디"
          required
        />
      </div>
      <div className="w-full px-7 mb-4 my-7 rounded-xl">
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
      <div className="mx-7 my-10 border cursor-pointer">
        <button className={buttonClassName} onClick={handleClickLogin}>
          로그인하기
        </button>
      </div>
      <div
        className="text-my-text-deepblack underline cursor-pointer"
        onClick={() => moveToSignup()}
      >
        회원가입하기
      </div>
    </div>
  );
};

export default LoginPage;
