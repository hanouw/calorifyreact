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

  const moveToDetail = () => {
    navigate({ pathname: `/detail` });
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

  return {
    moveToBack,
    moveToMain,
    moveToMyPage,
    moveToAdd,
    moveToDetail,
    moveToLogin,
    moveToSignup,
  };
};

export default useCustomMove;
