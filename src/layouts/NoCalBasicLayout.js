import { useState } from "react";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  const [date, setDate] = useState(new Date());

  const dateChange = (date) => {
    setDate(date);
    //console.log("실행됨" + date);
  };
  return (
    <>
      <Header layout="noCal" callBackFn={dateChange} />
      <div className="pt-[115px]" date={date}>
        {children}
      </div>
    </>
  );
};

export default BasicLayout;
