import Card from "../components/Card";
import React from "react";
import AppContext from "../context";
import Info from "../components/info";
import { Link } from "react-router-dom";

function Favorites() {
  const { favoriteItems, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="content">
      {favoriteItems.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <h1>Favorites</h1>
          </div>

          <div className="cards">
            {favoriteItems.map((item, index) => (
              <Card
                key={index}
                onFavorite={onAddToFavorite}
                favorited
                {...item}
                visible
              />
            ))}
          </div>
        </>
      ) : (
        <Info
          className={"favorites__empty"}
          title={"There are no favorites :("}
          description={"You didn't add anything to your favorites"}
          img={"/img/favorites-empty.jpg"}
        />
      )}
    </div>
  );
}

export default Favorites;
