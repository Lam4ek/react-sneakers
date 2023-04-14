import Card from "../components/Card";
import React from "react";

function Home(props) {
  const {
    items,
    searchValue,
    onChengeSearch,
    onAddToCart,
    onAddToFavorite,
    isLoading,
  } = props;

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <h1>All sneakers {searchValue}</h1>
        <div className="search-block">
          <img width={15} height={15} src="/img/search.svg" alt="search" />
          <input
            onChange={onChengeSearch}
            value={searchValue}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="cards">{renderItems()}</div>
    </div>
  );
}

export default Home;
