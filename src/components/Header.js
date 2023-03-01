import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./hooks/useCart";

function Header({ onClickCart }) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className="header-logo">
          <img width={40} height={40} src="/img/logo.svg" alt="logo" />
          <div className="header-info">
            <h2>REACT SNEAKERS</h2>
            <p>Shop the best sneakers</p>
          </div>
        </div>
      </Link>

      <div className="header-account">
        <ul>
          <li style={{ display: "flex" }}>
            <img
              width={18}
              height={18}
              src="/img/cart.svg"
              alt="cart icon"
              onClick={onClickCart}
            />
            <span style={{ marginLeft: "10px" }}>{totalPrice + "$"}</span>
          </li>

          <li style={{ marginLeft: "30px" }}>
            <Link to="/favorites">
              <img
                width={20}
                height={20}
                src="/img/favorites.svg"
                alt="favorites icon"
              />
            </Link>
          </li>
          <li style={{ marginLeft: "30px" }}>
            <Link to="/orders">
              <img
                width={20}
                height={20}
                src="/img/profile.svg"
                alt="profile icon"
              />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
