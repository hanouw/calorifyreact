import React from "react";
import { DateProvider } from "./DateContext"; // Context 파일의 경로에 맞게 수정
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <div>
      <Header layout="basic" />
      <div className="pt-[235px]">{children}</div>
    </div>
  );
};

export default BasicLayout;
