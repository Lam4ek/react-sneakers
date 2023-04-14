import React from "react";
import axios from "axios";

import Info from "../info";
import styles from "./Drawer.module.css";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onCloseCart, items = [], onRemove, opened, setCartOpened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onCLickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://63f7b778e8a73b486afdfcf4.mockapi.io/orders",
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://63f4f32c3f99f5855dbaf58d.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Shopping cart
          <img
            style={{ cursor: "pointer" }}
            src="/img/remove-cart.svg"
            alt="close"
            onClick={onCloseCart}
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div style={{ flex: "1" }} className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cart__item">
                  <div
                    style={{ backgroundImage: `url('${obj.img}')` }}
                    className="cart__item-img"
                  ></div>
                  <div style={{ width: "150px" }}>
                    <p>{obj.title}</p>
                    <b>{obj.price} $</b>
                  </div>
                  <img
                    className="remove__btn"
                    src="/img/remove-cart.svg"
                    alt="remove cart item"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <ul className="checkout">
              <li>
                <span>Total:</span>
                <div></div>
                <b>{totalPrice + "$"}</b>
              </li>
              <li>
                <span>Tax 5%:</span>
                <div></div>
                <b>{(totalPrice * 0.05).toFixed(2) + "$"}</b>
              </li>
            </ul>
            <button
              disabled={isLoading}
              onClick={onCLickOrder}
              className="button"
            >
              Buy now
            </button>
          </>
        ) : (
          <Info
            title={
              isOrderComplete ? "The order has been placed!" : "Cart is empty"
            }
            description={
              isOrderComplete
                ? `Your order #${orderId} will be delivered to courier delivery soon`
                : "Add at least one pair of sneakers to place an order."
            }
            img={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/cartEmptyImg.png"
            }
            className={"cart__empty"}
            onClickBtn={() => setCartOpened(false)}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
