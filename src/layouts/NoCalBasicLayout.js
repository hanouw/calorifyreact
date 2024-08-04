import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header layout="noCal" />
      <div className="pt-[185px]">{children}</div>
    </>
  );
};

export default BasicLayout;
