import React, { lazy, Suspense } from "react";
import LoadingPage from "../component/common/LoadingPage";

const Login = lazy(() => import("../pages/member/Login"));
const Signup = lazy(() => import("../pages/member/Signup"));
const MyPage = lazy(() => import("../pages/member/MyPage"));

const memberRouter = () => {
  return [
    {
      path: "mypage",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signup />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
