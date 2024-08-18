import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();

  const moveToBack = () => {
    navigate(-1);
  };

  const moveToLandingPage = () => {
    navigate({ pathname: `/` });
  };

  const moveToMain = () => {
    navigate({ pathname: `/main` });
  };

  const moveToAdd = () => {
    navigate({ pathname: `/add` });
  };

  const moveToDetail = (meal) => {
    console.log("Data being passed to MealDetail:", meal);
    navigate({ pathname: `/detail`} , {state: {mealList: meal}});
  };

  const moveToMyPage = () => {
    navigate({ pathname: `/member/mypage` });
  };

  const moveToLogin = () => {
    navigate({ pathname: `/member/login` });
  };

  const moveToSignup = () => {
    navigate({ pathname: `/member/signup` });
  };

  const moveToMemInfo = () => {
    navigate({ pathname: '/member/meminfo'})
  }

  return {
    moveToBack,
    moveToMain,
    moveToMyPage,
    moveToAdd,
    moveToDetail,
    moveToLogin,
    moveToSignup,
    moveToMemInfo,
  };
};

export default useCustomMove;
