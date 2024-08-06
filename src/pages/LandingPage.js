import React from "react";
import useCustomMove from "../hooks/useCustomMove";

const LandingPage = () => {
  const { moveToMain } = useCustomMove();
  return (
    <div>
      LandingPage
      <div className="w-full bg-red-50" onClick={() => moveToMain()}>
        Main 으로 이동
      </div>
    </div>
  );
};

export default LandingPage;
