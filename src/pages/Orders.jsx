import Card from "../components/Card";
import React from "react";
import Info from "../components/info";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://63f7b778e8a73b486afdfcf4.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      {orders.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <h1>My orders</h1>
          </div>

          <div className="cards">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </div>
        </>
      ) : (
        <Info
          className={"favorites__empty"}
          title={"You don't have any orders"}
          description={"Place at least one order."}
          img={"/img/orders-empty.jpg"}
        />
      )}
    </div>
  );
}

export default Orders;
