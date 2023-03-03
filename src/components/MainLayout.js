import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = ({ onClickCart }) => {
  return (
    <>
      <Header onClickCart={onClickCart} />
      <Outlet />
    </>
  );
};

export default MainLayout;
