import React from "react";
import AppContext from "../context";

const Info = ({ title, img, description, className, onClickBtn }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={className}>
      <img width={120} src={img} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClickBtn} className="button">
        Come back
      </button>
    </div>
  );
};

export default Info;
