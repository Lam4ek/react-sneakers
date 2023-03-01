import React from "react";
import styles from "./Card.module.css";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import AppContext from "../../context";

function Card({
  id,
  title,
  price,
  img,
  onFavorite,
  onPlus,
  favorited,
  visible,
  loading = false,
}) {
  const { isItemAdded, favoriteItems } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const onClickPlus = () => {
    onPlus({ title, img, price, id, parentId: id });
  };
  const isFavoriteAdded = (id) => {
    return favoriteItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  const onClickFavorite = () => {
    onFavorite({ title, price, img, id, parentId: id });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="125" rx="3" ry="3" width="95" height="15" />
          <rect x="4" y="169" rx="0" ry="0" width="1" height="0" />
          <rect x="0" y="160" rx="8" ry="8" width="80" height="25" />
          <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.unfavorites}>
            {onFavorite && !visible && (
              <img
                width={30}
                height={30}
                src={
                  isFavoriteAdded(id)
                    ? "/img/add-favorites.svg"
                    : "/img/remove-favorites.png"
                }
                alt="favorites"
                onClick={onClickFavorite}
              />
            )}
          </div>
          <img width={130} height={110} src={img} alt="sneakers" />
          <h3>{title}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            <div>
              <span>Price:</span> <br />
              <b>{price} $</b>
            </div>
            {onPlus && (
              <img
                className="plus"
                src={
                  isItemAdded(id) ? "img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="add to cart"
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
