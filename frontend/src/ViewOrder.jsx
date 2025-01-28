import { Outlet, useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
function ViewOrder() {
  const { shopCards, setShopCards } = useOutletContext();

  const sendOrder = async () => {
    const orderDetails = shopCards.map((order) => [
      order.ingredients.foundation,
      order.ingredients.protein,
      order.ingredients.dressing,
      ...order.ingredients.extras,
    ]);
    console.log(orderDetails);

    try {
      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      console.log(data.status);
      toast.success(`the order ${data.order} is ${data.status} `);
    } catch (error) {
      console.error("Failed to send order", error);
      toast.success(`the order ${data.order} is ${data.status} `);
    }
  };
  return (
    <div>
      <ul>
        <Outlet context={{ shopCards }}> </Outlet>
        {shopCards.map((order, index) => (
          <li key={order.uuid}>
            <strong>Beställning {index + 1}</strong>
            <br />
            <strong>Foundation:</strong> {order.ingredients.foundation} <br />
            <strong>Protein:</strong> {order.ingredients.protein} <br />
            <strong>Dressing:</strong> {order.ingredients.dressing} <br />
            <strong>Extras:</strong> {order.ingredients.extras.join(", ")}{" "}
            <br />
            <strong>UUID:</strong> {order.uuid}
          </li>
        ))}
      </ul>
      <button type="button" onClick={sendOrder} className="btn btn-success">
        Beställ
      </button>
      <Toaster />
    </div>
  );
}

export default ViewOrder;
