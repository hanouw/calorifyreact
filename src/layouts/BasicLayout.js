import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header layout="basic" />
      <div className="pt-[235px]">{children}</div>
    </>
  );
};

export default BasicLayout;
