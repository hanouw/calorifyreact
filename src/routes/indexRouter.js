import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import memberRouter from "./memberRouter";
import LoadingPage from "../component/common/LoadingPage";

const Main = lazy(() => import("../pages/Main"));
const AddMeal = lazy(() => import("../pages/AddMeal"));
const Detail = lazy(() => import("../pages/MealDetail"));
const MemberIndex = lazy(() => import("../pages/member/MemberIndex"));

const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <AddMeal />
        </Suspense>
      ),
    },
    {
      path: "detail",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Detail />
        </Suspense>
      ),
    },
    {
      path: "member",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MemberIndex />
        </Suspense>
      ),
      children: memberRouter(),
    },
  ]);
};

export default Router;
