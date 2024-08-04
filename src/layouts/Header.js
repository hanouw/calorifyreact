import React from "react";
import HeaderComponents from "../component/layouts/HeaderComponents";

const Header = ({ layout }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <HeaderComponents layout={layout} />
    </div>
  );
};

export default Header;
