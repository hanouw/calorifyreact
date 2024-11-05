import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import { idIsduplicate, register } from "../../api/memberApi";

const initState = {
  memId: "",
  password: "",
  passwordConfirm: "",
  height: "",
  weight: "",
  memBirth: "",
  memEmail: "",
  memNickname: "",
  memSex: "Male",
};

const Signup = () => {
  const { execLogin } = useCustomLogin();
  const { moveToMain, moveToLogin } = useCustomMove();
  const loginInfo = useSelector((state) => state.loginSlice);

  const [loginParam, setLoginParam] = useState({ ...initState });
  const [idDupl, setIdDupl] = useState(false);

  useEffect(() => {
    if (loginInfo.memIdx) {
      moveToMain();
    }
  });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleIdDupl = async (e) => {
    if (
      e.target.value !== null &&
      e.target.value !== undefined &&
      e.target.value !== ""
    ) {
      const data = await idIsduplicate(e.target.value);
      setIdDupl(data.RESULT);
      return data.RESULT;
    }
  };

  const validatePassword = () => {
    const passwordErrors = [];
    if (loginParam.password.length < 8) {
      passwordErrors.push("비밀번호는 8자리 이상이어야 합니다.");
    }
    if (loginParam.password !== loginParam.passwordConfirm) {
      passwordErrors.push("비밀번호가 일치하지 않습니다.");
    }
    return passwordErrors;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    // setEmailValid(isValid);
    return isValid;
  };

  const handleClickSignup = () => {
    if (idDupl) {
      alert("이미 사용중인 아이디입니다.");
      return;
    }

    if (!validateEmail(loginParam.memEmail)) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }

    const passwordErrors = validatePassword();
    if (passwordErrors.length > 0) {
      alert(passwordErrors.join("\n"));
      return;
    }

    if (loginParam.memId.trim().length === 0) {
      alert("이름을 입력해주세요!");
      return;
    }

    register(loginParam).then((data) => {
      if (data.error === "ERROR_LOGIN") {
        alert("뭔가 틀림 잘못됐을수도");
      } else {
        execLogin(data).then((data) => {
          moveToMain();
        });
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
      <div className={`px-7 mt-7 ${!idDupl && "mb-1"}`}>
        <input
          name="memId"
          type="textarea"
          value={loginParam.memId}
          onChange={handleChange}
          className={inputClassName}
          placeholder="아이디"
          required
          onMouseOut={handleIdDupl}
          onBlur={handleIdDupl}
        />
      </div>
      {idDupl && (
        <div className="text-sm text-my-graph-orange font-[Pretentard-Bold] text-start pl-12">
          이미 사용중인 아이디입니다.
        </div>
      )}
      <div className={`w-full px-7 ${!idDupl ? "my-7" : "my-4"} rounded-xl`}>
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
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
          value={loginParam.memSex}
          onChange={handleChange}
          className={inputClassName}
          required
        >
          <option value="Male">남자</option>
          <option value="Female">여자</option>
        </select>
      </div>
      <div className="w-full  px-7 mb-4 my-7 rounded-xl">
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
      <div className="w-full px-7 mb-4 my-7 rounded-xl">
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
        className="text-my-text-deepblack underline cursor-pointer"
        onClick={() => moveToLogin()}
      >
        로그인하기
      </div>
    </div>
  );
};

export default Signup;
