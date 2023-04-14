import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";
import MainLayout from "./components/MainLayout";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const cartRes = await axios.get(
          "https://63f4f32c3f99f5855dbaf58d.mockapi.io/cart"
        );

        const favoritesRes = await axios.get(
          "https://63f7b778e8a73b486afdfcf4.mockapi.io/favorites"
        );
        const itemsRes = await axios.get(
          "https://63f4f32c3f99f5855dbaf58d.mockapi.io/items"
        );

        setIsLoading(false);

        setCartItems(cartRes.data);
        setFavoriteItems(favoritesRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://63f4f32c3f99f5855dbaf58d.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63f4f32c3f99f5855dbaf58d.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveCart = (id) => {
    try {
      axios.delete(`https://63f4f32c3f99f5855dbaf58d.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favoriteItems.find(
        (favObj) => Number(favObj.parentId) === Number(obj.id)
      );
      if (findItem) {
        setFavoriteItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        axios.delete(
          `https://63f7b778e8a73b486afdfcf4.mockapi.io/favorites/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63f7b778e8a73b486afdfcf4.mockapi.io/favorites",
          obj
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(error);
    }
  };
  const onChengeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          items,
          cartItems,
          favoriteItems,
          isItemAdded,
          onAddToFavorite,
          onAddToCart,
          setCartOpened,
          setCartItems,
        }}
      >
        <div className="wrapper">
          {cartOpened && (
            <Drawer
              onCloseCart={() => {
                setCartOpened(!cartOpened);
              }}
              items={cartItems}
              onRemove={onRemoveCart}
              setCartItems={setCartItems}
              opened={cartOpened}
              setCartOpened={setCartOpened}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout onClickCart={() => setCartOpened(!cartOpened)} />
              }
            >
              <Route
                index
                element={
                  <Home
                    items={items}
                    cartItems={cartItems}
                    searchValue={searchValue}
                    onChengeSearch={onChengeSearch}
                    onAddToCart={onAddToCart}
                    onAddToFavorite={onAddToFavorite}
                    isLoading={isLoading}
                  />
                }
              ></Route>
              <Route path="favorites" element={<Favorites />}></Route>
              <Route path="orders" element={<Orders />}></Route>
            </Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
